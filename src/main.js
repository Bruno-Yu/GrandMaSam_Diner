import { createApp } from 'vue';
import 'bootstrap';
import CKEditor from '@ckeditor/ckeditor5-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueClipboard from 'vue-clipboard2';
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';
import ModalMessage from '@/components/ModalMessage.vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import $httpMessageState from '@/libs/pushMessageState';
import $frontHttpMessageState from '@/libs/frontPushMessageState';

import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});

setLocale('zh_TW');

const app = createApp(App);
app.config.globalProperties.$httpMessageState = $httpMessageState;
app.config.globalProperties.$frontHttpMessageState = $frontHttpMessageState;
VueClipboard.config.autoSetContainer = true;
app.use(CKEditor);
app.use('VueClipboard', VueClipboard);
app.component('VForm', Form);
app.component('ModalMessage', ModalMessage);
app.component('PageLoading', Loading);
app.component('VField', Field);
app.component('ErrorMessage', ErrorMessage);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app');
