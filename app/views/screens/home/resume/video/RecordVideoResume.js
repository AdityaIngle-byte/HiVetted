import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseView from '../../../../hoc/BaseView';
import {RNCamera} from 'react-native-camera';
import {Icon} from 'react-native-elements';
import {fonts} from '../../../../../values/fonts';
import {showAlert, showChoiceAlert} from '../../../../../utils/Message';
import CountDown from 'react-native-countdown-component';
import {colors} from '../../../../../values/colors';
import ButtonView from '../../../../components/ButtonView';
// import CameraFontsView from './items/CameraFontsView';
// import MarqueeView from '../../../../utils/MarqueeView';
// import {uploadResumeFile} from '../../../../redux/actions/resumeActions';
// import {getVideoType} from '../../../../utils/ImageLoader';
// import {Video} from 'react-native-compressor';
import {IS_TABLET, SCREEN_HEIGHT} from '../../../../../values/dimens';
import CameraFontsView from '../items/CameraFontsView';
import MarqueeView from '../../../../../utils/MarqueeView';
// import {
//   uploadPatch,
//   uploadVimeoVideo,
// } from '../../../../../redux/actions/homeActions';
import {copyFile} from '../../../../../utils/FIleHandler';
import AddResumeName from '../../../../modals/AddResumeName';
import { downloadFile } from '../../../../../utils/Share';

const RecordVideoResume = props => {
  const baseViewRef = useRef(null);
  const cameraRef = useRef(null);
  const addResumeRef = useRef(null);
  // const marqueeViewRef = useRef(null);

  const [isFirstTime, setIsFirstTime] = useState(true);
  const [scriptDetail, setScriptDetail] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraBlur, setIsCameraBlur] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [flashMode, setFlashMode] = useState(false);
  const [cameraMode, setCameraMode] = useState('front');
  const [fontSize, setFontSize] = useState(24);
  const [fontSpeed, setFontSpeed] = useState(12);
  const [showMarquee, setShowMarquee] = useState(false);
  const [recordedVideoData, setRecordedVideoData] = useState(null);

  useEffect(() => {
    init();

    if (!isFirstTime) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffectCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setScriptDetail, isRecording]);

  const init = () => {
    const {title, script} = props.route.params;
    if (title !== undefined && script !== undefined) {
      setScriptDetail({title, script});
    }
    checkCameraStatus();
    return;
  };

  const checkCameraStatus = () => {
    // if(RNCamera.Constants.CameraStatus === '')
    console.log(
      '[RecordVideoResume.js] Check CameraStatus : ',
      cameraRef.current,
    );
  };

  const useEffectCallback = () => {
    if (cameraRef !== null) {
      if (isRecording) {
        // console.log('[RecordResume.js] Video Recording Start',cameraRef.current)
        _startRecordVideo();
      } else {
        console.log('[RecordResume.js] Video Recording Stop');
        _stopRecordVideo();
      }
    }
  };

  const _onRecord = () => {
    setIsRecording(prevState => !prevState);
    setIsCollapsed(true);
    setIsFirstTime(false);
  };

  const _startRecordVideo = async () => {
    if (cameraRef !== null) {
      try {
        const promise = cameraRef.current.recordAsync({quality: 0.5});
        if (promise) {
          const data = await promise;
          console.log('[RecordResume.js] takeVideo', data);
          setRecordedVideoData(data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const _stopRecordVideo = () => {
    console.log('[RecordResume.js] Stopping Video: ', cameraRef);
    if (cameraRef !== null) {
      cameraRef.current.stopRecording();
    }
  };

  const _onSaveResumePress = () => {
    showChoiceAlert(
      'Try Again',
      'What do you want to do next?',
      () => _onReRecord(),
      'Save',
      () => _onSavePress(),
    );
  };

  const _onReRecord = () => {
    console.log('Re Record Press');
    setRecordedVideoData(null);
  };

  const _onSavePress = async () => {
    // console.log('[RecordVideoResume.js] on Save Resume : ', recordedVideoData);
    if (addResumeRef !== null) {
      addResumeRef.current.baseModal.showModal();
    }
  };

  const _onSaveResume = name => {
    debugger;
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        downloadFile(
          'High5 Resume',
          `Save or share ${name}.pdf resume`,
          recordedVideoData.uri,
        )
          .then(response => {
            showAlert('success', 'Saved Successfully!');
            props.navigation.replace('SubmitMCQ', {
              list: [],
            });
          })
          .catch(error => {
            showAlert('error', 'Error! Not Saved. Try Again');
          });
      }, 500);
    } else {
      copyFile(recordedVideoData.uri, name)
        .then(response => {
          showAlert('success', 'Saved Successfully!');
          props.navigation.replace('SubmitMCQ', {
            list: [],
          });
        })
        .catch(error => {
          showAlert('error', 'Error! Not Saved. Try Again');
        });
    }
  };

  // const _onVideoIcon = () => {
  //     setIsCameraBlur(prevState => !prevState)
  // }

  const _onCollapsed = () => {
    if (!isRecording) {
      setIsCollapsed(prevState => !prevState);
    } else {
      showAlert('error', 'Stop Recording');
    }
  };

  const _onFontSizeIncrease = () => {
    if (fontSize < 56) {
      setFontSize(fontSize + 2);
    } else {
      showAlert('error', 'Fonts Size cannot more than 56');
    }
  };

  const _onFontSizeDecrease = () => {
    if (fontSize > 10) {
      setFontSize(fontSize - 2);
    } else {
      showAlert('error', 'Fonts Size cannot less than 10');
    }
  };

  const _onFontSpeedDecrease = () => {
    if (fontSpeed > 2) {
      setFontSpeed(fontSpeed - 1);
    } else {
      showAlert('error', 'Font Speed cannot less than 10x');
    }
  };

  const _onFontSpeedIncrease = () => {
    if (fontSpeed < 28) {
      setFontSpeed(fontSpeed + 1);
    } else {
      showAlert('error', 'Font Speed cannot more than 28x');
    }
  };

  const _onFlashMode = () => {
    setFlashMode(prevState => !prevState);
  };

  const _onCameraMode = () => {
    setCameraMode(cameraMode === 'front' ? 'back' : 'front');
  };

  const _onMarqueeMode = () => {
    setShowMarquee(prevState => !prevState);
  };

  const _onPreviewVideo = () => {
    debugger;
    console.log("Reached");
    if (recordedVideoData !== null) {
      props.navigation.navigate('VideoPreview', {
        videoData: recordedVideoData.uri,
      });
    } else {
      showAlert('error', 'No video recorded yet');
    }
  };

  return (
    <BaseView
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Record Video Pitch"
      navigation={props.navigation}
      hasSettings
      onSettingsPress={() => setIsCollapsed(prevState => !prevState)}
      ref={baseViewRef}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={
          cameraMode === 'back'
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }
        flashMode={
          flashMode
            ? Platform.OS === 'android' ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.on
            : RNCamera.Constants.FlashMode.off
        }
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        defaultVideoQuality={RNCamera.Constants.VideoQuality['480p']}>
        <View
          style={[
            styles.parent,
            {backgroundColor: isCameraBlur ? '#000000F2' : 'transparent'},
          ]}>
          <CameraFontsView
            isCollapsed={isCollapsed}
            onCross={() => _onCollapsed()}
            onFontSizeDecrease={() => _onFontSizeDecrease()}
            fontSize={fontSize}
            onFontSizeIncrease={() => _onFontSizeIncrease()}
            onFontSpeedDecrease={() => _onFontSpeedDecrease()}
            fontSpeed={fontSpeed}
            onFontSpeedIncrease={() => _onFontSpeedIncrease()}
          />
          {/* <IconView
            iconName={flashMode ? 'flash-on' : 'flash-off'}
            iconType={'material'}
            style={styles.flashIcon}
            onPress={() => _onFlashMode()}
            iconColor={'#fff'}
          /> */}
          <IconView
            iconName={'flip-camera-ios'}
            iconType={'material'}
            style={styles.flashIcon}
            onPress={() => _onCameraMode()}
            iconColor={'#fff'}
          />
          <View style={styles.bottomView}>
            {isRecording && scriptDetail !== null && (
              <IconView
                iconName={showMarquee ? 'ios-eye-sharp' : 'ios-eye-off-sharp'}
                iconType={'ionicon'}
                style={[styles.flashIcon, {alignSelf: 'flex-end'}]}
                onPress={() => _onMarqueeMode()}
                iconColor={'#fff'}
              />
            )}
            {isRecording && showMarquee && scriptDetail !== null && (
              <MarqueeView
                style={styles.marqueeView}
                // ref={marqueeViewRef}
                loop={-1}
                direction={'btt'}
                autoPlay={isRecording}
                speed={fontSpeed}
                onEnd={() => {}}>
                <Text style={[styles.marqueeText, {fontSize: fontSize}]}>
                  {scriptDetail.script}
                </Text>
              </MarqueeView>
            )}

            {isRecording && (
              <CountDown
                until={120}
                size={IS_TABLET ? 28 : 14}
                // onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#FFF'}}
                digitTxtStyle={{color: colors.primary}}
                timeToShow={['M', 'S']}
                timeLabels={{m: 'MM', s: 'SS'}}
                timeLabelStyle={{
                  color: colors.primary,
                  fontFamily: fonts.notoSans800,
                }}
                onFinish={() => {
                  _stopRecordVideo();
                  setIsRecording(false);
                }}
              />
            )}
            {/* <View style={styles.row}>
                            <IconView 
                                iconName='list'
                                iconType='entypo'
                                style={styles.icon1}
                                onPress={() => this._onCollapsed()}
                            /> */}
            <IconView
              iconName={isRecording ? 'controller-record' : 'controller-play'}
              iconType="entypo"
              style={styles.iconRecord}
              iconColor={isRecording ? 'red' : '#000'}
              onPress={() => _onRecord()}
            />
          </View>
        </View>
      </RNCamera>
      {recordedVideoData !== null && (
        <View style={styles.row}>
          <ButtonView
            title={'Preview'}
            containerStyle={{width: 144}}
            size="medium"
            onPress={() => _onPreviewVideo()}
            disabled={recordedVideoData === null}
          />
          <ButtonView
            title={'Save & Continue'}
            containerStyle={{width: 144}}
            size="medium"
            onPress={() => _onSaveResumePress()}
          />
        </View>
      )}
      <AddResumeName ref={addResumeRef} onSave={_onSaveResume} />
    </BaseView>
  );
};

export default RecordVideoResume;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor:'#ffffff80'
  },
  preview: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    marginBottom: 16,
    // marginVertical:16
  },
  iconView: {
    backgroundColor: '#ffffff',
    margin: IS_TABLET ? 16 : 4,
  },
  icon1: {
    height: IS_TABLET ? 96 : 48,
    width: IS_TABLET ? 96 : 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: IS_TABLET ? 48 : 24,
  },
  iconRecord: {
    height: IS_TABLET ? 96 : 48,
    width: IS_TABLET ? 144 : 72,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: IS_TABLET ? 48 : 24,
    alignSelf: 'center',
  },

  bottomView: {
    position: 'absolute',
    bottom: 32,
    right: 0,
    left: 0,
  },
  flashIcon: {
    backgroundColor: '#00000000',
    alignSelf: 'flex-start',
    height: 64,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marqueeView: {
    height: SCREEN_HEIGHT / 2 - 64,
    width: '100%',
    backgroundColor: '#ffffff80',
    marginBottom: 8,
  },
  marqueeText: {
    paddingHorizontal: 16,
    fontFamily: fonts.notoSansBold,
  },
  bottom: {
    paddingVertical: 16,
  },
});

const IconView = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.iconView, props.style]}>
        <Icon
          name={props.iconName}
          type={props.iconType}
          size={props.iconSize ? props.iconSize : IS_TABLET ? 48 : 28}
          color={props.iconColor}
        />
      </View>
    </TouchableOpacity>
  );
};
