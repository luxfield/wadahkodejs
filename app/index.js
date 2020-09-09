import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {firebaseConfig} from './config/firebase';
import Form from './components/form';
import {scrollEffect} from './components/event';

// Firebase Initialize Application
firebase.initializeApp(firebaseConfig);

// UIkit Use Icons
UIkit.use(Icons);

// Form Login
const form = new Form('email', 'password', 'checkbox');
form.validate({
    messages: 'can\'t be empty!',
    status: 'warning'
});

// scrolled body change navbar
scrollEffect('#homeNavbar');