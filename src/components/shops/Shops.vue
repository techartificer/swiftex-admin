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
          <v-dialog v-model="dialog"
          width="300"
          persistent>
            <v-card>
              <v-card-title v-if="dialogItem">
                {{dialogItem.name}}
              </v-card-title>
              <v-card-text class="mt-5">
                <v-text-field
                v-model="deliveryCharge"
                label="Delivery Charge"
                outlined
                dense
                type="number"></v-text-field>
                <v-text-field
                v-model="cod"
                label="COD Charge"
                outlined
                dense
                type="number"></v-text-field>
                <v-select
                outlined
                dense
                :items="statuses"
                v-model="status"></v-select>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text rounded
                @click="dialog=false">Cancel</v-btn>
                <v-btn
                :loading="isUpdating"
                @click="updateShop"
                color="secondary"
                rounded>
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn @click="editItem(item)" fab x-small text>
          <v-icon
          class="ml-2"
        >
          mdi-pencil
        </v-icon>
        </v-btn>
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
      isUpdating: false,
      cod: '',
      status: '',
      statuses: ['Active', 'Deactive'],
      deliveryCharge: '',
      dialogItem: {},
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
        { text: 'COD%', value: 'cod' },
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
    ...mapActions(['SHOP_LIST', 'UPDATE_SHOP_BY_ID']),
    editItem(item) {
      this.dialogItem = item;
      this.status = item.status;
      this.deliveryCharge = item.deliveryCharge;
      this.cod = item.cod;
      this.dialog = true;
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
    async updateShop() {
      try {
        this.isUpdating = true;
        await this.UPDATE_SHOP_BY_ID({
          shopId: this.dialogItem.id,
          update: {
            deliveryCharge: +this.deliveryCharge,
            cod: +this.cod,
            status: this.status,
          },
        });
        this.dialog = false;
      } catch (err) {
        console.log(err);
      }
      this.isUpdating = false;
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
