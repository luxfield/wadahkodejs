import {isEmpty} from 'lodash';
import * as UI from '../../ui';



export const auth = () => {};
export const login = (id, event, btn) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        form.onsubmit = handleLogin(form, button);
    });
};
export const register = (id, event, btn) => {
    let button = document.querySelector(btn),
        form = document.querySelector(id);
    
    button.addEventListener(event, function(){
        this.setAttribute("disabled", true);
        this.innerHTML = "Please wait...";
        form.onsubmit = handleRegister(form, button);
    });
};

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
    }
    
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Login";
    }, 4500);
}
function handleRegister(e, b) {
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
    }
    
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Register";
    }, 4500);
}