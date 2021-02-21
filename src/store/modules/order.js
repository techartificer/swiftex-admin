import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async ORDERS({ commit }, payload) {
      try {
        const { data } = await instance.get('/order/');
        commit('setOrders', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    orders: (state) => state.orders,
  },
};
