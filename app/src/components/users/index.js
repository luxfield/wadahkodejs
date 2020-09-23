import {isNull,isArray,isEmpty} from 'lodash';
import {Extension} from '../../util/_extensions';
import * as Form from '../form';
/**
 * Homepage CRUD
 * 
 * @author wadahkode
 * @since version 1.0.8
 */
class Homepage {
    constructor(data, state) {
        this.data = data;
        this.extensions = Extension();
        this.state = state;
        this.pathname = window.location.pathname;
        this.render();
    }
    
    formCreateStoryState(e=[], o={}) {
        const {id, event} = this.state.users.story.create;
        if (isArray(id) && !isEmpty(e)) {
            e.forEach(item => id.push(item));
        }
        if (isArray(o.action)) {
            o.action.forEach(action => {
                if (!isNull(this.pathname.match('home/index' + this.extensions))) {
                    event.on(o.event, (e) => {
                        let formId = id.find(element => element == "#form-" + action.slice(1)),
                            btnForm = '.quick-btn-' + action.slice(1);
                        Form[action.slice(1)](formId, e, btnForm, this.data);
                    });
                }
            });
        }
    }
    
    getElement(el,callback) {
        let mId = el.match(/\#[a-zA-Z].*/),
            mClass = el.match(/\.[a-zA-Z].*/);
        
        const match = document.querySelector((isNull(mClass) && !isNull(mId)) ? mId : mClass);
        
        return (!isNull(match) ? callback(match) : callback(false));
    }
    
    render() {
        this.formCreateStoryState(['#form-story'], {
            event: 'click',
            action: ['/story']
        });
        this.viewStoryState(['#view-story'], {
            action: ['/index']
        });
        this.logout();
    }
    
    viewStoryState(e=[], o={}) {
        const {id, event} = this.state.users.story.view;
        if (isArray(id) && !isEmpty(e)) {
            e.forEach(item => id.push(item));
        }
        if (isArray(o.action)) {
            o.action.forEach(action => {
                if (!isNull(this.pathname.match('home/index' + this.extensions))) {
                    let viewId = id.find(element => element == '#view-story');
                    Form['story' + action.slice(1).charAt(0).toUpperCase() + action.slice(2)](viewId, this.data);
                }
            });
        }
    }
    
    logout() {
        if (this.pathname.match('home/logout')) {
            return Form.logout();
        }
    }
}

const createElement = (element, attributes, values) => {
    
};

export default Homepage;