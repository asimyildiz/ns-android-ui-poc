import Vue from 'nativescript-vue'
import Home from './screens/Home'
import VueHelper from './helpers/VueHelper'
import LanguageHelper from './helpers/LanguageHelper'
import StoreHelper from './helpers/StoreHelper'
import { isAndroid, isIOS } from 'tns-core-modules/platform'
import aliases from './middleware/aliases'
import routes from './router'
import config from './config.json'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

/** init managers and services **/
beINFW.bootManager.init(beINFW, config);

/** create store, i18n, router objects and initialize */
const stores = StoreHelper.createStore();
const translations = LanguageHelper.createTranslations();
const helper = VueHelper.init(routes, stores, translations, config);
const i18n = helper.i18n;
const router = helper.router;
const store = helper.store;

helper.Vue.prototype.$http = require('http');
// set platform information into Vue globals
helper.Vue.prototype.$isAndroid = isAndroid;
helper.Vue.prototype.$isIOS = isIOS;

new helper.Vue({
    i18n,
    router,
    store,
    render: h => h('frame', [h(Home)])
}).$start()