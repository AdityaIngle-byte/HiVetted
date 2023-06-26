// https://invoice.gmeplay.com/index.php/api/common/state/101

import axios from 'axios';
import {getToken} from '../../utils/UserPrefs';
import {apiDomain} from './NetworkConstants';

const AxiosBase = axios.create({
  baseURL: apiDomain,
});

AxiosBase.interceptors.request.use(
  async config => {
    // config.headers['Authorization'] = `Bearer ${await getToken()}`;
    // config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// AxiosBase.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         Promise.reject(error)
//     }
// )

export default AxiosBase;

// export const handleError = (error) => {
//     alert('handle Error')
//     console.log('HandleError : ',JSON.stringify(error))
//     if(error.response.status === 404){
//         // showMessage(error.response.data.Message)
//     }
// }
