import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {Icon, Overlay} from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import HeaderModal from '../components/HeaderModal';
import MyStatusBar from '../components/MyStatusBar';
import MCQItem from './items/MCQItem';
import Video from 'react-native-video';
import BaseView from '../hoc/BaseView';
import {fonts} from '../../values/fonts';
import {colors} from '../../values/colors';
import {IS_TABLET} from '../../values/dimens';

const PreviewVideoModal = props => {
  const {isVisible, onClose, videoUrl} = props;

  const baseViewRef = useRef(null);
  const videoPlayerRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  console.log('[PreviewVideoModal.js] init : ', videoUrl);

  const _onUpload = () => {
    setIsPaused(true);
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      setTimeout(() => {
        baseViewRef.current.hideLoader();
        props.onUpload();
        onClose();
      }, 1000);
    }
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      // onBackdropPress={onClose}
      style={{width: '100%', height: '75%', padding: 0, margin: 0}}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}>
      <BaseView ref={baseViewRef}>
        <View style={styles.parent}>
          <MyStatusBar statusBarColor={'#fff'} />
          <HeaderModal title={'Preview'} onBackPress={onClose} />

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
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity style={styles.view} onPress={props.onReset}>
                  <Icon
                    name="restart"
                    type="material-community"
                    size={IS_TABLET ? 172 : 96}
                    color={colors.accent}
                  />
                  <Text style={styles.text}>Reset</Text>
                </TouchableOpacity>
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
              </View>
            </View>
          )}
        </View>
      </BaseView>
    </ReactNativeModal>
  );
};

export default PreviewVideoModal;

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
