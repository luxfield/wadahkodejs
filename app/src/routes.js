import * as Request from './util/http';
/**
 * Routes
 * 
 * @author wadahkode
 */
 export const get = (url, callable) => {
    return Request.get(url).then(res => callable(res));
};
export const post = (url, callable) => {
    return Request.post(url).then((status, data) => callable(status, data));
};
export const register = callback => callback(Request);