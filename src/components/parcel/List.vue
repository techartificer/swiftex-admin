<template>
  <div>
    <transition name="fade">
      <add-parcel v-if="showAddPercel"/>
    </transition>
    <template v-if="!showAddPercel">
      <v-data-table
        :headers="headers"
        :items="Orders"
        class="elevation-0"
        :loading="isInit"
        :items-per-page="1000000"
        hide-default-footer
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
        <v-card-text>
          <v-row dense>
            <v-col>
              <v-text-field
              v-model="phone"
              single-line
              outlined
              dense
              label="Phone"> </v-text-field>
            </v-col>
            <v-col>
              <v-text-field
              v-model="trackId"
              single-line
              outlined
              dense
              label="Track ID"> </v-text-field>
            </v-col>
            <v-col>
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
            <v-col cols="lg-4">
                <v-btn
                :disabled="searchDisabled"
                depressed
                class="mr-1"
                @click="searchHandle"
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
                @click="getColor"
                color="black"
                dark
                v-bind="attrs"
                v-on="on"
              >
                {{item.trackId}}
              </v-chip>
            </template>
            <span>Track parcel</span>
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
            :color="getDeliveredAt(item.deliverdAt).color"
            dark
            small
          >
          {{getDeliveredAt(item.deliverdAt).time}}
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
  }),
  computed: {
    ...mapGetters(['Orders']),
    searchDisabled() {
      return !this.phone && !this.trackId && this.dates.length !== 2;
    },
    allEmpty() {
      return this.phone === '' && this.dates.length === 0 && this.trackId === '';
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
        { text: 'Type', value: 'parcelType' },
        { text: 'Delivery Type', value: 'deliveryType' },
        { text: '# of Items', value: 'numberOfItems' },
        { text: 'Delivered', value: 'deliverdAt' },
        { text: 'Actions', value: 'actions' },
      ];
    },
  },
  mounted() {
    this.intialize();
    eventBus.$on(constants.events.SHOW_ADD_PERCEL_DIALOG, (flag) => {
      this.showAddPercel = flag;
    });
  },
  watch: {
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
  },
  methods: {
    ...mapActions(['ORDERS']),
    addPercelInit() {
      this.showAddPercel = true;
    },
    viewPercel(item) {
      console.log(item);
    },
    async searchHandle() {
      this.isSearched = true;
      this.searchInit = true;
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
        await this.ORDERS({
          phone: this.phone,
          trackId: this.trackId,
          startDate,
          endDate,
        });
      } catch (err) {
        // err
      }
      this.searchInit = false;
    },
    resetSearchField() {
      this.dates = [];
      this.phone = '';
      this.trackId = '';
      if (this.isSearched) {
        this.intialize();
      }
      this.isSearched = false;
    },
    async intialize() {
      try {
        await this.ORDERS();
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
      // const constDate = '0001-01-01T00:00:00Z';
      if (t && new Date(t) > new Date('2020-12-31 00:00:00')) {
        return {
          time: moment(t).format('DD MMM YYYY'),
          color: 'success',
        };
      }
      return { time: 'Not Yet', color: 'secondary' };
    },
  },
};
</script>
<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
