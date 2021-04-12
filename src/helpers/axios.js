import axios from 'axios';
import { baseURL } from '../constants/api';

export default axios.create({
  baseURL: `${baseURL}/v1`,
  headers: {
    agent: 'browser',
  },
});
