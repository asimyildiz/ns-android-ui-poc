import translationTR from '../assets/i18n/tr_TR.json'
import translationEN from '../assets/i18n/en_US.json'

class LanguageHelper {
    /**
     * create translations from folders dynamically
     */
    /**
     createTranslationsDynamic() {
        // get all files under store
        const files = require.context('@/assets/i18n', true, /^\.\/(?!-)[^.]+\.(json)$/);
        const filenames = files.keys();

        const translations = {};
        filenames.forEach((filename) => {
            const name = filename.replace(/^\.\//, '').replace(/\.(json)$/, '');
            const language = name.substr(0, name.indexOf('_'));
            const languageObject = Utils.getModule(files, filename);
            translations[language] = languageObject;
        });

        return translations;
     }
     */

    static createTranslations() {
        return {
            tr: translationTR,
            en: translationEN
        }
    }
}

export default LanguageHelper;
