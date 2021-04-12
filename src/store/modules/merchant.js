import instance from '../../helpers/axios';

export default {
  state: {
    merchants: [],
  },
  mutations: {
    setMerchants(state, payload) {
      state.merchants = payload;
    },
    addMerchants(state, payload) {
      state.merchants = [...state.merchants, ...payload];
    },
  },
  actions: {
    async MERCHANTS({ commit }, payload = {}) {
      try {
        const { lastId = '' } = payload;
        const { data } = await instance.get(`/merchant?lastId=${lastId}`);
        if (!lastId) { commit('setMerchants', data.data || []); }
        if (lastId) { commit('addMerchants', data.data || []); }
        return data.data || [];
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    merchants: (state) => state.merchants,
  },
};
