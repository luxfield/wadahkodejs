export const defaultRouteState = {
    root: '/',
    requestMethod: ['GET', 'POST']
};
export const defaultState = {
	auth: {
	    id: [],
	    event: {
	        on: (e,o) => {
	            return o(e);
	        },
	        action: []
	    }
	},
    navbar: {
        source: undefined,
        event: {
            on: (e,o) => {
                return o(e);
            }
        }
    },
    // add anymore state event
};