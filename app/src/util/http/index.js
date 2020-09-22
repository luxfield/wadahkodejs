//import https from 'https';
//import {URL} from 'url';
import {isNull,isEmpty,isUndefined} from 'lodash';
import * as UI from '../../ui';
//import * as Route from '../../routes';

/**
 * Request
 * 
 * @author wadahkode
 */
let REQUEST_URI = '/';
let REQUEST_METHOD = [];
//export const ROOT_NOT_FOUND = 'Routes / not found!';
//export const RESOLVE_STATUS = 200;
//export const REJECT = 404
export const requestUri = () => REQUEST_URI;
export const uri = {
    segment: (key) => {
        return (!isNull(window.location.href.match(key)) ? true : false);
    },
};

export const bind = (u,m) => {
    REQUEST_URI = parseUrl(u);
    if (!window.navigator.onLine) {
        UI.pushNotification('<span uk-icon="icon: warning"></span>&nbsp;koneksi internet tidak ada, atau mungkin terputus.', {
            status: 'warning',
            timeout: 3000
        });
    }
    return REQUEST_URI;
};

// export const call = url => {
//     self.REQUEST_URI = parseUrl(url);
    
//     return self.REQUEST_URI;
// };

export const parseUrl = url => {
    if (url === '/') {
        return window.location.origin + '/index.html';
    } else if (url === 'admin' || url === '/admin' || url == '/admin/') {
        return window.location.origin  + url + 'index.html';
    } else {
        if (url.match(/\/$/)) {
            let arrUrl = url.split('/');
            
            arrUrl.forEach(uri => {
                if (isEmpty(uri)) {
                    arrUrl.pop(uri);
                }
            });
            
            REQUEST_URI = window.location.origin + arrUrl.join('/');
            return REQUEST_URI;
        }
        REQUEST_URI = window.location.origin + url;
        return REQUEST_URI;
    }
};

export const get = url => {
    let uri = (isNull(url.match(/\.html$/)) == true) ? url + '.html' : url;
    
    return apiWithCallback(uri).then(response => {
        return ((response == 200) ? api(uri, {
            method: 'GET',
            mode: 'no-cors'
        }) : false);
    });
};

export const group = url => {};

export const post = (url) => {
    let uri = (isNull(url.match(/\.html$/)) == true) ? url + '.html' : url;
    
    return apiWithCallback(uri).then(response => {
        return ((response == 200) ? api(uri, {
            method: 'POST',
            mode: 'no-cors'
        }) : false);
    });
};

const api = (url, config) => {
    let waktu = new Date(),
        seconds = waktu.getMilliseconds();

    return new Promise((resolve, reject) => {
        if (seconds < 5000) {
            setTimeout(() => {
                fetch(url, config)
                    .then(response => response.status)
                    .then(response => resolve(response));
            }, seconds);
        } else {
            reject(false);
        }
    });
};

const apiWithCallback = url => {
    let waktu = new Date(),
        seconds = waktu.getMilliseconds();

    return new Promise((resolve, reject) => {
        if (seconds < 5000) {
            setTimeout(() => {
                fetch(url, {method: 'HEAD', mode: 'no-cors'})
                    .then(response => response.status)
                    .then(response => resolve(response));
            }, seconds);
        } else {
            reject(false);
        }
    });
};