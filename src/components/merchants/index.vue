<template>
<div>
  <v-data-table
    :loading="isLoading"
    :headers="headers"
    :items="merchants"
    sort-by="calories"
    class="elevation-0"
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
      <template v-slot:item.status="{ item }">
        <v-switch
        color="success"
        v-model="item.status"
        @change="(c) => changeStatus(c, item)"
        ></v-switch>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="ml-2"
          @click="editItem(item)"
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
      >Load More</v-btn>
    </div>
</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data: () => ({
    editedItem: {},
    isLoading: true,
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
    changeStatus(c, item) {
      console.log(c, item.id);
      // TODO: implement deactive merchant
    },
    loadMore() {
      const id = this.merchants[this.merchants?.length - 3];
      this.initialize(id);
    },
    async initialize(lastId = '') {
      try {
        this.isLoading = true;
        await this.MERCHANTS({ lastId });
      } catch (err) {
        // err
      }
      this.isLoading = false;
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
