import axios from 'axios';
import instance from '../../helpers/axios';
import { baseURL } from '../../constants/api';
import constants from '../../constants';

export default {
  state: {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    permission: localStorage.getItem('permission'),
  },
  mutations: {
    SET_AUTH_DATA(state, { accessToken, refreshToken, permission }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (accessToken) { localStorage.setItem('accessToken', accessToken); }
      if (refreshToken) { localStorage.setItem('refreshToken', refreshToken); }
      if (permission) {
        state.permission = permission;
        localStorage.setItem('permission', permission);
      }
    },
    CLEAR_AUTH_DATA(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('permission');
    },
  },
  actions: {
    async ADMIN_LOGIN_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/auth/admin/login', payload);
        commit('SET_AUTH_DATA', data?.data);
        return data;
      } catch (err) {
        console.log(err);
        return Promise.reject(err);
      }
    },
    async REFRESH_TOKEN_REQUEST({ commit, state }) {
      try {
        const { data } = await axios({
          method: 'patch',
          url: `${baseURL}/v1/auth/refresh-token`,
          headers: {
            agent: 'browser',
            authorization: state.accessToken ? `Bearer ${state.accessToken}` : undefined,
            RefreshToken: `${state.refreshToken}`,
          },
        });
        commit('SET_AUTH_DATA', data?.data);
        return data?.data;
      } catch (err) {
        const code = err?.response?.data?.code;
        if (code === constants.errorCodes.LOGGED_OUT) {
          commit('CLEAR_AUTH_DATA');
          window.location.replace('/');
        }
        return Promise.reject(err);
      }
    },
    async LOGOUT_REQUEST({ commit }) {
      try {
        await instance.delete('/auth/logout');
        commit('CLEAR_AUTH_DATA');
        window.location.replace('/');
        return 'done';
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    IsLoggedIn: (state) => !!state.accessToken && !!state.refreshToken,
    AccessToken: (state) => state.accessToken,
    RefreshToken: (state) => state.refreshToken,
    Permission: (state) => state.permission,
  },
};
