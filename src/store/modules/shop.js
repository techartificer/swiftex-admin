import instance from '../../helpers/axios';

export default {
  state: {
    shop: {},
  },
  mutations: {
    setShop(state, payload) {
      state.shop = payload;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SHOP_BY_ID({ commit }, id = '') {
      try {
        const { data } = await instance.get(`/shop/id/${id}`);
        commit('setShop', data.data);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Shop: (state) => state.shop,
  },
};
