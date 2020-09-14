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

function handleLogin(e, b) {
    const {email,password} = e;
    
    if (isEmpty(email.value)) {
        UI.pushNotification("Email tidak boleh kosong!");
    }
    
    setTimeout(function() {
        b.removeAttribute("disabled");
        b.innerHTML = "Login";
    }, 4500);
}