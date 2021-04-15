import instance from '../../helpers/axios';

export default {
  state: {
    orders: [],
  },
  mutations: {
    setOrders(state, { makeEmpty, orders }) {
      if (!state.orders || makeEmpty) state.orders = [];
      state.orders = [...state.orders, ...orders];
    },
    updateOrder(state, payload) {
      const index = state.orders.findIndex((o) => o.id === payload.id);
      if (index >= 0) {
        const orders = state.orders.splice(0);
        orders[index] = payload;
        setImmediate(() => { state.orders = orders; });
      }
    },
  },
  actions: {
    async DELIVER_PARCEL({ commit }, payload = {}) {
      try {
        const { orderId } = payload;
        const { data } = await instance.post(`/order/deliver/${orderId}`, payload);
        commit('updateOrder', data?.data?.order);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },

    async ASSIGN_RIDER({ commit }, payload = {}) {
      try {
        const { data } = await instance.post('/order/assign-rider/', payload);
        commit('updateOrder', data?.data?.order);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
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
          lastId = '', shopId = '', phone = '', trackId = '', startDate = '', endDate = '', deliveryZone = '',
        } = payload;
        const limit = 15;
        const query = `limit=${limit}&lastId=${lastId}&phone=${phone}&trackId=${trackId}&shopId=${shopId}&deliveryZone=${deliveryZone}`;
        const dateQuery = `&startDate=${startDate}&endDate=${endDate}`;
        const { data } = await instance.get(`/order?${query}${dateQuery}`);
        commit('setOrders', { orders: data.data || [], makeEmpty: !lastId });
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
