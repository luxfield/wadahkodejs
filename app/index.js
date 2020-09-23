import App from './src/App';
import * as serviceWorker from './service';

(function(app){
    "use strict";
    
    app.register({state: true, collections: ['defaultState', 'defaultRouteState']});
    app.run();
    
})(new App());

serviceWorker.unregister();