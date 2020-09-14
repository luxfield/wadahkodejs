import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import { navbarFixedTop } from './components/event';
import Router from './routes';

class App {
    constructor(props) {
        UIkit.use(Icons);
    }
    
    listen() {
        this.navbarStyleWhenScrolling('#homeNavbar');
        Route.get('/', 'Welcome@index');
        Route.get('login.html');
    }
    
    navbarStyleWhenScrolling(element) {
        return navbarFixedTop(element);
    }
}

const Route = new Router({
    mode: 'hash',
    root: '/'
});

export default App;