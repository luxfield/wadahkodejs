import * as Request from '../util/http';
import * as Form from '../components/form';
import Administrator from '../components/admin';
import {isNull} from 'lodash';

export const index = app => {
    if (Request.uri.segment('login')) {
        app.state.navbar = null;
        
        Form.authChecker(user => {
            if (user) {
                Form.checkOnDatabase(user, response => {
                    if (response.level == 'superuser') {
                        if (isNull(app.pathname.match('admin'))) {
                            setTimeout(function() {
                                window.location.href = 'admin/index.html';
                            }, 200);
                            return false;
                        }
                        if (!response.emailVerified) {
                            Form.sendEmailVerification(err => {
                                return (err ? app.showNoticeEmailVerification() : false);
                            });
                        }
                        return new Administrator(user, app.state);
                    } else {
                        setTimeout(function() {
                            window.location.href = 'home/index.html';
                        }, 200);
                    }
                });
            } else {
                if (app.pathname.match('admin')) {
                    window.location.href = '/login.html';
                }
            }
        });
        
        app.formState(['#form-login','#form-register'], {
            event: 'click',
            action: ['/login', '/register']
        });
    }
};


