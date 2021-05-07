import instance from '../../helpers/axios';

export default {
  state: {
    shop: {},
    allShops: [], // all created shops list with name, id
    shopList: [], // created shops list
  },
  mutations: {
    setShop(state, payload) {
      state.shop = payload;
    },
    setAllShops(state, payload = []) {
      state.allShops = payload;
    },
    addShops(state, { list = [], makeEmpty }) {
      if (makeEmpty) {
        state.shopList = [];
      }
      state.shopList = state.shopList || [];
      state.shopList = [...state.shopList, ...list];
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
    async ALL_SHOPS_NAME({ commit }) {
      try {
        const { data } = await instance.get('/shop/all-shops-name');
        commit('setAllShops', data.data || []);
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
    async SHOP_LIST({ commit }, { lastId = '' }) {
      try {
        const { data } = await instance.get(`/shop/all-shops?lastId=${lastId}`);
        commit('addShops', { list: data.data || [], makeEmpty: !lastId });
        return data.data;
      } catch (err) {
        return Promise.reject(err);
      }
    },
  },
  getters: {
    Shop: (state) => state.shop,
    AllShops: (state) => state.allShops,
    ShopList: (state) => state.shopList,
  },
};
