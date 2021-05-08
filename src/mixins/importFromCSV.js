import Joi from 'joi';
import csv from '../helpers/csv';
import { formatNumber } from '../helpers/phoneNumber';
import constants from '../constants';

const mixin = {
  data: () => ({
    validOrders: null,
    addOrderBtn: true,
    file: null,
  }),
  watch: {
    async file(v) {
      if (v) {
        this.imported = true;
        try {
          const data = await csv.parse(v);
          this.validateOrders(data);
        } catch (errs) {
          if (Array.isArray(errs)) {
            errs.forEach(({ message }) => {
              this.$toast.error(message);
            });
          }
        }
      } else {
        this.imported = false;
      }
    },
  },
  methods: {
    isValidOrder(orders) {
      const schema = Joi.object({
        Name: Joi.string().required(),
        Phone: Joi.string().required().custom((v, h) => {
          const { isValid, number } = formatNumber(`880${v}`);
          if (!isValid) {
            return h.message(`Invalid phone number: ${v}`);
          }
          return number;
        }),
        Address: Joi.string().required(),
        'Payment Status': Joi.string().required().custom((v, h) => {
          if (!Object.values(constants.paymentStatus).includes(v)) {
            return h.message(`Invalid payment status type: ${v}`);
          }
          return v;
        }),
        'Delivery Type': Joi.string().required().custom((v, h) => {
          if (!Object.values(constants.deliveryType).includes(v)) {
            return h.message(`Invalid delivery type: ${v}`);
          }
          return v;
        }),
        'Delivery Thana': Joi.string().required().custom((v, h) => {
          if (!constants.THANAS.includes(v)) {
            return h.message(`Invalid Thana: ${v}`);
          }
          return v;
        }),
        'Collectable Amount': Joi.number().required(),
        'Parcel Type': Joi.string().allow('').custom((v, h) => {
          if (!Object.values(constants.parcelType).includes(v)) {
            return h.message(`Invalid parcel type: ${v}`);
          }
          return v || constants.parcelType.PRODUCTS;
        }),
        'Total Number of items': Joi.number().allow(''),
        'Pick Address': Joi.string().allow('').optional(),
        Comments: Joi.string().allow('').optional(),
        PickHub: Joi.string().allow('').optional(),
        Weight: Joi.number().required(),
      });
      const validOrders = [];
      let hasError = false;
      orders.forEach((o) => {
        const { error, value } = schema.validate(o);
        if (error) {
          this.$toast.error(error.message);
          hasError = true;
        } else {
          validOrders.push(value);
        }
      });
      if (hasError) this.file = null;
      return hasError ? null : validOrders;
    },
    validateOrders(orders) {
      this.validOrders = this.isValidOrder(orders);
      this.addOrderBtn = !this.validOrders;
    },
    parseData(orders) {
      const ret = orders.map((o) => ({
        deliveryType: o['Delivery Type'],
        paymentStatus: o['Payment Status'],
        recipientAddress: o.Address,
        recipientArea: o['Delivery Thana'],
        recipientName: o.Name,
        recipientPhone: o.Phone,
        percelType: o['Parcel Type'] || constants.parcelType.PRODUCTS,
        pickAddress: o['Pick Address'] || this.selectedShop?.pickupAddress,
        pickHub: o['Pickup Area'] || this.selectedShop?.pickupArea,
        recipientCity: this.city,
        recipientThana: o['Delivery Thana'],
        recipientZip: this.zip,
        price: o['Collectable Amount'],
        weight: o.Weight,
        comments: o.Comments,
        totalNumberOfItems: o['Total Number of items'],
      }));
      return ret;
    },
  },
};
export default mixin;
