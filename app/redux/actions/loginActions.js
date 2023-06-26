import { showAlert } from '../../utils/Message';
import { saveToken, saveUserPref } from '../../utils/UserPrefs';
import AxiosBase from '../networkRequests/AxiosBase';
import { errorHandler } from '../networkRequests/ErrorHandler';
import { LOGOUT, USER_PREFS } from './actionTypes';

export const setUserPrefs = data => {
  return async dispatch => {
    dispatch({
      type: USER_PREFS,
      userPrefs: data,
    });
  };
};

export const setLogoutUser = () => {
  return async dispatch => {
    dispatch({
      type: LOGOUT,
      data: null,
    });
  };
};

export const loginUser = code =>
  new Promise((resolve, reject) => {
    const data = {
      uniqueCode: code,
    };
    debugger;
    console.log('[LoginActions.js] loginUser data : ', data);
    AxiosBase.post('candidate/uniquecode', data)
      .then(response => {
        const res = response.data;
        console.log('[LoginActions.js] Response => ', response.data);
        if (res.message.toUpperCase() === 'CANDIDATE SUCCESSFULLY LOGIN') {
          resolve(res);
        } else {
          const msg = 'Oops! This is not a correct Interview Code.';
          showAlert('error', msg);
          reject({ error: msg });
        }
      })
      .catch(error => {
        console.log(error);
        reject(error);
        errorHandler(error);
      });
  });
