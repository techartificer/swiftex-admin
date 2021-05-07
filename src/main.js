/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Toast from 'vue-toastification';
import instance from '@/helpers/axios';
import constants from './constants';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  hideProgressBar: true,
};

Vue.use(Toast, options);

Vue.config.productionTip = false;

instance.interceptors.request.use((config) => config, undefined);

instance.interceptors.response.use(undefined, async (err) => {
  const originalRequest = err.config;
  const title = err?.response?.data?.title;
  const code = err?.response?.data?.code;
  if (code === constants.errorCodes.LOGGED_OUT) {
    Vue.$toast.error(title?.substr(0, 1)?.toUpperCase() + title.substr(1));
    store.commit('CLEAR_AUTH_DATA');
    window.location.replace('/');
  } else {
    if (code === constants.errorCodes.EXPIRED_JWT && !originalRequest.retry) {
      const { accessToken, refreshToken } = await store.dispatch('REFRESH_TOKEN_REQUEST');
      originalRequest.headers.authorization = accessToken;
      originalRequest.headers.RefreshToken = refreshToken;
      originalRequest.retry = true;
      return instance(originalRequest);
    }
    if (title === 'signature is invalid') {
      Vue.$toast.error('Please login again');
    }
    Vue.$toast.error(title?.substr(0, 1)?.toUpperCase() + title.substr(1));
  }
  return Promise.reject(err);
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
