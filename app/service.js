import * as path from 'path';

const swPath = path.resolve(__dirname, 'vendor/uikit/js');
const swName = '/service-worker.js';

export const register = () => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register(swPath + swName)
                .then(function(registration) {
                    console.log('SW Registered: ', registration);
                })
                .catch(function(error){
                    // error
                    console.error(error);
                });
        });
    }
};

export const unregister = () => {};