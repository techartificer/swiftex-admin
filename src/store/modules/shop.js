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
    updateShop(state, shop = {}) {
      const idx = state.shopList?.findIndex((s) => s?.id === shop?.id);
      if (idx >= 0) {
        const shops = state.shopList?.splice(0);
        shops[idx] = { ...shops[idx], ...shop };
        setImmediate(() => { state.shopList = shops; });
      }
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
    async UPDATE_SHOP_BY_ID({ commit }, { shopId, update }) {
      try {
        const { data } = await instance.patch(`/shop/id/${shopId}/`, update);
        commit('updateShop', data.data);
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
