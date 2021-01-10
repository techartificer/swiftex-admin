import jwtDecode from 'jwt-decode';

const validateToken = (token) => {
  const decoded = jwtDecode(token);
  console.log(new Date(decoded?.exp * 1000), new Date());
  const isExpired = new Date(decoded?.exp * 1000) < new Date();
  return isExpired;
};
export default validateToken;
