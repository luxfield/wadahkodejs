import {isNull,isEmpty, isObject} from 'lodash';
import * as UI from '../../ui';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from '../../config/firebase';

firebase.initializeApp(firebaseConfig);

const auth = (props) => {
    if (!isObject(props)) {
        return false;
    }
    const {email,password,checkbox} = props.input;
    
    switch (props.type) {
        case 'login':
            return firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    UI.pushNotification("<span uk-icon=\"icon: check;\"></span>&nbsp;login is successful", {
                        status: 'success',
                        timeout: 3000
                    });
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
                    UI.pushNotification('<span uk-icon="icon: check"></span>&nbsp;Registration is successful, please check your email to verify.', {
                        status: 'success',
                        timeout: 3000
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
    const date = new Date(),
    now = date.toLocaleString('en-US',{
        hour12: true
    });
    //const posts = firebase.database().ref('posts/' + uid + '/' + url);
    const postman = firebase.database().ref('posts/admin-posts/' + url);
    
    //const postMan = firebase.database().ref('posts/' + newPostKey);
    
    switch (props.type) {
        case 'post.create':
            alert(postman);
            // return postMan.once('value').then(snapshot => {
            //     return (isNull(snapshot.val()) ? createPost(postMan, {
            //             title: title,
            //             contents: contents,
            //             url: hostname + url,
            //             author: email,
            //             created_at: now,
            //             updated_at: now
            //         }) : setTimeout(function() {callback(snapshot.val())},4600)
            //     );
            // });
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
    
    function editPost(posts, data, uid, key) {
        // Get a key for a new Post.
        //let newPostKey = firebase.database().ref().child('posts').push().key;
        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        //updates['/posts/' + uid + '/' + key] = data;
        updates['/posts/' + uid] = data;
        
        posts.update(updates);
        setTimeout(function() {
            callback();
        }, 4600);
    }
};
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
        
    let href = window.location.href;
    href = href.replace('-',' ');
    
    const posts = firebase.database().ref('posts/' + user.uid);
    posts.on('value', snapshot => {
        const snap = Object.values(snapshot.val());
        snap.forEach((item,key) => {
            if (href.match(snap[key].title)) {
                form.title.value = snap[key].title;
                form.url.value = snap[key].title.replace(' ','-');
                form.contents.value = snap[key].contents;
                let created_at = snap[key].created_at,
                    postKey = snap[key].title;
            }
        });
    });
    
    form.title.addEventListener("keyup",function(){
        let val = this.value;
        form.url.value = val.split(' ').join('-').toLowerCase();
    });
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        if (window.location.pathname.match('posts/edit')) {
            form.onsubmit = handleEditPost(form,button,user,{
                postKey: postKey,
                created_at: created_at
            });
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

function handleEditPost(e,b,u,d) {
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
            type: 'create.edit',
            input: {
                title: title.value,
                contents: contents.value,
                hostname: hostname.value,
                url: url.value,
                created_at: d.created_at,
                key: d.postKey
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
        b.innerHTML = "Kirim";
    }, 4500);
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
export const sendEmailVerification = (cb) => {
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
    const posts = firebase.database().ref('posts/' + uid);
    posts.on('value', snapshot => {
        if (isNull(snapshot.val())) {
            viewId.innerHTML = '<b>Saat ini tidak ada postingan!</b>';
        } else {
            const snap = Object.values(snapshot.val());
            
            snap.forEach((item,key) => tableView += createTableView(snap,key));
        }
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
    });
    
    function createTableView(item,key) {
        const {title,url,contents,created_at,updated_at,author} = item[key];
        let hashtag = key + 1;
        
        return `<tbody>
            <td>${hashtag}</td>
            <td>${title}</td>
            <td>${url}</td>
            <td>${contents}</td>
            <td>${created_at}</td>
            <td>${updated_at}</td>
            <td>${author}</td>
            <td>
                <a href="edit.html#ref=${title.replace(' ', '-')}" uk-icon="icon: pencil"></a>
                <a href="#" uk-icon="icon: trash"></a>
            </td>
        </tbody>`
    }
};