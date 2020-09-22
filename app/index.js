import App from './src/App';
import * as serviceWorker from './service';
import * as Welcome from './src/controller';
import * as Login from './src/controller/login';
import * as Register from './src/controller/register';

const app = new App();
app.register({
    state: true,
    collections: ['defaultState', 'defaultRouteState']
});
app.run();
// app.listen(route => {
//     route.get('/', response => {
//         return ((response == 200) ? Welcome.index(app) : app.routeNotFound());
//     });
//     route.get('/login', response => {
//         return ((response == 200) ? Login.index(app) : app.routeNotFound());
//     });
//     route.get('/register', response => {
//         return ((response == 200) ? Register.index(app) : app.routeNotFound());
//     });
// });

serviceWorker.unregister();