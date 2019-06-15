import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import tooltip from '@/directives/tooltip.directive';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader';
import './registerServiceWorker';
import 'materialize-css/dist/js/materialize.min';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.directive('tooltip', tooltip);
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: 'AIzaSyDUvcpLRkqAf8rml-jZkwS9zJEKqs7_wmw',
  authDomain: 'vue-crm-289d4.firebaseapp.com',
  databaseURL: 'https://vue-crm-289d4.firebaseio.com',
  projectId: 'vue-crm-289d4',
  storageBucket: 'vue-crm-289d4.appspot.com',
  messagingSenderId: '381558199116',
  appId: '1:381558199116:web:b8eb30a142058170',
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
