<template>
  <div>
    <transition name="fade">
      <add-parcel :parcel="parcel" v-if="showAddPercel"/>
    </transition>
    <template v-if="!showAddPercel">
      <v-dialog
      class="mx-auto"
      width="900"
      persistent
      v-model="showOrder">
        <v-card>
          <v-card-title>
            Order
          </v-card-title>
          <v-card-text>
            <div v-if=" dialogOrder && dialogOrder.shop">
              <div>
                <v-row class="top-menu">
                  <div>
                    <v-btn color="blue" dark class="pa-2 ml-2"
                    depressed> {{dialogOrder.deliveryType}} </v-btn>
                    <v-btn color="teal" dark class="ml-2 pa-2"
                    depressed> {{dialogOrder.percelType}} </v-btn>
                    <v-btn color="red" dark class="ml-2 pa-2"
                    depressed> {{dialogOrder.paymentStatus}} </v-btn>
                    <v-btn color="primary" dark class="ml-2 pa-2"
                    depressed> {{dialogOrder.trackId}} </v-btn>
                  </div>
                  <div class="selector">
                    <v-select
                    outlined
                    dense
                    v-model="currentStatus"
                    single-line
                    :items = "orderStatus"
                    ></v-select>
                  </div>
                </v-row>
              </div>
              <div class="body-x">
                <div>
                  <div class="item-body"> From: {{ dialogOrder.shop.name }} </div>
                  <div> Contact: {{  dialogOrder.shop.phone.substr(2) }} </div>
                  <div> Pickup area: {{ dialogOrder.shop.pickupArea }} </div>
                  <div> Address: {{ dialogOrder.shop.address }} </div>
                </div>
                <div class="recipient">
                  <div class="item-body"> To: {{ dialogOrder.recipientName }} </div>
                  <div> Phone: {{ dialogOrder.recipientPhone.substr(2) }} </div>
                  <div> Area: {{ dialogOrder.recipientArea }} </div>
                  <div> Address: {{ dialogOrder.recipientCity }} </div>
                  <!-- <div> Number of Items: {{ dialogOrder.numberOfItems }} </div> -->
                  <div> Delivery Time: {{ deliveryTime }} </div>
                  <div> Payable: {{ dialogOrder.price }} </div>
                </div>
              </div>

              <v-row class="mt-5" v-if="isValidStatus">
                <v-col cols="md-4">
                  <v-autocomplete
                  outlined
                  dense
                  label="Select Hub"
                  v-model="riderHub"
                  :items="hubs"
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-autocomplete
                  :disabled="!riderHub"
                  outlined
                  dense
                  label="Select Rider"
                  v-model="selectedRider"
                  item-text="name"
                  item-value="id"
                  :items="riders"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="md-2">
                  <v-btn
                  :loading="isAssigining"
                  class="pa-5"
                  depressed
                  color="primary"
                  @click="assignOrder"
                  >Assign</v-btn>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeModal"
            color="gray"
            text>Cancel</v-btn>
            <!-- <v-btn
            color="secondary">
              Update
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="Orders"
        class="elevation-0 pa-2"
        :loading="isInit"
        :items-per-page="1000000"
        hide-default-footer
        show-select
        v-model="selecedOrders"
      >
        <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Orders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card
      class="mr-2 mb-8"
      outlined>
        <v-card-text class="card-text">
          <v-row dense>
            <v-col lg="1" md="3" sm="12" cols="12">
              <v-text-field
              v-model="trackId"
              single-line
              outlined
              dense
              label="Track ID"> </v-text-field>
            </v-col>
            <v-col lg="2" md="3" sm="12" cols="12">
              <v-text-field
              v-model="phone"
              single-line
              outlined
              dense
              label="Phone"> </v-text-field>
            </v-col>
            <v-col lg="2" md="3" sm="12" cols="12">
              <v-dialog
                light
                ref="dialog"
                v-model="modal"
                :return-value.sync="dates"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateRangeText"
                    single-line
                    outlined
                    dense
                    label="Date range"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  scrollable
                  range
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="modal = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col lg="2" md="3" sm="12" cols="12">
              <v-autocomplete
              v-model="shopId"
              :items="shops"
              item-text="name"
              item-value="id"
              single-line
              outlined
              dense
              label="Shop"> </v-autocomplete>
            </v-col>
            <v-col lg="2" md="3" sm="12" cols="12" >
              <v-autocomplete
              v-model="deliveryZone"
              :items="thanas"
              single-line
              outlined
              dense
              label="Delivery Zone"> </v-autocomplete>
            </v-col>
            <v-col lg="3" md="3" sm="12" cols="12">
                <v-btn
                :disabled="searchDisabled"
                depressed
                class="mr-1"
                @click="searchHandle()"
                :loading="searchInit"
                color="primary">Search</v-btn>
                <v-btn
                :disabled="searchDisabled"
                class="mr-1"
                @click="resetSearchField"
                depressed
                color="primary">Reset</v-btn>
                <v-btn
                @click="addPercelInit"
                depressed
                color="primary">Add Parcel</v-btn>
            </v-col>
          </v-row>
          <v-row v-if="isSelectedOrders">
            <v-col lg="3" md="3" sm="12" cols="12">
              <v-autocomplete
              v-model="status"
              outlined
              dense
              :items="orderStatus"
              label="Status"
              single-line
              >
              </v-autocomplete>
            </v-col>
            <v-col lg="3" md="3" sm="12" cols="12">
              <v-textarea
              label="Notes"
              v-model="notes"
              rows="1"
              outlined
              dense
              auto-grow
              single-line>
              </v-textarea>
            </v-col>
            <v-col lg="3" md="3" sm="12" cols="12">
              <v-btn
                @click="changeStatus"
                depressed
                color="primary">Change Status</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      </template>
        <template v-slot:item.recipientPhone="{ item }">
          {{item.recipientPhone.substr(2)}}
        </template>
        <template v-slot:item.trackId="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                small
                @click="copyToClipboard(item)"
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{item.trackId}}
              </v-chip>
            </template>
            <span>Copy</span>
          </v-tooltip>
        </template>
        <template v-slot:item.isAccepted="{ item }">
          <v-chip
            :color="getColor(item.isAccepted)"
            dark
            small
          >
            {{ item.isAccepted ? 'Yes' : 'No' }}
          </v-chip>
        </template>
        <template v-slot:item.requestedDeliveryTime="{ item }">
          {{getTime(item.requestedDeliveryTime)}}
        </template>
        <template v-slot:item.deliverdAt="{ item }">
          <v-chip
            :color="getDeliveredAt(item.deliveredAt).color"
            dark
            small
          >
          {{getDeliveredAt(item.deliveredAt).time}}
          </v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="viewPercel(item)"
          >
            mdi-eye
          </v-icon>
        </template>
      </v-data-table>
      <div class="text-center pt-2 mb-8">
        <v-btn
        @click="loadMore()"
        :disabled="!hasMore"
        color="secondary"
        rounded
        small>Load More</v-btn>
    </div>
    </template>
  </div>
</template>
<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import copy from 'copy-to-clipboard';
import { mapActions, mapGetters } from 'vuex';
import moment from 'moment';
import AddParcel from './Add.vue';
import eventBus from '../../helpers/eventBus';
import constants from '../../constants';

export default {
  components: {
    AddParcel,
  },
  data: () => ({
    parcel: null,
    selecedOrders: [],
    showOrder: false,
    showAddPercel: false,
    phone: '',
    trackId: '',
    dates: [],
    modal: false,
    hasMore: false,
    isInit: true,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    searchInit: false,
    isSearched: false,
    dialogOrder: {},
    hubs: constants.THANAS,
    selectedRider: null,
    riderHub: null,
    orderStatus: Object.values(constants.orderStatus),
    currentStatus: null,
    riders: [],
    isAssigining: false,
    shops: [],
    shopId: '',
    deliveryZone: '',
    thanas: constants.THANAS,
    notes: '',
    status: '',
  }),
  computed: {
    ...mapGetters(['Orders']),
    isSelectedOrders() {
      return !!this.selecedOrders.length;
    },
    isValidStatus() {
      const {
        DELIVERED, DECLINED, CREATED, IN_TRANSIT,
      } = constants.orderStatus;
      const isExist = [DELIVERED, DECLINED, CREATED, IN_TRANSIT].includes(this.currentStatus);
      if (this.currentStatus === null || isExist) {
        return false;
      }
      return true;
    },
    searchDisabled() {
      return this.allEmpty;
    },
    allEmpty() {
      return !this.phone && this.dates.length === 0
      && !this.trackId && !this.shopId && !this.deliveryZone;
    },
    isSelectedOrder() {
      return Boolean(this.selecedOrders.length);
    },
    dateRangeText() {
      if (this.dates.length === 2) {
        const [dts, dte] = this.dates;
        if (new Date(dts) > new Date(dte)) {
          this.dates[0] = dte;
          this.dates[1] = dts;
        }
      }
      return this.dates.join(' ~ ');
    },
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'recipientName',
        },
        { text: 'Phone', value: 'recipientPhone' },
        { text: 'Track ID', value: 'trackId' },
        { text: 'Accepted', value: 'isAccepted' },
        { text: 'Area', value: 'recipientArea' },
        { text: 'City', value: 'recipientCity' },
        { text: 'Price', value: 'price' },
        { text: 'Currnet Status', value: 'currentStatus' },
        { text: 'Delivery Type', value: 'deliveryType' },
        { text: '# of Items', value: 'numberOfItems' },
        { text: 'Delivered', value: 'deliverdAt' },
        { text: 'Actions', value: 'actions' },
      ];
    },
    deliveryTime() {
      if (this.dialogOrder.deliveredAt) return moment(this.dialogOrder.deliveredAt).format('DD-MM-YY HH:mm A');
      return 'Not delivered yet';
    },
  },
  mounted() {
    this.intialize();
    this.allShops();
    eventBus.$on(constants.events.SHOW_ADD_PERCEL_DIALOG, (flag) => {
      if (!flag) {
        this.parcel = null;
      }
      this.showAddPercel = flag;
    });
  },
  watch: {
    async currentStatus(val) {
      const { CREATED, IN_TRANSIT } = constants.orderStatus;
      if (val !== CREATED && val !== IN_TRANSIT) { await this.addOrderStatus(); }
    },
    allEmpty(val) {
      if (val) {
        this.intialize();
      }
    },
    phone() {
      this.trackId = '';
    },
    trackId() {
      this.phone = '';
    },
    dates() {
      this.trackId = '';
    },
    async riderHub() {
      await this.fetchRidersByHub();
    },
  },
  methods: {
    ...mapActions(['ORDERS', 'SHOP_BY_ID', 'ADD_ORDER_STATUS', 'RIDERS_BY_HUB',
      'ASSIGN_RIDER', 'DELIVER_PARCEL', 'ALL_SHOPS_NAME', 'CHANGE_MULTIPLE_STATUS']),
    copyToClipboard(order) {
      copy(`${order.trackId}`);
      this.$toast('Copied to clipboard');
    },
    async changeStatus() {
      if (!this.status) return;
      const ids = this.selecedOrders?.map((o) => o.id);
      const data = {
        orderIds: ids,
        text: this.notes,
        status: this.status,
      };
      try {
        await this.CHANGE_MULTIPLE_STATUS(data);
        this.$toast.success('Parcels status updated successfully');
      } catch (err) {
        // err
      }
      console.log(data);
    },
    async allShops() {
      try {
        this.shops = await this.ALL_SHOPS_NAME();
      } catch (err) {
        //
      }
    },
    editItem(item) {
      console.log(item);
      this.parcel = item;
      this.showAddPercel = true;
    },
    async assignOrder() {
      this.isAssigining = true;
      try {
        const payload = {
          riderId: this.selectedRider,
          orderId: this.dialogOrder?.id,
        };
        await this.ASSIGN_RIDER(payload);
        this.currentStatus = constants.paymentType.IN_TRANSIT;
        this.dialogOrder.currentStatus = constants.paymentType.IN_TRANSIT;
        this.$toast.success('Rider assigned successfully');
      } catch (err) {
        // err
      }
      this.isAssigining = false;
    },
    async addOrderStatus() {
      if (this.currentStatus === this.dialogOrder.currentStatus
       || this.currentStatus === constants.orderStatus.CREATED) return;
      try {
        if (this.currentStatus !== constants.orderStatus.DELIVERED) {
          await this.ADD_ORDER_STATUS({
            id: this.dialogOrder.id,
            text: 'Test text',
            status: this.currentStatus,
          });
          this.$toast.success('Order updated successfully');
        } else {
          await this.DELIVER_PARCEL({
            orderId: this.dialogOrder.id,
            payment: this.dialogOrder.price,
            shopId: this.dialogOrder.shopId,
          });
          this.$toast.success('Order delivered successfully');
        }
      } catch (err) {
        // err
      }
    },
    async fetchRidersByHub() {
      try {
        if (this.riderHub) { this.riders = await this.RIDERS_BY_HUB(this.riderHub); }
      } catch (err) {
        // err
      }
    },
    addPercelInit() {
      this.showAddPercel = true;
    },
    async viewPercel(item) {
      try {
        const shop = await this.SHOP_BY_ID(item.shopId);
        this.showOrder = true;
        this.dialogOrder = item;
        this.dialogOrder.shop = shop;
        this.currentStatus = this.dialogOrder.currentStatus || 'Created';
      } catch (err) {
        this.closeModal();
      }
    },
    closeModal() {
      this.dialogOrder = {};
      this.showOrder = false;
      this.riderHub = null;
      this.selectedRider = null;
    },
    async loadMore() {
      const len = this.Orders.length;
      let lastId;
      if (len) lastId = this.Orders[len - 1]?.id;
      if (this.isSearched) {
        this.searchHandle(lastId);
      } else {
        this.intialize(lastId);
      }
    },
    async searchHandle(lastId = '') {
      this.isSearched = true;
      this.searchInit = true;
      this.hasMore = true;
      try {
        let startDate;
        let endDate;
        if (this.dates.length === 2) {
          const stts = new Date(this.dates[0]).valueOf();
          const ents = new Date(this.dates[1]).valueOf();
          const startDateTS = Math.min(stts, ents);
          const endDateTS = Math.max(stts, ents);
          startDate = new Date(startDateTS).setHours(0, 0, 0, 0);
          endDate = new Date(endDateTS).setHours(23, 59, 59);
        }
        const orders = await this.ORDERS({
          phone: this.phone,
          trackId: this.trackId,
          deliveryZone: this.deliveryZone,
          shopId: this.shopId,
          startDate,
          endDate,
          lastId,
        });
        if (orders?.length < 15) this.hasMore = false;
      } catch (err) {
        // err
      }
      this.searchInit = false;
    },
    resetSearchField() {
      this.dates = [];
      this.phone = '';
      this.trackId = '';
      this.shopId = '';
      this.deliveryZone = '';
      this.isSearched = false;
    },
    async intialize(lastId = '') {
      try {
        this.hasMore = true;
        const orders = await this.ORDERS({ lastId });
        if (orders.length < 15) this.hasMore = false;
      } catch (err) {
        // err
      }
      this.isInit = false;
    },
    getColor(flag) {
      return flag ? 'success' : 'info';
    },
    getTime(t) {
      const constDate = '0001-01-01T00:00:00Z';
      if (t && t !== constDate) { return moment(t).format('DD MMM YYYY'); }
      return 'N/A';
    },
    getDeliveredAt(t) {
      if (t) {
        return {
          time: moment(t).format('DD MMM YYYY').toString(),
          color: 'success',
        };
      }
      return { time: 'Not Yet', color: 'secondary' };
    },
  },
};
</script>
<style lang="scss" scoped>
.v-card__text.card-text {
    // min-height: 168px;
}
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.selector {
  width: 200px;
}
.row.top-menu {
    display: flex;
    justify-content: space-between;
}
.body-x {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.item-body {
  color: black;
  margin-bottom: 10px;
}
.recipient {
    max-width: 380px;
}
</style>
