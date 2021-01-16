import instance from '../../helpers/axios';

export default {
  state: {
    admins: [],
  },
  mutations: {
    SET_ADMINS(state, admins) {
      state.admins = admins;
    },
  },
  actions: {
    async ALL_ADMINS_REQUEST({ commit }) {
      try {
        const { data } = await instance.get('/admin/all');
        commit('SET_ADMINS', data?.data);
        return data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Admins: (state) => state.admins,
  },
};
