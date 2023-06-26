import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BaseView from '../../../../hoc/BaseView';
import Video from 'react-native-video';
import {images} from '../../../../../assets/images';

const VideoPreview = props => {
  const baseViewRef = useRef(null);
  const videoPlayerRef = useRef(null);

  const [videoUri, setVideoUri] = useState(null);

  useEffect(() => {
    init();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setVideoUri]);

  const init = () => {
    const {videoData} = props.route.params;
    if (videoData !== undefined) {
      setVideoUri(videoData);
    }
  };

  return (
    <BaseView
      hasStatusBar
      ref={baseViewRef}
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Preview"
      navigation={props.navigation}>
      <View style={styles.parent}>
        {videoUri !== null && (
          <Video
            source={{uri: videoUri}}
            ref={videoPlayerRef}
            // onBuffer={this.onBuffer}
            // onError={this.videoError}
            onLoadStart={() => {
              if (baseViewRef !== null) {
                baseViewRef.current.showLoader();
              }
            }}
            onLoad={() => {
              if (baseViewRef !== null) {
                baseViewRef.current.hideLoader();
              }
            }}
            style={styles.videoView}
            controls={true}
            selectedTextTrack={{
              type: 'title',
              value: 'High 5 Hire',
            }}
            poster={
              'https://uat.high5hire.com/static/media/twsx-logo.5ef82137.svg'
            }
            posterResizeMode={'contain'}
          />
        )}
        <Image
          source={images.high5Logo}
          style={styles.stampImage}
          resizeMode={'contain'}
        />
      </View>
    </BaseView>
  );
};

export default VideoPreview;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  videoView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  stampImage: {
    height: 64,
    width: 120,
    position: 'absolute',
    bottom: 72,
    right: 16,
  },
});
