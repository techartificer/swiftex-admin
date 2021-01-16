/* eslint-disable no-param-reassign */
import Vue from 'vue';
import constants from '@/constants';
import Toast from 'vue-toastification';
import instance from '@/helpers/axios';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toastification/dist/index.css';
import validateToken from './helpers/jwt';

const options = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 5,
  newestOnTop: true,
  hideProgressBar: true,
};

Vue.use(Toast, options);

Vue.config.productionTip = false;

instance.interceptors.request.use(async (config) => {
  try {
    const authToken = config?.headers?.authorization;
    if (authToken) {
      const isExpired = validateToken(authToken);
      if (isExpired) {
        console.log(store);
        const { accessToken, refreshToken } = await store.dispatch('REFRESH_TOKEN_REQUEST');
        config.headers.authorization = accessToken;
        config.headers.RefreshToken = refreshToken;
        return config;
      }
    }
    return config;
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}, undefined);

instance.interceptors.response.use(undefined, (err) => {
  const title = err?.response?.data?.title;
  const code = err?.response?.data?.code;
  console.log(err.config);
  if (code === constants.errorCodes.LOGGED_OUT) {
    Vue.$toast.error(title);
    store.commit('CLEAR_AUTH_DATA');
    window.location.replace('/');
  } else {
    Vue.$toast.error(title);
    console.log(title, err); // show error title in toast
  }
  return Promise.reject(err);
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
