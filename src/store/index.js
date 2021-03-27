/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import admin from './modules/admin';
import merchant from './modules/merchant';
import order from './modules/order';
import shop from './modules/shop';
import riders from './modules/riders';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    riders,
    shop,
    order,
    merchant,
    admin,
    auth,
  },
});
