import {PermissionsAndroid, Platform} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

export const copyFile = async (fileUri, name) => {
  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }
  const fileName = fileUri.split('.');
  debugger;
  //   const _fileType = fileName[fileName.length - 1].split('.')
  console.log('[FIleHandler.js] fileName : ', fileUri, fileName);
  RNFetchBlob.fs
    .cp(
      fileUri,
      `${RNFetchBlob.fs.dirs.DownloadDir}/${name}.${
        fileName[fileName.length - 1]
      }`,
    )
    .then(() => {
      console.log('[FIleHandler.js] Saved Locally');
    })
    .catch(error => {
      console.log('[FIleHandler.js] Saved Locally', error);
    });
};
