import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

const pinia = createPinia();
createApp(App)
  .component('v-select', vSelect)
  .use(pinia)
  .use(router)
  .mount('#app');
