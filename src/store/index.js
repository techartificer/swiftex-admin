/* eslint-disable import/no-cycle */
import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import admin from './modules/admin';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    auth,
  },
});
