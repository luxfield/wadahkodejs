//import https from 'https';
//import {URL} from 'url';
/**
 * Request
 * 
 * @author wadahkode
 */
export const REQUEST_URI = '/';
export const REQUEST_METHOD = [];
//export const ROOT_NOT_FOUND = 'Routes / not found!';
//export const RESOLVE_STATUS = 200;
//export const REJECT = 404;

export const bind = (u,m) => {
    self.REQUEST_URI = parseUrl(u);
};

export const call = url => {
    self.REQUEST_URI = parseUrl(url);
    
    return self.REQUEST_URI;
};

export const parseUrl = url => {
    if (url === '/') {
        return window.location.href.slice(0, window.location.href.lastIndexOf('/'));
    } else {
        return window.location.href.slice(0, window.location.href.lastIndexOf('/')) + url;
    }
};

export const get = (url) => {
    return new Promise((resolve, reject) => {
        fetch(window.location.origin + url, {method: 'GET', mode: 'no-cors'})
            .then(response => response.status)
            .then(response => resolve(response));
    });
};

export const post = (url) => {
    //return new Promise((resolve, reject) => {
    //    fetch(window.location.origin + url, {method: 'POST', mode: 'no-cors'})
    //        .then(response => response)
    //        .then(response => resolve(response.status, response.json()));
    //});
};