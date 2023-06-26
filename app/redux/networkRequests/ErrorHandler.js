import {showAlert} from '../../utils/Message';

export const errorHandler = error => {
  debugger;
  console.log('[Errorhandler.js] Error handler called', error);
  // showAlert('error', error.message);
  const status = error.response !== undefined ? error.response.status : null;

  if ((status !== null && status === 403) || status === 500 || status === 405) {
    debugger;
    const response = error.response.data;
    // console.log(
    //   '[Errorhandler.js] Error handler called',
    //   JSON.stringify(response),
    // );

    if (response.errMessage) {
      showAlert('error', response.errMessage);
    } else {
      showAlert('error', response.Message || response.message);
    }
  } else if(error.response.data.message){
    showAlert('error', error.response.data.message);
  }else {
    if (error.message === 'Network Error') {
      showAlert('error', 'Network or Server Error');
    } else {
      showAlert('error', error.message || error.Message);
    }
  }
};
