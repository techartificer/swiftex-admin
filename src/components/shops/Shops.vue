<template>
  <div>
    <v-data-table
    :loading="isLoading"
    :headers="headers"
    :items="shopListFinal"
    class="elevation-0"
    hide-default-footer
    :items-per-page="1000000"
  >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Shops</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="ml-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <div class="load-more">
      <v-btn
      rounded
      depressed
      :loading="isLoadingMore"
      @click="loadMore"
      :disabled="disableLoadMore"
      >Load More</v-btn>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../../constants';

export default {
  data() {
    return {
      disableLoadMore: false,
      isLoadingMore: false,
      dialog: false,
      editedItem: {},
      formTitle: '',
      isLoading: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Area', value: 'pickupArea' },
        { text: 'Phone', value: 'phone' },
        { text: 'Address', value: 'pickupAddress' },
        { text: 'Charge', value: 'deliveryCharge' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters(['ShopList']),
    shopListFinal() {
      return this.ShopList?.map((s) => ({
        ...s,
        phone: s?.phone.substr(2),
        deliveryCharge: s?.deliveryCharge || constants.DELIVERY_CHARGE,
      }));
    },
  },
  mounted() {
    this.getShops();
  },
  methods: {
    ...mapActions(['SHOP_LIST']),
    editItem(item) {
      console.log(item);
    },
    loadMore() {
      this.isLoadingMore = true;
      const id = this.shopListFinal[this.shopListFinal?.length - 1]?.id;
      console.log('shop', id);
      this.getShops(id);
    },
    async getShops(lastId = '') {
      this.isLoading = true;
      try {
        const list = await this.SHOP_LIST({ lastId });
        // console.log(list);
        if (list.length < 10) {
          this.disableLoadMore = true;
        }
      } catch (err) {
        // err
      }
      this.isLoading = false;
      this.isLoadingMore = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .load-more {
    margin-top: 10px;
    text-align: center;
    margin-bottom: 30px;
  }
</style>
