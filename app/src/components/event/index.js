export const SET_SOURCE = 'SET_SOURCE';
export const SET_REQUEST_URI = 'SET_REQUEST_URI';
export const setSource = (id) => ({
    type: SET_SOURCE,
    id
});
export const setRequestUri = (uri) => ({
    type: SET_REQUEST_URI,
    uri
});
/**
 * Event for handle scrolling element, and change navbar when scroll to top.
 * 
 * @author wadahkode
 * @since version v1.0
 * @datetime 8 September 2020
 */
export const navbarFixedTop = (element, event, max) => {
    // target change
    let target = document.querySelector(element), className, child;
    
    if (typeof target != 'object') {
        return false;
    }
    className = target.classList.contains('uk-position-top'),
    child = target.children[0];
    
    window.addEventListener(event, e => {
        if (e.target.scrollingElement.scrollTop > max) {
            if (className) {
                target.classList.remove("uk-position-top");
                target.classList.add("uk-position-fixed");
                target.classList.add("uk-width-1-1");
                child.classList.add("uk-background-muted");
                child.classList.add("uk-box-shadow-medium");
            }
        } else {
            const className = target.classList.contains("uk-position-fixed");
            if (className) {
                target.classList.remove("uk-position-fixed");
                target.classList.add("uk-position-top");
                target.classList.remove("uk-width-1-1");
                child.classList.remove("uk-background-muted");
                child.classList.remove("uk-box-shadow-medium");
            }
        }
        e.preventDefault();
    });
};

/**
 * Event for handle scrolling element, and change navbar when scroll bottom.
 * 
 * @author wadahkode
 * @since version v1.0
 * @datetime 8 September 2020
 */
export const navbarFixedBottom = (id, max) => {};

