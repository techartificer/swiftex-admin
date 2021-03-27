// eslint-disable-next-line
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
module.exports = {
  errorCodes: {
    LOGGED_OUT: '404002',
    EXPIRED_JWT: '401003',
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
  ORDER_STATUS: {
    CREATED: 'Created',
    DELIVERED: 'Delivered',
    ACCEPTED: 'Accepted',
    PENDING: 'Pending',
    DECLINED: 'Declined',
    IN_TRANSIT: 'IN_TRANSIT',
    RETURNED: 'Returned',
    RESCHEDULED: 'Rescheduled',
  },
};
