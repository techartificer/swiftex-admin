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
    async ORDERS({ commit }, payload = {}) {
      try {
        const {
          lastId = '', shopId = '', phone = '', trackId = '', startDate = '', endDate = '',
        } = payload;
        const limit = 10;
        const query = `limit=${limit}&lastId=${lastId}&phone=${phone}&trackId=${trackId}&shopId=${shopId}`;
        const dateQuery = `&startDate=${startDate}&endDate=${endDate}`;
        const { data } = await instance.get(`/order?${query}${dateQuery}`);
        commit('setOrders', data.data || []);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Orders: (state) => state.orders,
  },
};
