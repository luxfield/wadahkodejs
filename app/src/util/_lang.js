import {isUndefined} from 'lodash';

/**
 * Language
 * 
 * @author wadahkode
 * @since version 1.0.0
 */
export const setDefaultLanguage = (lang) => {
    return (isUndefined(lang) ? 'id_ID' : lang);
};