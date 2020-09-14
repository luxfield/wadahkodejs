/**
 * Class Router
 * 
 * @source https://raw.githubusercontent.com/thecreazy/create-a-modern-javascript-router/master/src/Router.js
 */

class Router {
  constructor(options) {
    this.mode = window.history.pushState ? 'history' : 'hash';
    if (options.mode) this.mode = options.mode;
    this.root = '/';
    if (options.root) this.root = options.root;
    this.routes = [];
    this.path = "index.html";
    this.extension = '.html';
    //this.listen();
  }

  add(path, cb){
    this.routes.push({ path, cb });
    return this;
  }

  remove(path) {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  }

  flush() {
    this.routes = [];
    return this;
  }
  
  fragment(path) {
      this.path = this.clearSlashes(path);
      
      switch (this.mode) {
          case 'history':
              this.fragmentHistory();
              break;
              
          case 'hash':
              this.fragmentHash();
              break;
      }
  }
  
  fragmentHistory() {
      
  }
  
  fragmentHash() {
      let result = window.location.href.lastIndexOf(((this.path == null) ? 'index' : this.path) + this.extension);
      
      if (result >= 1) {
          return true;
      }
      return false;
  }

  clearSlashes(path) {
    return path
      .toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  }
  
  get(path, controller) {
      let result = window.location.pathname.lastIndexOf(path);
      
      alert(result);
  }

  getFragment() {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '/') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  }

  navigate(path = '') {
    if (this.mode === 'history') {
      window.history.pushState(null, null, this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  }

  listen() {
    clearInterval(this.interval);
    this.interval = setInterval(this.interval, 50);
  }

  interval() {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();

    this.routes.some(route => {
      const match = this.current.match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  }
}

export default Router;