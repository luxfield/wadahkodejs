import UIkit from 'uikit';
import * as firebase from 'firebase/app';

// Form
class Form {
    constructor(...props) {
        this.email = props.find(email => email == 'email');
        this.password = props.find(password => password == 'password');
        this.checkbox = props.find(checkbox => checkbox == 'checkbox');
        this.pathname = window.location.pathname;
        return this;
    }
    
    handleSubmit(e, options, btn) {
        btn.setAttribute("disabled", true);
        
        if (e[this.email].value == "") {
            UIkit.notification(
                "<span uk-icon=\"icon: mail;\"></span>&nbsp;" + this.email + "&nbsp;" + options.messages, {
                status: options.status,
                timeout: 3000
            });
        } else if (e[this.password].value == "") {
            UIkit.notification(
                "<span uk-icon=\"icon: lock;\"></span>&nbsp;" + this.password + "&nbsp;" + options.messages, {
                status: options.status,
                timeout: 3000
            });
        } else {
            if (this.pathname.lastIndexOf("login.html") >= 1) {
                firebase.auth().signInWithEmailAndPassword(e[this.email].value, e[this.password].value).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    UIkit.notification("<span uk-icon=\"icon: warning\"></span>&nbsp;" + errorMessage, {
                        status: errorCode == 'auth/user-not-found' ? 'danger' : 'success',
                        timeout: 3000
                    });
                });
            } else if (this.pathname.lastIndexOf("register.html") >= 1) {
                if (e[this.checkbox].checked == false) {
                    UIkit.notification("<span uk-icon=\"icon: warning\"></span>&nbsp;Please accept the terms and conditions, if you want to create a new account!", {
                        status: 'warning',
                        timeout: 3000
                    });
                } else {
                    firebase.auth();
                }
            }
        }
        
        setTimeout(() => {
            btn.removeAttribute("disabled");
        }, 4500);
    }
    
    validate(options) {
        
        if (this.pathname.lastIndexOf("login.html") >= 1) {
        let form = document.querySelector("#form-login"),
            btnForm = document.querySelector(".form-login");
            
            btnForm.addEventListener("click", () => {
                form.onsubmit = this.handleSubmit(form, options, btnForm);
            });
            
            return this;
        } else {
            if (this.pathname.lastIndexOf("register.html") >= 1) {
            let form = document.querySelector("#form-register"),
                btnForm = document.querySelector(".form-register");
                
            btnForm.addEventListener("click", () => {
                form.onsubmit = this.handleSubmit(form, options, btnForm);
            });
            }
            return this;
        }
    }
}

export default Form;