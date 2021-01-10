import axios from 'axios';
import instance from '../../helpers/axios';
import { baseURL } from '../../constants/api';

export default {
  state: {
    accessToken: localStorage.getItem('accessToken') || 'asdad',
    refreshToken: localStorage.getItem('refreshToken') || 'asdas',
  },
  mutations: {
    SET_AUTH_DATA(state, { accessToken, refreshToken, permission }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      if (accessToken) { localStorage.setItem('accessToken', accessToken); }
      if (refreshToken) { localStorage.setItem('refreshToken', refreshToken); }
      if (permission) { localStorage.setItem('permission', permission); }
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async ADMIN_LOGIN_REQUEST({ commit }, payload) {
      try {
        const { data } = await instance.post('/auth/admin/login', payload);
        console.log(data?.data);
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
        console.log(data?.data);
        commit('SET_AUTH_DATA', data?.data);
        return data?.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    IsLoggedId: (state) => !!state.accessToken && !!state.refreshToken,
    AccessToken: (state) => state.accessToken,
    RefreshToken: (state) => state.refreshToken,
  },
};
