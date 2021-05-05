let baseURL = 'https://api.freshagric.com';
if (process.env.NODE_ENV === 'production') {
  baseURL = 'https://api.freshagric.com';
}
module.exports = { baseURL };
