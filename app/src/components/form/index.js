import {isEmpty, isObject} from 'lodash';
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

export const authChecker = (cb) => {
    return firebase.auth().onAuthStateChanged(user => cb(user));
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

export const sendEmailVerification = () => {
    return firebase.auth().currentUser.sendEmailVerification()
        .then(function() {
            UI.pushNotification("<span uk-icon=\"icon: check;\"></span>&nbsp;your email has not been verified, please check your email!", {
                status: 'warning',
                timeout: 3000
            });
        });
};

export const checkOnDatabase = (user, cb) => {
    const {uid, email, emailVerified} = user;
    const users = firebase.database().ref('users/' + uid);
    
    if (uid == 'HyHJ7S4MeZOxXpUQuiml7AjcbNF2') {
        firebase.database().ref('users/' + uid).set({
            email: email,
            emailVerified: emailVerified,
            level: 'superuser'
        }, error => {
            if (error) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;server not responding!', {
                    status: 'danger',
                    timeout: 3000
                });
            } else {
                users.on('value', snapshot => {
                    cb(snapshot.val());
                });
            }
        });
    } else {
        firebase.database().ref('users/' + uid).set({
            email: email,
            emailVerified: emailVerified,
            level: 'normal'
        }, error => {
            if (error) {
                UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;server not responding!', {
                    status: 'danger',
                    timeout: 3000
                });
            } else {
                users.on('value', snapshot => {
                    cb(snapshot.val());
                });
            }
        });
    }
};