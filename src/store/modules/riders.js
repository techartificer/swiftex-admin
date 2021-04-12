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
    // eslint-disable-next-line no-unused-vars
    async RIDERS_BY_HUB({ commit }, hub = '') {
      try {
        const { data } = await instance.get(`rider/${hub}`);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async RIDERS({ commit }, payload = {}) {
      try {
        const { lastId } = payload;
        const { data } = await instance.get(`rider?lastId=${lastId}`);
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
