<template>
<div>
  <v-data-table
    :loading="isLoading"
    :headers="headers"
    :items="Riders"
    class="elevation-0"
    hide-default-footer
    :items-per-page="1000000"
    dense
  >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Riders</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Add Rider
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                        ref="name"
                        outlined
                        dense
                        v-model="name"
                        :rules="[() => !!name || 'This field is required' ]"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-text-field
                      ref="phone"
                      outlined
                      dense
                      v-model="phone"
                      label="Phone"
                      :rules="[
                        () => !!phone || 'This field is required',
                        validatePhoneNumber
                      ]"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                        ref="contact"
                        outlined
                        dense
                        v-model="contact"
                        :rules="[
                          () => !!contact || 'This field is required',
                          validateContactNumber
                        ]"
                        label="Emergency Contact"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-text-field
                        ref="nid"
                        outlined
                        :rules="[() => !!nid || 'This field is required' ]"
                        dense
                        v-model="nid"
                        label="NID"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                      ref="salary"
                      outlined
                      :rules="[() => !!salary || 'This field is required' ]"
                      dense
                      v-model="salary"
                      label="Salary"
                      type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-autocomplete
                        ref="hub"
                        autocomplete="off"
                        outlined
                        :rules="[() => !!hub || 'This field is required' ]"
                        dense
                        v-model="hub"
                        :items="thanas"
                        label="Hub"
                      ></v-autocomplete>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0"
                    >
                      <v-text-field
                        ref="password"
                        autocomplete="off"
                        :rules="[() => !!password || 'This field is required' ]"
                        outlined
                        dense
                        v-model="password"
                        label="Password"
                        type="password"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                      class="pa-0 pl-2"
                    >
                      <v-textarea
                        autocomplete="off"
                        outlined
                        dense
                        v-model="remark"
                        label="Remark"
                        rows="1"
                        auto-grow
                        ref="remark"
                      ></v-textarea>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                      class="pa-0"
                    >
                      <v-textarea
                        autocomplete="off"
                        outlined
                        :rules="[() => !!address || 'This field is required' ]"
                        dense
                        v-model="address"
                        label="Address"
                        rows="2"
                        auto-grow
                        ref="address"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  rounded
                  @click="closeDialog()"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="secondary"
                  depressed
                  rounded
                  @click="addRider()"
                  :loading="isAdding"
                >
                  Add
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      x-small
      class="pa-3 mt-5"
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
import { formatNumber } from '../../helpers/phoneNumber';
import constants from '../../constants';

export default {
  data: () => ({
    formTitle: 'Add Rider',
    editedItem: {},
    isLoading: true,
    isLoadingMore: false,
    disableLoadMore: false,
    thanas: constants.THANAS,
    name: '',
    phone: '',
    hub: '',
    contact: '',
    password: '',
    remark: '',
    address: '',
    salary: '',
    nid: '',
    dialog: false,
    isAdding: false,
  }),
  computed: {
    ...mapGetters(['Riders']),
    headers() {
      return [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Phone', value: 'phone' },
        { text: 'NID', value: 'NID' },
        { text: 'Hub', value: 'hub' },
        { text: 'Adress', value: 'address' },
        { text: 'Registered at', value: 'createdAt' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    validateContactNumber() {
      const { isValid } = formatNumber(`+88${this.contact}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        name: this.name,
        phone: `88${this.phone}`,
        hub: this.hub,
        contact: `88${this.contact}`,
        password: this.password,
        remark: this.remark,
        address: this.address,
        salary: +this.salary,
        nid: this.nid,
      };
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    ...mapActions(['RIDERS', 'ADD_RIDER']),
    resetForm() {
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f]) { this.$refs[f].reset(); }
      });
    },
    validdateForm() {
      let isValid = true;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) isValid = false;
        this.$refs[f].validate(true);
      });
      return isValid;
    },
    closeDialog() {
      this.resetForm();
      this.dialog = false;
    },
    async addRider() {
      const isValid = this.validdateForm();
      if (!isValid) return;
      const { isValid: isValidPhone } = formatNumber(`+88${this.contact}`);
      const { isValid: isValidContact } = formatNumber(`+88${this.contact}`);
      if (!isValidPhone || !isValidContact) return;
      this.isAdding = true;
      try {
        await this.ADD_RIDER(this.form);
        this.$toast.success('New Rider added successfully');
        this.closeDialog();
      } catch (err) {
        // err
      }
      this.isAdding = false;
    },
    getDate(date) {
      return moment(date).format('DD, MMM YYYY HH:mm A');
    },
    changeStatus(c, item) {
      console.log(c, item.id);
      // TODO: implement deactive merchant
    },
    loadMore() {
      this.isLoadingMore = true;
      const id = this.Riders[this.Riders?.length - 1]?.id;
      this.initialize(id);
    },
    async initialize(lastId = '') {
      try {
        this.isLoading = true;
        const data = await this.RIDERS({ lastId });
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
