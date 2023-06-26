import axios from 'axios';
import AxiosBase from '../networkRequests/AxiosBase';
import {errorHandler} from '../networkRequests/ErrorHandler';
import {
  VIMEO_ACCESS_TOKEN,
  VIMEO_BASE_URL,
} from '../networkRequests/NetworkConstants';
import {INTERVIEW_TYPE} from './actionTypes';
import RNFS from 'react-native-fetch-blob';
import {Video} from 'react-native-compressor';
// import { responseJsonFile } from '../../json/responseJsonFile';
import Buffer from 'buffer';

export const setInterviewType = type => {
  return async dispatch => {
    dispatch({
      type: INTERVIEW_TYPE,
      interviewType: type,
    });
  };
};

export const startAssessment = id =>
  new Promise((resolve, reject) => {
    console.log('[HomeActions.js] startAssessment data : ', id);
    AxiosBase.put(`candidate/${id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
        errorHandler(error);
      });
  });

export const submitAssessment = data =>
  new Promise((resolve, reject) => {
    console.log('[HomeActions.js] submitAssessment data : ', data);
    AxiosBase.post('result/add', data)
      .then(response => {
        // console.log('[HomeActions.js] => ', response.data);
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
          if (
          error.response.data.message ===
          "Cannot read properties of undefined (reading 'reviewerEmail')"
        ) {
          console.log(error.response);
          resolve(error.response.data);
        } else {
          errorHandler(error);
          reject(error);
        }
      });
  });

export const uploadOneWayVideoAnswer = data =>

  new Promise((resolve, reject) => {
    debugger;
    console.log('[HomeActions.js] uploadOneWayVideoAnswer : ', data);
    AxiosBase.post('result/add', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: progressEvent => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(
          `[HomeActions.js] Percent uploaded ${loaded}kb of ${total}kb | ${percent}%`,
        );
        resolve({percent: percent});
      },
    })
      .then(response => {
        console.log('[HomeActions.js] response : ', response);
        resolve({
          data: response.data,
          percent: 100,
        });
      })
      .catch(error => {
        console.log(error);
        reject(error);
        errorHandler(error);
      });
  });

// export const uploadVimeoVideo = videoFile =>
//   new Promise(async (resolve, reject) => {
//     // const videoDetail = await RNFS.fs.stat(videoFile.uri);
//     console.log('[HomeActions.js] videoDetail', videoFile);
//     const file = {
//       name: videoFile.name,
//       type: videoFile.type,
//       uri: videoFile.uri,
//     };

//     // RNFS.fs.readFile(file.uri, (err, data) => {
//     //   if (err) {
//     //     console.log('[HomeActions.js] file : ', err);
//     //     return;
//     //   }
//     //   console.log('[HomeActions.js] file : ', data);
//     // });

//     const data = await RNFS.fs.readFile(videoFile.uri, 'ascii');
//     console.log('[HomeActions.js] patchConfig : ', data);
//     // // const binaryData = await RNFS.fs.createReadStream(videoFile.uri);

//     // const fileBuffer = await Buffer.from(data);
//     // console.log('[HomeActions.js] videoDetail', fileBuffer);

//     // eslint-disable-next-line no-undef
//     // const reader = new FileReader();
//     // reader.readAsBinaryString(videoFile.uri);
//     // reader.onload = data => {
//     //   console.log('[HomeActions.js] File Reader : ', data);
//     // }

//     // const dirs = RNFS.fs.dirs;
//     // RNFS.fs
//     //   .readFile(`${dirs.DownloadDir}/binary.txt`, 'ascii')
//     //   .then(data => {
//     //     console.log('[HomeActions.js] File Created Successfully', data);
//     //   })
//     //   .catch(error => {
//     //     console.log('[HomeActions.js] File Created Failure', error);
//     //   });
//     // console.log('[HomeActions.js] patchConfig : ', dirs);

//     // const compressedVideoUrl = await Video.compress(
//     //   videoFile.uri,
//     //   {
//     //     compressionMethod: 'auto',
//     //   },
//     //   progress => {
//     //     console.log('[HomeActions.js] Video COmpress progress : ', progress);
//     //   },
//     // );
//     // const compressedVideoDetail = await RNFS.fs.stat(compressedVideoUrl);
//     // // console.log('[HomeActions.js] uploadVimeoVideo : ', compressedVideoDetail);

//     // let data = JSON.stringify({
//     //   upload: {
//     //     approach: 'tus',
//     //     size: compressedVideoDetail.size.toString(),
//     //   },
//     // });

//     // let config = {
//     //   method: 'post',
//     //   url: 'https://api.vimeo.com/me/videos',
//     //   headers: {
//     //     Authorization: 'bearer eb123c869f810c48a1fec4b5e40e625b',
//     //     'Content-Type': 'application/json',
//     //     Accept: 'application/vnd.vimeo.*+json;version=3.4',
//     //   },
//     //   data: data,
//     // };
//     // console.log('[HomeActions.js] ');
//     // axios(config)
//     //   .then(response => {
//     //     const uploadLink = response.data.upload.upload_link;
//     //     const videoFileUrl = response.data.link;
//     //     console.log(
//     //       '[HomeActions.js] Generating upload link video : ',
//     //       response,
//     //       uploadLink,
//     //       videoFileUrl,
//     //     );
//     //     if (uploadLink !== undefined) {
//     //       // const uploadLink =
//     //       //   'https://asia-files.tus.vimeo.com/files/vimeo-prod-src-tus-asia/22725668d4017d9f8fa606cf85707d2c';
//     //       uploadVideoFileUsingUploadLink(
//     //         compressedVideoDetail,
//     //         uploadLink,
//     //         videoFile,
//     //       )
//     //         .then(response => {
//     //           verifyUpload(uploadLink)
//     //             .then(verifyResponse => {
//     //               console.log(
//     //                 '[HomeActions.js] File Uploaded Successfully.',
//     //                 verifyResponse,
//     //               );
//     //             })
//     //             .catch(verifyError => {
//     //               console.log(
//     //                 '[HomeActions.js] File Uploaded Error.',
//     //                 verifyError,
//     //               );
//     //             });
//     //         })
//     //         .catch(error => {
//     //           console.log('[HomeActions.js] File Uploaded Error.', error);
//     //         });
//     //     } else {
//     //       reject({error: 'No Upload link found. Try Again.'});
//     //     }
//     //   })
//     //   .catch(error => {
//     //     console.log('[HomeActions.js] Generating upload link error : ', error);
//     //     reject({error: 'Error while creating uploading link'});
//     //   });
//   });

// const uploadVideoFileUsingUploadLink = (file, uploadLink, videoFile) =>
//   new Promise(async (resolve, reject) => {
//     //   console.log('[HomeActions.js] videoData : ', videoBinaryFile, videoBinaryData);
//     // const data = new FormData();
//     // data.append('data', RNFS.fs.createFile(videoFile.uri));
//     const data = await RNFS.fs.readFile(videoFile.uri, 'ascii');
//     console.log('[HomeActions.js] videoData : ', data);
//     let patchConfig = {
//       method: 'patch',
//       url: uploadLink,
//       headers: {
//         'Tus-Resumable': '1.0.0',
//         'Upload-Offset': '0',
//         'Content-Type': 'application/offset+octet-stream',
//         Accept: 'application/vnd.vimeo.*+json;version=3.4',
//       },
//       data: data,
//     };
//     console.log('[HomeActions.js] patchConfig : ', patchConfig);
//     axios(patchConfig)
//       .then(response => {
//         console.log('[HomeActions.js] Uploading video response : ', response);
//         resolve(response);
//       })
//       .catch(error => {
//         console.log('[HomeActions.js] Uploading video error : ', error);
//         reject(error);
//       });
//   });

// const verifyUpload = uploadLink =>
//   new Promise((resolve, reject) => {
//     let config = {
//       method: 'head',
//       url: uploadLink,
//       headers: {
//         'Tus-Resumable': '1.0.0',
//         Accept: 'application/vnd.vimeo.*+json;version=3.4',
//       },
//     };

//     axios(config)
//       .then(response => resolve(response))
//       .catch(error => reject(error));
//   });

// // https://vimeo.com/729289525
// // https://vimeo.com/729286501

// export const uploadPatch = file =>
//   new Promise(async (resolve, reject) => {
//     // const compressedVideoDetail = await RNFS.fs.stat(file.uri);
//     // const _file = {
//     //   name : compressedVideoDetail.filename,
//     //   uri : file.uri,
//     //   type : 'video/mp4'
//     // }
//     // const reader = new FileReader();
//     // console.log('[HomeActions.js] VideoFile Called: ',reader)
//     // reader.readAsDataURL(file.uri);
//     // reader.onload = () => console.log('[HomeActions.js] : ',reader.result);
//     // reader.onerror = error => console.log('[HomeActions.js] : ',error);
//     // const uploadLink = ''
//     // let patchConfig = {
//     //   method: 'patch',
//     //   url: uploadLink,
//     //   headers: {
//     //     'Tus-Resumable': '1.0.0',
//     //     'Upload-Offset': '0',
//     //     'Content-Type': 'application/offset+octet-stream',
//     //     Accept: 'application/vnd.vimeo.*+json;version=3.4',
//     //   },
//     //   data: videoBinaryData.join(''),
//     // };
//     // axios(config)
//     //   .then(response => resolve(response))
//     //   .catch(error => reject(error));
//   });
