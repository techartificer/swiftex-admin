/* eslint-disable no-unused-expressions */
import instance from '../../helpers/axios';

const exculdeData = (orderIds = [], notUpdated = []) => {
  const orderIdsRet = orderIds.splice(0);
  notUpdated.forEach(({ orderId: oid }) => {
    const idx = orderIdsRet.findIndex((id) => id === oid);
    if (idx >= 0) {
      orderIdsRet.splice(idx, 1);
    }
  });
  return orderIdsRet;
};

export default {
  state: {
    orders: [],
  },
  mutations: {
    changeOrderStatus(state, { id, status }) {
      const index = state.orders.findIndex((o) => o.id === id);
      if (index >= 0) {
        const orders = state.orders.splice(0);
        orders[index] = { ...orders[index], currentStatus: status };
        setImmediate(() => { state.orders = orders; });
      }
    },
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
    addOrders(state, data) {
      state.orders = [data, ...state.orders];
    },
    appendOrders(state, data = []) {
      state.orders = [...data, ...state.orders];
    },
  },
  actions: {
    async UPDATE_ORDER({ commit }, payload = {}) {
      try {
        const { id, update, shopId } = payload;
        const { data } = await instance.patch(`/order/id/${id}/shopId/${shopId}`, update);
        commit('updateOrder', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
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
    async ORDER_CREATE({ commit }, { percel, shopId }) {
      try {
        const { data } = await instance.post(`/order/create/${shopId}`, percel);
        commit('addOrders', data?.data);
        return data?.data;
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
    async CHANGE_MULTIPLE_STATUS({ commit }, payload = { orderIds: [], text: '', status: '' }) {
      try {
        const { data } = await instance.patch('/order/change/status/', payload);
        data?.data.forEach((order) => commit('updateOrder', order));
        return data?.data;
      } catch (err) {
        const updated = exculdeData(payload.orderIds, err?.response?.data?.data);
        updated?.forEach((id) => commit('changeOrderStatus', { id, status: payload.status }));
        return Promise.reject(err);
      }
    },
    async CREATE_MULTIPLE_ORDERS({ commit }, { shopId = '', orders = {} }) {
      try {
        const { data } = await instance.post(`/order/create/${shopId}/multiples/`, { orders });
        commit('appendOrders', data.data || []);
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
