// import {Platform} from 'react-native';
import Share from 'react-native-share';

export const share = (shareTitle, msg, url) =>
  new Promise((resolve, reject) => {
    Share.open({
      title: shareTitle,
      message: msg,
      url: url,
    })
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

export const downloadFile = (title, msg = 'Content', file) =>
  new Promise((resolve, reject) => {
    debugger;
    // const url = file;
    // // const title = title;
    // const message = msg;
    // const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';

    const options = {
      title: title,
      failOnCancel: false,
      saveToFiles: true,
      urls: [file],
    };

    Share.open(options)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });

export const shareFile = (title, file) =>
  new Promise((resolve, reject) => {
    // const url = file;
    // // const title = title;
    // const message = msg;
    // const icon = 'data:<data_type>/<file_extension>;base64,<base64_data>';

    const options = {
      title: title,
      failOnCancel: false,
      urls: [file],
    };

    Share.open(options)
      .then(response => resolve(response))
      .catch(error => reject(error));
  });
