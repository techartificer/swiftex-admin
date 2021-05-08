<template>
  <v-card flat class="mx-auto">
    <v-card-title>{{parcel ? 'Update' : 'Add'}} Percel</v-card-title>
    <v-card-text class="center">
      <v-card flat
      outlined
      width="700"
      class="mx-auto card-border">
        <v-card-text>
          <div class="head mt-6">
          <v-file-input
          label="Import from file"
          single-line
          outlined
          dense
          accept=".csv"
          v-model="file"
          ></v-file-input>
          <v-autocomplete
          class="pl-2"
          v-model="shopId"
          :items="AllShops"
          item-value="id"
          item-text="name"
          outlined
          dense
          single-line
          label="Select Shop"
          clearable
          ></v-autocomplete>
        </div>
        </v-card-text>
        <v-card-actions v-if="!shopId || imported">
          <v-spacer></v-spacer>
          <v-btn text
           color="secondary"
           rounded
           @click="closeAddPercel"
           >Cancel</v-btn>
           <v-btn
           v-if="imported && shopId"
           :disabled="addOrderBtn"
           color="secondary"
           rounded
           depressed
           @click="multipleOrderAddHandle"
           >Add Orders</v-btn>
        </v-card-actions>
      </v-card>
    </v-card-text>
    <v-card-text v-if="shopId && !imported">
      <div
      class="create-shop"
      >
      </div>
        <v-card
        outlined
        max-width="700"
        class="mx-auto card-border"
        >
          <v-card-text class="pt-10">
          <v-row>
            <v-col>
              <v-text-field
              ref="recipientName"
              v-model="name"
              label="Recipient Name"
              dense
              :rules="[() => !!name || 'This field is required' ]"
              outlined>
              </v-text-field>
            <v-autocomplete
              ref="paymentStatus"
              :rules="[() => !!paymentStatus || 'This field is required' ]"
              :items="paymentStatuses"
              outlined
              v-model="paymentStatus"
              dense
              label="Payment Status"
            ></v-autocomplete>
            <v-autocomplete
              ref="recipientArea"
              :rules="[() => !!deliveryZone || 'This field is required' ]"
              :items="thanas"
              outlined
              v-model="deliveryZone"
              dense
              label="Delivery Thana"
            ></v-autocomplete>
            <v-text-field
              :rules="[
                () => !!price || 'This field is required'
              ]"
              ref="price"
              v-model="price"
              label="Collectable Amount"
              type="number"
              dense
              outlined>
            </v-text-field>
            <v-text-field
              v-if="showMore"
              ref="numberOfItems"
              v-model="totalNumberOfItems"
              label="Total Number of Items"
              type="number"
              dense
              outlined>
            </v-text-field>
            <v-textarea
              v-if="showMore"
              :rules="[() => true]"
              ref="comments"
              outlined
              v-model="comments"
              dense
              rows="1"
              auto-grow
              label="Comments"> </v-textarea>
            </v-col>
            <v-col>
              <v-text-field
              :rules="[
                () => !!phone || 'This field is required',
                validatePhoneNumber
              ]"
              ref="recipientPhone"
              v-model="phone"
              label="Phone Number"
              dense
              outlined>
              </v-text-field>
            <v-autocomplete
              :rules="[() => !!deliveryType || 'This field is required' ]"
              ref="deliveryType"
              :items="deliveryTypes"
              outlined
              v-model="deliveryType"
              dense
              label="Delvery type"
            ></v-autocomplete>
            <v-textarea
              :rules="[() => !!recipientAddress || 'This field is required' ]"
              ref="recipientAddress"
              outlined
              v-model="recipientAddress"
              dense
              rows="1"
              auto-grow
              label="Recipient Address"> </v-textarea>
              <v-text-field
              :rules="[() => !!weight || 'This field is required']"
              ref="weight"
              v-model="weight"
              label="Weight (kg)"
              dense
              type="number"
              outlined>
            </v-text-field>
              <v-textarea
              v-if="showMore"
              ref="pickAddress"
              outlined
              v-model="pickAddress"
              dense
              rows="1"
              auto-grow
              label="Pick Address"> </v-textarea>
            <v-autocomplete
              v-if="showMore"
              ref="percelType"
              :items="percelTypes"
              outlined
              v-model="percelType"
              dense
              label="Parcel type"
            ></v-autocomplete>
            </v-col>
          </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
            text
            ripple
            rounded
            color="primary"
            @click="showMore=!showMore"
            >
              {{showMore ? 'Show Less' : 'Show More'}}
              <v-icon> {{showMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
             </v-btn>
            <v-spacer></v-spacer>
            <v-btn
            text
            rounded
            color="secondary"
            @click="closeAddPercel">Cancel</v-btn>
            <v-btn
            depressed
            rounded
            color="secondary"
            @click="handleAction"
            :loading="isLoading"
            >
            {{parcel ? 'Update' : 'Create'}}
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import constants from '../../constants';
import eventBus from '../../helpers/eventBus';
import { formatNumber } from '../../helpers/phoneNumber';
import importFromCSV from '../../mixins/importFromCSV';

export default {
  mixins: [importFromCSV],
  props: ['parcel'],
  data: () => ({
    validOrders: null,
    addOrderBtn: true,
    file: null,
    shopId: '',
    imported: false,
    weight: '',
    showMore: false,
    thanas: constants.THANAS,
    thana: '',
    city: 'Dhaka',
    phone: '',
    recipientArea: '',
    recipientName: '',
    name: '',
    percelType: 'Product',
    recipientAddress: '',
    deliveryType: '',
    zip: '',
    comments: '',
    paymentStatus: '',
    deliveryZone: '',
    pickupArea: '',
    price: '',
    totalNumberOfItems: '',
    pickAddress: '',
    packageCode: '',
    isLoading: false,
  }),
  mounted() {
    if (this.parcel) {
      this.shopId = this.parcel?.shopId;
      this.phone = this.parcel?.recipientPhone?.substr(2);
      this.thana = this.parcel?.thana;
      this.deliveryZone = this.parcel?.recipientArea;
      this.deliveryType = this.parcel?.deliveryType;
      this.name = this.parcel?.recipientName;
      this.percelType = this.parcel?.percelType;
      this.recipientAddress = this.parcel?.recipientAddress;
      this.paymentStatus = this.parcel?.paymentStatus;
      this.price = this.parcel?.price;
      this.weight = this.parcel?.weight;
      this.totalNumberOfItems = this.parcel?.numberOfItems;
      this.comments = this.parcel?.comments;
      this.percelType = this.parcel?.percelType;
      this.pickAddress = this.parcel?.pickAddress;
      const flag = this.parcel?.numberOfItems || this.parcel?.comments || this.parcel?.percelType !== 'Product';
      if (flag) {
        this.showMore = true;
      }
    }
  },
  computed: {
    ...mapGetters(['AllShops']),
    coverageAreas() {
      return constants.COVERAGE_AREAS;
    },
    selectedShop() {
      const idx = this.AllShops?.findIndex((s) => s.id === this.shopId);
      if (idx < 0) return null;
      return this.AllShops[idx];
    },
    percelTypes() {
      return ['Documents', 'Products'];
    },
    paymentStatuses() {
      return ['COD', 'PAID'];
    },
    deliveryTypes() {
      return ['Regular', 'Express'];
    },
    validatePhoneNumber() {
      const { isValid } = formatNumber(`+88${this.phone}`);
      if (!isValid) return 'Phone number should be valid';
      return true;
    },
    form() {
      return {
        deliveryType: this.deliveryType,
        paymentStatus: this.paymentStatus,
        recipientAddress: this.recipientAddress,
        recipientArea: this.deliveryZone,
        recipientName: this.name,
        recipientPhone: this.phone,
        price: this.price,
        weight: this.weight,
      };
    },
  },
  methods: {
    ...mapActions(['ORDER_CREATE', 'UPDATE_ORDER', 'CREATE_MULTIPLE_ORDERS']),
    async multipleOrderAddHandle() {
      const orders = this.parseData(this.validOrders || []);
      try {
        await this.CREATE_MULTIPLE_ORDERS({ shopId: this.shopId, orders });
        this.file = null;
        this.shopId = null;
        this.$toast.success('Orders added successfully');
      } catch (err) {
        // err
      }
    },
    validdateForm() {
      let isValid = true;
      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) isValid = false;
        this.$refs[f].validate(true);
      });
      return isValid;
    },
    resetForm() {
      Object.keys(this.form).forEach((f) => {
        if (this.$refs[f]) { this.$refs[f].reset(); }
      });
    },
    async handleAction() {
      this.isLoading = true;
      const validForm = this.validdateForm();
      try {
        const { isValid, number } = formatNumber(`+88${this.form?.recipientPhone}`);
        if (validForm && isValid) {
          const data = {
            ...this.form,
            percelType: this.percelType,
            pickAddress: this.pickAddress || this.selectedShop?.pickupAddress,
            pickHub: this.pickupArea || this.selectedShop?.pickupArea,
            recipientCity: this.city,
            recipientThana: this.deliveryZone,
            recipientZip: this.zip,
            price: Number(this.form.price),
            recipientPhone: number,
            weight: Number(this.form.weight),
            comments: this.comments,
            totalNumberOfItems: +this.totalNumberOfItems,
          };
          if (!this.parcel) {
            await this.ORDER_CREATE({ percel: data, shopId: this.shopId });
            this.resetForm();
            this.$toast.success('Order created successfully');
          } else if (this.parcel) {
            await this.UPDATE_ORDER({ update: data, shopId: this.shopId, id: this.parcel.id });
            this.$toast.success('Order updated successfully');
            this.closeAddPercel();
          }
        }
      } catch (err) {
        // console.log(err);
      }
      this.isLoading = false;
    },
    closeAddPercel() {
      this.resetForm();
      this.shopId = '';
      this.file = null;
      eventBus.$emit(constants.events.SHOW_ADD_PERCEL_DIALOG, false);
    },
  },
};
</script>
<style lang="scss" scoped>
.create-shop {
    padding-top: 20px;
    padding-bottom: 5px;
    color: #454446;
    width: fit-content;
    font-size: 28px;
    font-weight: 400;
}
.card-border {
  border-color: #c83843;
  border-width: 1px;
}
.head {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-between;
}
.v-card__text.center {
    display: flex;
    justify-content: center;
}
</style>
