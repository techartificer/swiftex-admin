<template>
  <div>
    <v-dialog persistent
    width="350"
    v-model="cashOutShow">
      <v-card>
        <v-card-title> Cash Out </v-card-title>
        <v-card-text>
          <v-text-field outlined dense class="mt-5" label="TRX Code" v-model="trxCode">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded text @click="cancelDialog">
            Cancel
          </v-btn>
          <v-btn dark color="secondary" :loading="isCashOuting"
          rounded depressed @click="cashOutHandle()">
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="requests"
      :items-per-page="10"
      :loading="isLoading"
    >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Payments</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn rounded small depressed ripple="">
        <v-icon
          @click="cashOut(item)"
        >
          mdi-cash-check
        </v-icon>
      </v-btn>
    </template>
    </v-data-table>
  </div>
</template>
<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    isLoading: false,
    cashOutShow: false,
    trxCode: '',
    trxItem: {},
    isCashOuting: false,
  }),
  computed: {
    ...mapGetters(['CashOutRequests']),
    headers() {
      return [
        {
          text: 'Shop Name',
          align: 'start',
          sortable: false,
          value: 'shopName',
        },
        { text: 'Phone', value: 'phone' },
        { text: 'Amount', value: 'amount' },
        { text: 'Balance', value: 'balance' },
        { text: 'Expires At', value: 'expiresAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
    },
    requests() {
      return this.CashOutRequests?.map((r) => ({
        ...r,
        shopName: r?.shop?.name,
        phone: r?.shop?.phone?.substr(2),
        expiresAt: moment(new Date(r?.trxCodeExpiresAt * 1000)).format('ddd, DD-MM-YYYY, HH:mm A'),
        balance: r?.balance?.toFixed(2),
      }));
    },
  },
  mounted() {
    this.getCashOutRequests();
  },
  methods: {
    ...mapActions(['CASH_OUT_REQUESTS', 'CASH_OUT']),
    cashOut(item) {
      this.trxItem = item;
      this.cashOutShow = true;
    },
    async cashOutHandle() {
      this.isCashOuting = true;
      try {
        // eslint-disable-next-line no-underscore-dangle
        await this.CASH_OUT({ trxCode: this.trxCode, trxId: this.trxItem._id || this.trxItem.id });
        this.cancelDialog();
        this.$toast.success('Cash out successful');
      } catch (err) {
        //
      }
      this.isCashOuting = false;
    },
    cancelDialog() {
      this.trxCode = '';
      this.cashOutShow = false;
    },
    async getCashOutRequests(lastId = '') {
      try {
        this.isLoading = true;
        await this.CASH_OUT_REQUESTS({ lastId });
      } catch (err) {
        // err
      }
      this.isLoading = false;
    },
  },
};
</script>
