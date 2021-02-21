/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import admin from './modules/admin';
import merchant from './modules/merchant';
import order from './modules/order';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    order,
    merchant,
    admin,
    auth,
  },
});
