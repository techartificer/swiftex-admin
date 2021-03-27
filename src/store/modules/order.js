import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, payload) {
      state.orders = payload;
    },
    updateOrder(state, payload) {
      const index = state.orders.findIndex((o) => o.id === payload.id);
      console.log(payload, index);
      if (index >= 0) {
        const orders = state.orders.splice(0);
        orders[index] = payload;
        setImmediate(() => { state.orders = orders; });
      }
    },
  },
  actions: {
    async ADD_ORDER_STATUS({ commit, rootState }, payload = {}) {
      try {
        const body = { ...payload, admin: rootState?.admin?.profile?.id };
        const { data } = await instance.patch(`/order/add/order-status/${payload.id}`, body);
        commit('updateOrder', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
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
