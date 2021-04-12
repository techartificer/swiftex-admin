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
  },
  actions: {
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
