import axios from 'axios';

export default () => {
  //   return axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
  return axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
  });
};
