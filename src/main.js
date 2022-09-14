import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const pinia = createPinia();
createApp(App)
  .component('v-select', vSelect)
  .use(pinia)
  .use(router)
  .mount('#app');

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'b1353a318b82bc638b06',
  cluster: 'eu',
  forceTLS: true,
});
