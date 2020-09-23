import * as Request from './util/http';
/**
 * Routes
 * 
 * @author wadahkode
 */
class Route {
    constructor(uri, options) {
        this.uri = uri;
        this.options = options;
    }
    
    get(uri, process) {
        
    }
}

export default Route;

export const get = (url, callable) => {
    return Request.get(url).then(response => callable(response));
};
export const group = (url,callable) => {
    //return Request.group(url).then(response => callable(response));
};
export const post = (url, callable) => {
    return Request.post(url).then((status, data) => callable(status, data));
};
export const register = callback => callback(Request);

export const requestUri = Request.requestUri();