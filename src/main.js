import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VueMeta from 'vue-meta';
import Paginate from 'vuejs-paginate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import messagePlugin from '@/utils/message.plugin';
import titlePlugin from '@/utils/title.plugin';
import Loader from "@/components/app/Loader";
import 'materialize-css/dist/js/materialize.min';
import dataFilter from "@/filters/date.filter";
import localizeFilter from "@/filters/localize.filter";
import currencyFilter from "@/filters/currency.filter";
import toolTipDirective from '@/directives/tooltip.derective';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(titlePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dataFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);
Vue.directive('tooltip', toolTipDirective);

firebase.initializeApp({
  apiKey: "AIzaSyC8GdlXQ7KxK4VxLLl-4oIIVakNJLo_bXk",
  authDomain: "vue-crmsystem-2d3d5.firebaseapp.com",
  projectId: "vue-crmsystem-2d3d5",
  storageBucket: "vue-crmsystem-2d3d5.appspot.com",
  messagingSenderId: "866530455137",
  appId: "1:866530455137:web:3a5a4e19657948c2fb4420",
  measurementId: "G-M0X4L5CNZM",
});

let app = null;

firebase.auth().onAuthStateChanged( () => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
});
