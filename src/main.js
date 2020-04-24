import Vue from 'vue';
import dotenv from 'dotenv';
import axios from 'axios';
import globalFunctions from '@/utils/globalFunction';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
// import '@/assets/css/reset.css';;;;
// import '@/assets/css/common.css';
// import '@/assets/css/font.css';

dotenv.config();

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// 전역으로 사용될 공통 함수
Vue.use(globalFunctions);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app');