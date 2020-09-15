import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import {Extension} from './util/_extensions';
import {isUndefined, isEmpty, isNull, isArray, isFunction, isObject} from 'lodash';
import * as State from './util/_state';
import * as Events from './components/event';
import * as Route from './routes';
import * as Form from './components/form';

/**
 * Application
 * 
 * @author wadahkode
 * @since version v1.0
 */
class App {
    // constructor
    constructor(props) {
        this.state = undefined;
        this.routes = undefined;
        this.test = undefined;
        this.get = undefined;
        this.post = undefined;
        this.pathname = window.location.pathname;
        this.extensions = Extension();
        UIkit.use(Icons);
    }
    
    createState(state) {
        this.state = state(Events.SET_SOURCE, Events.setSource(Events.SET_SOURCE));
        
        return this;
    }
    
    createStateTest(test) {
        this.state = test(Events.SET_SOURCE, Events.setSource(Events.SET_SOURCE)).state;
        
        return this;
    }
    
    createRouteState(state) {
        this.routes = state(Events.SET_REQUEST_URI, Events.setRequestUri(Events.SET_REQUEST_URI)).state;
        
        return this;
    }
    
    formState(e=[], o={}) {
        const {id, event} = this.state.auth;
        
        if (isArray(id) && !isEmpty(e)) {
            e.forEach(item => id.push(item));
        }
        
        if (isArray(o.action)) {
            o.action.forEach(action => {
                if (!isNull(this.pathname.match(action + this.extensions))) {
                    Form.authChecker(user => {
                        if (user) {
                            // const {email,emailVerified} = user;
                            // if (!emailVerified) {
                            //     Form.sendEmailVerification();
                            // }
                            setTimeout(function() {
                                window.location.href = 'home';
                            }, 1000);
                        }
                        event.on(o.event, (e) => {
                            let formId = id.find(element => element == "#form-" + action.slice(1)),
                                btnForm = '.quick-btn-' + action.slice(1);
                                
                            Form[action.slice(1)](formId, e, btnForm);
                        });
                    });
                }
            });
        }
    }
    
    navbarState(e,o) {
        const {source,event} = this.state.navbar;
        
        let element = (source == undefined) ? e : source;
        
        switch (o.event) {
            case 'scroll':
                return (
                    event.on(o.event, (e) => {
                        return (o.scrollTo == 'top')
                            ? Events.navbarFixedTop(element,e,o.max)
                            : Events.navbarFixedBottom(element,e,o.max);
                    })
                );
        }
    }
    
    register(modules={}) {
        if (isUndefined(modules) || isEmpty(modules)) {
            const app = document.getElementById('App');
            app.innerHTML = '<div class="uk-child-width-1-2@m uk-text-center"><h1>What happening!</h1><p>The system may be under repair or the system may have failed.</p></div>';
            app.className = "uk-height-large uk-flex uk-flex-middle uk-container";
        }
        
        return (modules.hasOwnProperty('state') && modules.state === true) ? this.registerState(modules.collections) : false;
    }
    
    registerState(collections=[]) {
        if (isEmpty(collections)) {
            return this.register({});
        }
        collections.forEach(item => {
            switch (item) {
                case 'defaultState':
                    return this.createStateTest((state, event) => {
                        state = State.defaultState;
                        
                        return ((event.type == 'SET_SOURCE') ? {state, source: event.id} : state);
                    });
                    
                case 'defaultRouteState':
                    return this.createRouteState((state, event) => {
                        state = State.defaultRouteState;
                        
                        return ((event.type == 'SET_REQUEST_URI') ? {state, requestUri: event.uri} : state);
                    });
            }
        });
    }
    
    run() {
        this.navbarState('#homeNavbar', {event: 'scroll', scrollTo: 'top', max: 420});
        this.formState(['#form-login','#form-register'], {
            event: 'click',
            action: ['/login', '/register']
        });
        Form.authChecker(user => {
            if (user) {
                if (isNull(this.pathname.match('home'))) {
                    setTimeout(function() {
                        window.location.href = 'home';
                    }, 1000);
                }
            }
        });
    }
    
    routeState() {
        const { root, requestMethod } = this.routes;
        return Route.register(request => request.bind(root, requestMethod));
    }
}

export default App;