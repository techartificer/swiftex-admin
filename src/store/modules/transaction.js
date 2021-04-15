import instance from '../../helpers/axios';

export default {
  state: {
    requests: [],
  },
  mutations: {
    setRequests(state, { requests, makeEmpty }) {
      if (makeEmpty || !state.requests) state.requests = [];
      state.requests = [...state.requests, ...requests];
    },
    removeRequest(state, payload) {
      // eslint-disable-next-line no-underscore-dangle
      const idx = state.requests?.findIndex((r) => (r._id === payload || r.id === payload));
      console.log(idx);
      if (idx >= 0) {
        state.requests.splice(idx, 1);
      }
    },
  },
  actions: {
    async CASH_OUT({ commit }, payload = {}) {
      try {
        const { trxId, trxCode } = payload;
        const { data } = await instance.patch(`/transaction/cash-out/${trxId}`, { trxCode });
        commit('removeRequest', trxId);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async CASH_OUT_REQUESTS({ commit }, payload = { lastId: '' }) {
      try {
        const { lastId } = payload;
        const { data } = await instance.get(`transaction/cash-out-requests?lastId=${lastId}`);
        commit('setRequests', { requests: data.data || [], makeEmpty: !lastId });
        return data.data || [];
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    CashOutRequests: (state) => state.requests,
  },
};
