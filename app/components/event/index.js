


// scroll event
export const scrollEffect = (t) => {
    // target change
    const target = document.querySelector(t),
        className = target.classList.contains('uk-position-top'),
        child = target.children[0];
    
    window.addEventListener("scroll", e => {
        if (e.target.scrollingElement.scrollTop > 420) {
            if (className) {
                target.classList.remove("uk-position-top");
                target.classList.add("uk-position-fixed");
                target.classList.add("uk-width-1-1");
                child.classList.add("uk-background-default");
                child.classList.add("uk-box-shadow-medium");
            }
        } else {
            const className = target.classList.contains("uk-position-fixed");
            if (className) {
                    target.classList.remove("uk-position-fixed");
                    target.classList.add("uk-position-top");
                    target.classList.remove("uk-width-1-1");
                    child.classList.remove("uk-background-default");
                    child.classList.remove("uk-box-shadow-medium");
            }
        }
    });
};