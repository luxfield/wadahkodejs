import {isNull,isEmpty, isObject} from 'lodash';
import * as UI from '../../ui';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from '../../config/firebase';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const date = new Date(),
now = date.toLocaleString('en-US',{
    hour12: false
});

const auth = (props) => {
    if (!isObject(props)) {
        return false;
    }
    const {email,password,checkbox} = props.input;
    
    switch (props.type) {
        case 'login':
            return firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    if (!response.user.emailVerified) {
                        UI.pushNotification("<span uk-icon=\"icon: warning;\"></span>&nbsp;You cannot log in before verifying your email, please check your email.", {
                            status: 'warning',
                            timeout: 3000
                        });
                    } else {
                        UI.pushNotification("<span uk-icon=\"icon: check;\"></span>&nbsp;login is successful", {
                            status: 'success',
                            timeout: 3000
                        });
                    }
                    // setTimeout(function() {
                    //     window.location.href = 'home';
                    // }, 4500);
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = (errorCode == 'auth/user-not-found') ? 'account cannot be found, or your email has not been registered.' : error.message;
                    //alert(errorCode);
                    UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;' + errorMessage, {
                        status: (errorCode == 'auth/user-not-found') || (errorCode == 'auth/wrong-password') ? 'danger' : 'success',
                        timeout: 3000
                    });
                });
                
        case 'register':
            return firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    // UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;Registration is successful, please check your email to verify.', {
                    //     status: 'success',
                    //     timeout: 3000
                    // });
                    return sendEmailVerification(error => {
                        if (error) {
                            UI.pushNotification('<span uk-icon="check"></span>&nbsp;Registration is successful and email verification has been sent, please check your email.', {
                                status: 'success',
                                timeout: 3000
                            });
                        }
                    });
                    // setTimeout(function() {
                    //     window.location.href = 'home';
                    // }, 4500);
                })
                .catch(function(error) {
                    let errorCode = error.code,
                        errorMessage = error.message;
        
                    UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;' + errorMessage, {
                        status: errorCode == 'auth/weak-password' ? 'danger' : 'success',
                        timeout: 3000
                    });
                });
    }
};
const posts = (props, callback) => {
    if (!isObject(props)) {
        return false;
    }
    const {title,contents,hostname,url,created_at,key} = props.input;
    const {uid,email} = props.author;
    // const options = {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric',
    //     hour12: false,
    //     timezone: 'UTC'
    // };
    // const date = new Date(),
    // now = date.toLocaleString('en-US',{
    //     hour12: false
    // });
    //const posts = firebase.database().ref('posts/' + uid + '/' + url);
    const ref = database.ref('posts');
    const postman = database.ref('posts').push();
    const postEdit = database.ref('posts/' + key);
    
    switch (props.type) {
        case 'post.create':
            ref.once('value', snapshot => {
                if (isNull(snapshot.val())) {
                    return createPost(postman, {
                        "title": title,
                        "contents": contents,
                        "url": hostname + url,
                        "author": email,
                        "created_at": now,
                        "updated_at": now
                    });
                } else {
                    ref.once('child_added', snapshot => {
                        return ((snapshot.val().title == title)
                            ? setTimeout(function() {callback(snapshot.val())}, 4600)
                            : createPost(postman,{
                                "title": title,
                                "contents": contents,
                                "url": hostname + url,
                                "author": email,
                                "created_at": now,
                                "updated_at": now
                            })
                        );
                    });
                }
            });
            break;
            
        case 'post.edit':
            editPost(postEdit, {
                "title": title,
                "contents": contents,
                "url": hostname + url,
                "author": email,
                "created_at": created_at,
                "updated_at": now
            });
            break;
            
        case 'create.post':
            return posts.once('value').then(snapshot => {
                return (isNull(snapshot.val()) ? createPost(posts, {
                    title: title,
                    contents: contents,
                    url: hostname + url,
                    author: email,
                    created_at: now,
                    updated_at: now
                }) : setTimeout(function() {callback(snapshot.val())}, 4600));
            });
            
        case 'create.edit':
            return editPost(posts, {
                title: title,
                contents: contents,
                url: hostname + url,
                author: email,
                created_at: created_at,
                updated_at: now
            }, uid, key);
    }
    
    function createPost(posts, data) {
        posts.set(data);
        setTimeout(function() {
            callback();
        }, 4600);
    }
    
    function editPost(posts, data) {
        // Get a key for a new Post.
        //let newPostKey = firebase.database().ref().child('posts').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        // let updates = {};
        // //updates['/posts/' + uid + '/' + key] = data;
        // updates['/posts/' + uid] = data;
        posts.update(data);
        setTimeout(function() {
            callback();
        }, 4600);
    }
};
const postStory = (props, callback) => {
    if (!isObject(props)) {
        return false;
    }
    const {story,author} = props.input;
    // database
    const ref = database.ref('user-story'),
        storypos = database.ref('user-story').push();
    
    switch (props.type) {
        case 'story.create':
            ref.once('value', snapshot => {
                if (isNull(snapshot.val())) {
                    return createStory(storypos, {
                        "story": story,
                        "author": author,
                        "created_at": now,
                        "updated_at": now
                    });
                } else {
                    ref.once('child_added', snapshot => {
                        return ((snapshot.val().story == story)
                            ? setTimeout(function() {callback(snapshot.val())}, 4600)
                            : createStory(storypos,{
                                "story": story,
                                "author": author,
                                "created_at": now,
                                "updated_at": now
                            })
                        );
                    });
                }
            });
            break;
    }
    
    
    function createStory(posts, data) {
        posts.set(data);
        setTimeout(function() {
            callback();
        }, 4600);
    }
};
const postProduct = (props, callback) => {};

export const authChecker = (cb) => {
    return firebase.auth().onAuthStateChanged(user => cb(user));
};
export const create = (id,event,btn,user) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    form.title.addEventListener("keyup",function(){
        let val = this.value;
        form.url.value = val.split(' ').join('-').toLowerCase();
    });
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        if (window.location.pathname.match('posts')) {
            form.onsubmit = handleCreatePost(form, button,user);
        }
    });
};
export const edit = (id,event,btn,user) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
        
    let href = window.location.href,
        postKey = href.replace('#ref=',' ').split(' ')[1];
     
    form.postkey.value = postKey;
    
    const posts = firebase.database().ref('posts/' + postKey);
    posts.on('value', snapshot => {
        form.title.value = snapshot.val().title;
        form.url.value = snapshot.val().title.replace(' ', '-');
        form.contents.value = snapshot.val().contents;
        form.created_at.value = snapshot.val().created_at;
    });
    
    form.title.addEventListener("keyup",function(){
        let val = this.value;
        form.url.value = val.split(' ').join('-').toLowerCase();
    });
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        if (window.location.href.match(postKey)) {
            form.onsubmit = handleEditPost(form,button,user);
        }
    });
};
/**
 * For handler event click button login
 *
 * @event onsubmit handleLogin
 */
export const login = (id, event, btn) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        form.onsubmit = handleLogin(form, button);
    });
};
export const logout = () => {
    return firebase.auth().signOut().then(() => {
        setTimeout(function() {
            window.location.href = '../login.html';
        }, 10);
        
    }).catch(error => {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;' + error.errorMessage, {
            status: 'warning',
            timeout: 3000
        });
    });
};
/**
 * For handler event click button register
 * 
 * @event onsubmit handleRegister
 */
export const register = (id, event, btn) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        form.onsubmit = handleRegister(form, button);
    });
};

export const story = (id, event, btn, data) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled",true);
        this.innerHTML = "Please wait...";
        form.onsubmit = handleCreateStory(form,button,data);
    });
};

function handleCreatePost(e,b,u) {
    const {title, contents, hostname, url} = e;
    
    if (isEmpty(title.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;judul tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else if (isEmpty(contents.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;isi tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else {
        posts({
            type: 'post.create',
            input: {
                title: title.value,
                contents: contents.value,
                hostname: hostname.value,
                url: url.value,
                created_at: null,
                key: null
            },
            author: u
        }, res => {
            if (isObject(res)) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;postingan sudah ada!',{
                    status: 'warning',
                    timeout: 3000
                });
            } else {
                UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;sukses membuat postingan!',{
                    status: 'success',
                    timeout: 3000
                });
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Kirim";
    }, 4500);
}
function handleEditPost(e,b,u) {
    const {title, contents, hostname, url, created_at, postkey} = e;
    if (isEmpty(title.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;judul tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else if (isEmpty(contents.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;isi tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else {
        posts({
            type: 'post.edit',
            input: {
                title: title.value,
                contents: contents.value,
                hostname: hostname.value,
                url: url.value,
                created_at: created_at.value,
                key: postkey.value
            },
            author: u
        }, res => {
            if (isObject(res)) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;gagal memperbarui postingan!',{
                    status: 'warning',
                    timeout: 3000
                });
            } else {
                UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;postingan berhasil diupdate!',{
                    status: 'success',
                    timeout: 3000
                });
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Update";
    }, 4600);
}
function handleCreatePages(e,b,u) {
    const {title, contents, hostname, url} = e;
    
    if (isEmpty(title.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;judul tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else if (isEmpty(contents.value)) {
        UI.pushNotification('<span uk-icon="icon: warning;"></span>&nbsp;isi tidak boleh kosong!', {
            status: 'warning',
            timeout: 3000
        });
    } else {
        posts({
            type: 'create.pages',
            input: {
                title: title.value,
                contents: contents.value,
                hostname: hostname.value,
                url: url.value
            },
            author: u
        }, res => {
            if (isObject(res)) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;postingan sudah ada!',{
                    status: 'warning',
                    timeout: 3000
                });
            } else {
                UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;sukses membuat postingan!',{
                    status: 'success',
                    timeout: 3000
                });
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Kirim";
    }, 4500);
}
function handleCreateStory(e,b,u) {
    const {story} = e;
    
    if (isEmpty(story.value)) {
        UI.pushNotification("<span uk-icon=\"icon: mail;\"></span>&nbsp;story can't be empty!", {
            status: 'warning',
            timeout: 3000
        });
    } else {
        postStory({
            type: 'story.create',
            input: {
                "story": story.value,
                "author": u.email
            }
        }, res => {
            if (isObject(res)) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;cerita sudah ada!',{
                    status: 'warning',
                    timeout: 3000
                });
            } else {
                UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;cerita berhasil dikirim!',{
                    status: 'success',
                    timeout: 3000
                });
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute('disabled');
        story.value = '';
        b.innerHTML = 'Kirim';
    }, 4600);
}
/**
 * Handle login
 * 
 * @param field 
 * @parqm button
 */
function handleLogin(e, b) {
    const {email,password} = e;
    
    if (isEmpty(email.value)) {
        UI.pushNotification("<span uk-icon=\"icon: mail;\"></span>&nbsp;email can't be empty!", {
            status: 'warning',
            timeout: 3000
        });
    } else if (isEmpty(password.value)) {
        UI.pushNotification("<span uk-icon=\"icon: lock;\"></span>&nbsp;password can't be empty!", {
            status: 'warning',
            timeout: 3000
        });
    } else {
        auth({
            type: 'login',
            input: {
                email: email.value,
                password: password.value
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Login";
    }, 4500);
}
/**
 * Handle register
 * 
 * @param field
 * @param button
 */
function handleRegister(e, b) {
    const {email,password,checkbox} = e;
    
    if (isEmpty(email.value)) {
        UI.pushNotification("<span uk-icon=\"icon: mail;\"></span>&nbsp;email can't be empty!", {
            status: 'warning',
            timeout: 3000
        });
    } else if (isEmpty(password.value)) {
        UI.pushNotification("<span uk-icon=\"icon: lock;\"></span>&nbsp;password can't be empty!", {
            status: 'warning',
            timeout: 3000
        });
    } else if (!checkbox.checked) {
        UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;Please accept the terms and conditions, if you want to create a new account!', {
            status: 'warning',
            timeout: 3000
        });
    } else {
        auth({
            type: 'register',
            input: {
                email: email.value,
                password: password.value,
                checkbox: checkbox.checked
            }
        });
    }
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Register";
    }, 4500);
}
const sendEmailVerification = (cb) => {
    return firebase.auth().currentUser.sendEmailVerification().then(() => cb(true));
            // UI.pushNotification("<span uk-icon=\"icon: check;\"></span>&nbsp;your email has not been verified, please check your email!", {
            //     status: 'warning',
            //     timeout: 3000
            // });
};
export const checkOnDatabase = (user, cb) => {
    const {uid, email, emailVerified} = user;
    const users = firebase.database().ref('users/' + uid);
    users.once('value').then(snapshot => {
        return ((isNull(snapshot.val())) ? createNewAccount(users, {
            email: email,
            emailVerified: emailVerified,
            level: (uid == 'HyHJ7S4MeZOxXpUQuiml7AjcbNF2') ? 'superuser' : 'normal'
        }) : cb(snapshot.val()));
    });
    
    function createNewAccount(users, data) {
        return users.set(data, error => {
            if (error) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;server not responding!', {
                    status: 'danger',
                    timeout: 3000
                });
            }
        });
    }
};
export const postIndex = (element,data) => {
    const viewId = document.querySelector(element);
    let tableView = "";
    const {uid, email} = data;
    const posts = firebase.database().ref('posts');
    posts.on('value', snapshot => {
        if (isNull(snapshot.val())) {
            viewId.innerHTML = '<tbody><td><b>Saat ini tidak ada postingan!</b></td></tbody>';
        } else {
            const postKey = Object.keys(snapshot.val());
            const snap = Object.values(snapshot.val());
            
            snap.forEach((item,key) => tableView += createTableView(snap,key,postKey[key]));
        }
        
        if (window.location.href.match('posts/index')) {
            viewId.innerHTML = `
                <thead>
                    <th>#</th>
                    <th>judul</th>
                    <th>url</th>
                    <th>isi</th>
                    <th>dibuat pada</th>
                    <th>diupdate pada</th>
                    <th>penulis</th>
                    <th>action</th>
                </thead>${tableView}
            `;
        }
    });
    
    function createTableView(item,key,postKey) {
        const {title,url,contents,created_at,updated_at,author} = item[key];
        let hashtag = key + 1;
        
        return `<tbody>
            <td>${hashtag}</td>
            <td>${title}</td>
            <td><a href="${url}">${url}</a></td>
            <td>${contents}</td>
            <td>${created_at}</td>
            <td>${updated_at}</td>
            <td>${author}</td>
            <td>
                <a href="edit.html#ref=${postKey}" uk-icon="icon: pencil"></a>
                <a href="#" uk-icon="icon: trash"></a>
            </td>
        </tbody>`
    }
};
export const storyIndex = (element,data) => {
    const viewId = document.querySelector(element);
    let storyView = "";
    const {uid, email} = data;
    const story = database.ref('user-story');
    story.on('value', snapshot => {
        if (isNull(snapshot.val())) {
            if (window.location.href.match('home/index')) {
                setTimeout(function() {
                    viewId.innerHTML = `
                        <div class="uk-container uk-background-default uk-margin-top uk-margin-bottom uk-box-shadow-small">
                            <div class="uk-card">
                                <div class="uk-card-body uk-padding-remove-vertical uk-padding-remove-horizontal">
                                    <b>Tidak ada cerita yang dibagikan!</b>
                                </div>
                            </div>
                        </div>
                    `;
                }, 5000);
            }
            return false;
        } else {
            const storyKey = Object.keys(snapshot.val());
            const snap = Object.values(snapshot.val());
            
            snap.forEach((item,key) => storyView += createStoryView(snap,key,storyKey[key]));
        }
        
        if (window.location.href.match('home/index')) {
            setTimeout(function() {
                viewId.innerHTML = `
                    ${storyView}
                `;
            }, 5000);
        }
    });
    
    function createStoryView(item,key,postKey) {
        const {story,created_at,updated_at,author} = item[key];
        //let hashtag = key + 1;
        
        return `
            <div class="uk-container uk-background-default uk-margin-top uk-margin-bottom uk-box-shadow-small">
                <div class="uk-card">
                    <div class="uk-card-body uk-padding-remove-vertical uk-padding-remove-horizontal">
                        <h4 class="uk-card-title">${author}</h4>
                        <p>${story}</p>
                    </div>
                </div>
            </div>
        `;
    }
};
export const updateEmailVerification = (uid,verified) => {
    const users = firebase.database().ref('users/' + uid);
    users.update({
        "emailVerified": verified
    });
};