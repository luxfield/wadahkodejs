import App from './src/App';
import * as serviceWorker from './service';

const app = new App();
app.register({
    state: true,
    collections: ['defaultState', 'defaultRouteState']
});
app.run();

serviceWorker.register();