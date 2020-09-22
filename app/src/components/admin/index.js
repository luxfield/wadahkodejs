import {isNull,isArray,isEmpty} from 'lodash';
import {Extension} from '../../util/_extensions';
import * as Form from '../form';
/**
 * Administrator CRUD
 * 
 * @author wadahkode
 * @since version 1.0.8
 */
class Administrator {
    constructor(data, state) {
        this.data = data;
        this.extensions = Extension();
        this.state = state;
        this.pathname = window.location.pathname;
        this.render();
    }
    
    formState(e=[], o={}) {
        const {id, event} = this.state.posts.create;
        if (isArray(id) && !isEmpty(e)) {
            e.forEach(item => id.push(item));
        }
        if (isArray(o.action)) {
            o.action.forEach(action => {
                if (!isNull(this.pathname.match(action + this.extensions))) {
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
        this.formState(['#form-create', '#form-edit'], {
            event: 'click',
            action: ['/create', '/edit']
        });
        this.viewState(['#view-post'], {
            action: ['/index']
        });
    }
    
    viewState(e=[], o={}) {
        const {id, event} = this.state.posts.view;
        if (isArray(id) && !isEmpty(e)) {
            e.forEach(item => id.push(item));
        }
        if (isArray(o.action)) {
            o.action.forEach(action => {
                if (!isNull(this.pathname.match(action + this.extensions))) {
                    let viewId = id.find(element => element == '#view-post');
                    Form['post' + action.slice(1).charAt(0).toUpperCase() + action.slice(2)](viewId, this.data);
                }
            });
        }
    }
}

const createElement = (element, attributes, values) => {
    
};

export default Administrator;