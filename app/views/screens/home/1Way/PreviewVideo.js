/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Icon, Overlay} from 'react-native-elements';
// import ReactNativeModal from 'react-native-modal';
// import HeaderModal from '../../../components/HeaderModal';
import MyStatusBar from '../../../components/MyStatusBar';
// import MCQItem from './items/MCQItem';
import Video from 'react-native-video';
import BaseView from '../../../hoc/BaseView';
import {fonts} from '../../../../values/fonts';
import {colors} from '../../../../values/colors';
import {IS_TABLET} from '../../../../values/dimens';
import {useSelector} from 'react-redux';
import RNFS from 'react-native-fetch-blob';
import {Video as VideoCompress} from 'react-native-compressor';
import {uploadOneWayVideoAnswer} from '../../../../redux/actions/homeActions';
import {images} from '../../../../assets/images';
import {errorHandler} from '../../../../redux/networkRequests/ErrorHandler';
import AxiosBase from '../../../../redux/networkRequests/AxiosBase';
import {showAlert} from '../../../../utils/Message';
import {shortenBytes} from '../../../../utils/Validations';
import NetInfo from '@react-native-community/netinfo';

const PreviewVideo = props => {
  const baseViewRef = useRef(null);
  const videoPlayerRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);

  const [isPaused, setIsPaused] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [internetInfo, setInternetInfo] = useState(null);
  const [internetSpeed, setInternetSpeed] = useState(0);

  useEffect(() => {
    const {videoUrl} = props.route.params;
    // console.log('[PreviewVideoModal.js] init : ', videoUrl);
    if (videoUrl !== undefined) {
      setVideoUrl(videoUrl);
    }
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('[PreviewVideo.js] Connection type', state);
      setInternetInfo(state);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  const _onUpload = async () => {
    debugger;
    setIsPaused(true);
    if (baseViewRef !== null) {
      const {videoUrl, detail, testType, list} = props.route.params;
      // console.log('[PreviewVideo.js]', videoUrl, detail, testType, list);
      const _list = list;
      const index = list.findIndex(it => it._id === detail._id);
      if (testType === 'PRACTICE') {
        _list[index].answerUri = videoUrl;
        // console.log('[OneWay.js] On upload : ', _list);
        _onButtonPress('Upload', _list);
      } else if (testType === 'TEST') {
        // baseViewRef.current.showLoader();
        setIsUploading(true);
        console.log('[PreviewVideo.js] _onUpload : ', videoUrl);
        // const videoDetail = await RNFS.fs.stat(videoUrl);
        // console.log('[PreviewVideo.js] _onUpload : ', videoDetail);
        const formData = new FormData();

        const videoFileType = videoUrl.split('.');
        const fileName = videoUrl.split('/');
        const videoFile = {
          name: fileName[fileName.length - 1],
          type: `video/${videoFileType[videoFileType.length - 1]}`,
          uri: videoUrl,
        };
        formData.append('videos', videoFile);
        formData.append('questionId', detail._id);
        formData.append('candidateId', userPrefs._id);
        formData.append('testId', userPrefs.testAssign._id);

        console.log('[PreviewVideo.js] _onUpload : ', formData);
        AxiosBase.post('videos/storeVideos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            const {loaded, total} = progressEvent;
            let percent = Math.floor((loaded * 100) / total);
            console.log(
              `[PreviewVideo.js] Percent uploaded ${loaded}kb of ${total}kb | ${shortenBytes(
                total - loaded,
              )} | ${percent}%`,
            );
            setInternetSpeed(shortenBytes(total - loaded));
            setUploadPercent(percent);
          },
        })
          .then(response => {
            console.log('[HomeActions.js] response : ', response);
            setIsUploading(false);
            if (response.data.videoUrl !== undefined) {
              _list[index].answerUri = response.data.videoUrl;
              _onButtonPress('Upload', _list);
            }
          })
          .catch(error => {
            console.log(error);
            setIsUploading(false);
            showAlert('error', 'Error while uploading video. Try Again.');
            errorHandler(error);
          });
      }

      // setTimeout(() => {
      //   baseViewRef.current.hideLoader();
      //   // props.onUpload();
      //   _onButtonPress('Upload');
      //   // _onClose();
      // }, 1000);
    }
  };

  const _onClose = () => {
    props.navigation.goBack();
  };

  const _onButtonPress = (flag, list) => {
    const {onGoBack} = props.route.params;
    if (onGoBack !== undefined) {
      if (flag === 'Upload') {
        onGoBack(flag, list);
      } else {
        onGoBack(flag);
      }
    }
    _onClose();
  };

  return (
    <BaseView ref={baseViewRef}>
      <View style={styles.parent}>
        <MyStatusBar statusBarColor={'#fff'} />
        {/* <HeaderModal title={'Preview'} onBackPress={() => _onClose()} /> */}
        {internetInfo !== null && (
          <Text
            style={{
              fontSize: IS_TABLET ? 32 : 12,
              fontFamily: fonts.notoSans700,
              paddingHorizontal: 8,
              textTransform: 'capitalize',
            }}>
            Type :{' '}
            <Text style={{color: colors.darkBlue}}>{internetInfo.type}</Text>,
            Connected :{' '}
            <Text
              style={{
                color: internetInfo.isConnected ? colors.success : colors.alert,
              }}>
              {internetInfo.isConnected ? 'Yes' : 'No'},
            </Text>
            {isUploading && (
              <Text>
                Speed:{' '}
                <Text style={{color: colors.darkBlue}}>
                  {internetSpeed}/sec
                </Text>
              </Text>
            )}
          </Text>
        )}
        {videoUrl !== null && (
          <View style={{flex: 1}}>
            <Video
              source={{uri: videoUrl}}
              ref={videoPlayerRef}
              style={styles.videoView}
              controls={true}
              posterResizeMode={'contain'}
              paused={isPaused}
            />
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.view}
                disabled={isUploading}
                onPress={() => _onButtonPress('Reset', [])}>
                <Icon
                  name="restart"
                  type="material-community"
                  size={IS_TABLET ? 172 : 96}
                  color={isUploading ? '#888' : colors.accent}
                />
                <Text
                  style={[
                    styles.text,
                    {color: isUploading ? '#888' : colors.accent},
                  ]}>
                  Reset
                </Text>
              </TouchableOpacity>
              {isUploading ? (
                <TouchableOpacity style={styles.view} disabled>
                  <Image
                    style={{height: 120, width: 120}}
                    source={images.loader}
                  />
                  <Text style={styles.text}>Uploaded {uploadPercent}%</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.view}
                  onPress={() => _onUpload()}>
                  <Icon
                    name="upload"
                    type="material-community"
                    size={IS_TABLET ? 172 : 96}
                    color={colors.success}
                  />
                  <Text style={styles.text}>Upload</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
    </BaseView>
  );
};

export default PreviewVideo;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  videoView: {
    flex: 2,
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: IS_TABLET ? 32 : 16,
    fontFamily: fonts.notoSans600,
  },
});
