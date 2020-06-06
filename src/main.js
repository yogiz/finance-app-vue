import 'core-js/stable'
import Vue from 'vue'
import i18n from './i18n/i18n'
import App from './App'
import { router } from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store/index.js';
import Vuex from 'vuex';
import VeeValidate, { Validator } from 'vee-validate'
import attributesId from 'vee-validate/dist/locale/id'
import attributesEn from 'vee-validate/dist/locale/en'

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

Validator.localize('id',attributesId);
Vue.use(VeeValidate,{ 
  locale:'id',
  fieldsBagName: 'veeFields',
  dictionary: {
    translationsEn: { attributes: attributesEn },
    translationsId: { attributes: attributesId }
  }
});
Vue.use(Vuex);
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
