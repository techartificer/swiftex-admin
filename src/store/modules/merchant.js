import instance from '../../helpers/axios';

export default {
  state: {
    merchants: [],
  },
  mutations: {
    setMerchants(state, payload) {
      state.merchants = payload;
    },
  },
  actions: {
    async MERCHANTS({ commit }, payload = {}) {
      try {
        const { lastId = '' } = payload;
        console.log('here', lastId);
        const { data } = await instance.get(`/merchant?lastId=${lastId}`);
        commit('setMerchants', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    merchants: (state) => state.merchants,
  },
};
