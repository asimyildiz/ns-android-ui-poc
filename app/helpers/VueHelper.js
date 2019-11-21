import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import VueI18n from 'vue-i18n'
import * as application from 'tns-core-modules/application'
import RadListView from 'nativescript-ui-listview/vue'

/* istanbul ignore */
class VueHelper {
    /**
     * instantiate all Vue plugins being used for the project
     */
    static initVuePlugins() {
        Vue.use(Vuex);
        Vue.use(VueI18n);
        Vue.use(Router);
    }

    /**
     * create translations for language set inside config file
     * @param {Object} translations
     * @param {String} locale
     * @returns {VueI18n} translation object
     */
    static createTranslations(translations, locale) {
        return new VueI18n({
            locale: locale, // TODO set current language from a manager or something
            silentTranslationWarn: true,
            messages: translations
        });
    }

    /**
     * create Vuex Store for our app
     * @param {Object} stores
     * @returns {Vuex.Store}
     */
    static createStore(stores) {
        return new Vuex.Store(stores);
    }

    /**
     * create Vue Router for our app
     * @param {Object} routes
     */
    static createRouter(routes) {
        return new Router(routes);
    }

    /**
     * create player that is going to be used inside our app
     */
    static createPlayer() {
        Vue.registerElement('ExoPlayer', ()=> require('nativescript-exoplayer').Video);
        Vue.use(RadListView);
    }

    /**
     * extend Vue object and add some global instance variables into it
     * @param {Object} config - current application config file
     */
    static extendVue(config) {
        Vue.config.productionTip = false;
        Vue.prototype.$config = config;
    }
    
    /**
     * init Vue with all plugins used for this UI, this method accepts all config, routes, stores and translations
     * objects from where it is called, so that while running tests, they can be mocked up
     * @param {Object} routes
     * @param {Object} stores
     * @param {Object} translations
     * @param {Object} config
     * @returns {Object} VueI18n instance
     */
    static init(routes, stores, translations, config) {
        // init plugins
        VueHelper.initVuePlugins();

        const i18n = VueHelper.createTranslations(translations, config.defaultLocale);
        const store = VueHelper.createStore(stores);
        const router = VueHelper.createRouter(routes);
        VueHelper.createPlayer();
        VueHelper.extendVue(config);

        return {
            Vue,
            i18n,
            router,
            store
        };
    }
}

export default VueHelper;
