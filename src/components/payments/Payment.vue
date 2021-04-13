<template>
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
  </v-data-table>
</template>
<script>
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    isLoading: false,
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
        { text: 'Amount', value: 'amount' },
        { text: 'Balance', value: 'balance' },
        { text: 'ExpiredAt', value: 'expiresAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
    },
    requests() {
      return this.CashOutRequests?.map((r) => ({
        shopName: r.shop.name,
        expiresAt: moment(new Date(r.trxCodeExpiresAt * 1000)).format('ddd, DD-MM-YYYY, HH:mm A'),
        ...r,
      }));
    },
  },
  mounted() {
    this.getCashOutRequests();
  },
  methods: {
    ...mapActions(['CASH_OUT_REQUESTS']),
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
