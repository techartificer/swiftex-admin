import instance from '../../helpers/axios';

export default {
  state: {
    riders: [],
  },
  mutations: {
    setRiders(state, payload) {
      state.riders = payload;
    },
    addRiders(state, payload) {
      state.riders = [...state.riders, ...payload];
    },
  },
  actions: {
    async RIDERS({ commit }, payload = {}) {
      try {
        const { lastId } = payload;
        const { data } = instance.get(`rider?lastId=${lastId}`);
        if (!lastId) {
          commit('setRiders', data.data);
        } else commit('addRiders', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Riders: (state) => state.riders,
  },
};
