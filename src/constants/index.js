// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
module.exports = {
  DELIVERY_CHARGE: 60,
  errorCodes: {
    LOGGED_OUT: '404002',
    EXPIRED_JWT: '401005',
  },
  adminRoles: {
    SUPER_ADMIN: 'Super Admin',
    ADMIN: 'Admin',
    MODERATOR: 'Moderator',
  },
  roles: {
    OWNER: 'Owner',
    MODERATOR: 'Moderator',
  },
  events: {
    SHOW_SHOP_CU_DIALOG: 'showShopCreateUpdateDialog',
    SHOW_ADD_PERCEL_DIALOG: 'showAddPercelDialog',
  },
  PERMISSION: 'permission',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  CURRENT_SHOP_ID: 'currentShopId',
  EMAIL_REGEX: re,
  COVERAGE_AREAS: [
    'Mohakhali',
    'Banani',
    'Uttara',
    'Mirpur',
    'Bashundhara R/A',
  ],
  paymentType: {
    IN: 'IN',
    OUT: 'OUT',
  },
  orderStatus: {
    CREATED: 'Created',
    ACCEPTED: 'Accepted',
    DECLINED: 'Declined',
    PENDING: 'Pending',
    IN_TRANSIT: 'In Transit',
    RETURNED: 'Returned',
    RESCHEDULED: 'Rescheduled',
    DELIVERED: 'Delivered',
  },
  THANAS: ['Adabor', 'Airport', 'Badda', 'Banani', 'Bangshal',
    'Bhashantek', 'Cantonment', 'Chackbazar', 'Darussalam', 'Demra',
    'Dhanmondi', 'Gandaria', 'Gulshan', 'Hazaribag', 'Jatrabari',
    'Kadamtoli', 'Kafrul', 'Kalabagan', 'Kamrangirchar', 'Khilgaon',
    'Khilkhet', 'Kotwali', 'Lalbag', 'Mirpur Model', 'Mohammadpur',
    'Motijheel', 'Mugda', 'New Market', 'Pallabi', 'Paltan Model',
    'Ramna Model', 'Rampura', 'Rupnagar', 'Sabujbag', 'Shah ali',
    'Shahbag', 'Sherebanglanagar', 'Shyampur', 'Sutrapur',
    'Shahjahanpur', 'Tejgaon', 'Tejgaon I/A', 'Turag', 'Uttara Model',
    'Uttarkhan', 'Uttara West', 'Vatara', 'Wari'],
};
