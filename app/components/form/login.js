import UIkit from 'uikit';

const form = document.querySelector("#form-login");
const pathname = window.location.pathname;

export const Login = () => {
    if (pathname.lastIndexOf("login.html") >= 1) {
        form.onsubmit = submit;
    }
};

const submit = () => {
    UIkit.notification("Hello", {
        status: 'warning'
    });
};