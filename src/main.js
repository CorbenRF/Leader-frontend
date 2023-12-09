/* eslint-disable */
import { createApp } from 'vue';
// import API_BASE_URL from '@/config';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
// import 'bootstrap/scss/bootstrap.scss';
import '@/assets/fonts/Montserrat/stylesheet.css';
import './assets/css/style.scss';
import '@/assets/css/media.scss';

createApp(App).use(store).use(router).mount('#app');
