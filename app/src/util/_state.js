export const defaultRouteState = {
    root: window.location.pathname,
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
    posts: {
        create: {
            id: [],
            event: {
                on: (e,o) => {
                    return o(e);
                },
                action: []
            },
        },
        view: {
            id: [],
            event: {
                on: (e,o) => {
                    return o(e);
                },
                action: []
            },
        },
    }
    // add anymore state event
};