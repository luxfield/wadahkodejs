export const isUndefined = (obj) => {
    if (typeof obj == 'object') {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
};