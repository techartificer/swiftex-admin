<template>
<div>
  <v-data-table
    :loading="isLoading"
    :headers="headers"
    :items="merchants"
    sort-by="calories"
    class="elevation-0"
    hide-default-footer
    :items-per-page="1000000"
    dense
  >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Merchants</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.createdAt="{ item }">
        {{getDate(item.createdAt)}}
      </template>
      <template v-slot:item.status="{ item }">
        <v-switch
        dense

        color="success"
        v-model="item.status"
        @change="(c) => changeStatus(c, item)"
        ></v-switch>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="ml-2"
          @click="viewMerchant(item)"
        >
          mdi-eye
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
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
import moment from 'moment';
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    editedItem: {},
    isLoading: true,
    isLoadingMore: false,
    disableLoadMore: false,
  }),
  computed: {
    ...mapGetters(['merchants']),
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Phone', value: 'phone' },
        { text: 'Email', value: 'email' },
        { text: 'Registered at', value: 'createdAt' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(['MERCHANTS']),
    getDate(date) {
      return moment(date).format('DD, MMM YYYY HH:MM A');
    },
    changeStatus(c, item) {
      console.log(c, item.id);
      // TODO: implement deactive merchant
    },
    loadMore() {
      this.isLoadingMore = true;
      const id = this.merchants[this.merchants?.length - 1]?.id;
      this.initialize(id);
    },
    viewMerchant(merchant) {
      console.log(merchant);
    },
    async initialize(lastId = '') {
      try {
        this.isLoading = true;
        const data = await this.MERCHANTS({ lastId });
        if (data?.length < 15) {
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
    text-align: center;
    margin-bottom: 30px;
  }
</style>
