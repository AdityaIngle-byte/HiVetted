import React, {useState, useRef, useEffect} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';

import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo,
} from 'react-native-twilio-video-webrtc';
import {useSelector} from 'react-redux';
import {images} from '../../../../assets/images';
import {showConfirmAlert} from '../../../../utils/Message';
import {colors} from '../../../../values/colors';
import {fonts} from '../../../../values/fonts';
import {INTERVIEWER} from '../../../../values/strings';
import BaseView from '../../../hoc/BaseView';
import AddComment from './items/AddComment';
import BottomView from './items/BottomView';
import WaitToStart from './items/WaitToStart';

const CANDIDATE_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEyMDMzYWFmMjRlYjYxNmJjYzEwYjg5NzhhYWVhNjYzLTE2NjA4MzYxOTAiLCJpc3MiOiJTSzEyMDMzYWFmMjRlYjYxNmJjYzEwYjg5NzhhYWVhNjYzIiwic3ViIjoiQUNhYjdkMGVlZDg5N2Q2ZjU1MjQwMmRiN2UyZTY4MDYzMyIsImV4cCI6MTY2MDgzOTc5MCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiU3VubnkiLCJ2aWRlbyI6eyJyb29tIjoiUk9PTV8xIn19fQ.AhZ8kWrG-YlYaxT7LTSDVppb_091sh3lrVHD1SYfOz8';
const INTERVIEWER_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzEyMDMzYWFmMjRlYjYxNmJjYzEwYjg5NzhhYWVhNjYzLTE2NjA4MzYyOTkiLCJpc3MiOiJTSzEyMDMzYWFmMjRlYjYxNmJjYzEwYjg5NzhhYWVhNjYzIiwic3ViIjoiQUNhYjdkMGVlZDg5N2Q2ZjU1MjQwMmRiN2UyZTY4MDYzMyIsImV4cCI6MTY2MDgzOTg5OSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoiQWRpdHlhIiwidmlkZW8iOnsicm9vbSI6IlJPT01fMSJ9fX0.RiR5xhmU6AFIu_BZ7MelFvr-DvZ7pfhGhBUxQ_VcOcU';

const TwoWay = props => {
  const baseViewRef = useRef(null);
  const interviewType = useSelector(state => state.home.interviewType);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isCommentViewVisible, setIsCommentViewVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());

  const _token = Platform.OS === 'ios' ? INTERVIEWER_TOKEN : CANDIDATE_TOKEN;
  const [token, setToken] = useState(_token);
  const twilioVideo = useRef(null);

  useEffect(() => {
    console.log('[TwoWay.js] useEffect : ', twilioVideo.current);

    return () => {};
  }, []);

  const _onConnectButtonPress = async () => {
    if (Platform.OS === 'android') {
      await _requestAudioPermission();
      await _requestCameraPermission();
    }

    twilioVideo.current.connect({
      accessToken: token,
      enableNetworkQualityReporting: true,
    });
    setStatus('connecting');
  };

  const _onEndButtonPress = () => {
    // twilioVideo.current.disconnect();
    // props.navigation.goBack()
    showConfirmAlert(
      'Disconnect',
      'Are you sure you want to disconnect?',
      () => {
        twilioVideo.current.disconnect();
        props.navigation.replace('SubmitTwoWay', {
          comments: comments,
        });
      },
    );
  };

  const _onMuteButtonPress = () => {
    twilioVideo.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onVideoDisable = () => {
    const flag = !isVideoEnabled;
    setIsVideoEnabled(flag);
    twilioVideo.current.setLocalVideoEnabled(flag);
  };

  const _onRoomDidConnect = () => {
    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({error}) => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('ERROR: ', error);

    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          {participantSid: participant.sid, videoTrackSid: track.trackSid},
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracks = new Map(videoTracks);
    videoTracks.delete(track.trackSid);

    setVideoTracks(videoTracks);
  };

  const _onNetworkLevelChanged = ({participant, isLocalUser, quality}) => {
    console.log(
      'Participant',
      participant,
      'isLocalUser',
      isLocalUser,
      'quality',
      quality,
    );
  };

  const _requestAudioPermission = () => {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Need permission to access microphone',
        message:
          'To run this demo we need permission to access your microphone',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  };

  const _requestCameraPermission = () => {
    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Need permission to access camera',
      message: 'To run this demo we need permission to access your camera',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
  };

  const _onBack = () => {
    showConfirmAlert('Cancel Test', 'Are you sure you want to cancel?', () =>
      props.navigation.goBack(),
    );
  };

  const _onSetInterviewerComment = comment => {
    console.log('[TwoWay.js] Interviewer Comment :', comment);
    const list = [comment, ...comments];
    setComments(list);
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => _onBack()}
      title={'TWO WAY INTERVIEW'}>
      {isTestStarted ? (
        <View style={styles.container}>
          {status === 'disconnected' && (
            <View style={{flex: 1, alignItems: 'center', marginTop: 48}}>
              <Text style={styles.oops}>Oops!</Text>
              <Text style={styles.callDisconnectedText}>
                Call Disconnected.
              </Text>
              <BottomView
                isAudioEnabled={isAudioEnabled}
                onMic={_onMuteButtonPress}
                hasCallView
                onCall={_onConnectButtonPress}
                onVideo={_onVideoDisable}
                isVideoEnabled={isVideoEnabled}
              />
            </View>
          )}

          {(status === 'connected' || status === 'connecting') && (
            <View style={styles.callContainer}>
              {status === 'connecting' && (
                <View style={{flex: 1, alignItems: 'center', marginTop: 48}}>
                  <Image
                    source={images.calling}
                    style={{height: 240, width: 240}}
                    resizeMode="contain"
                  />
                </View>
              )}
              {status === 'connected' && (
                <View style={styles.remoteGrid}>
                  {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    );
                  })}

                  {Platform.OS === 'ios' && (
                    <TouchableOpacity
                      onPress={() => setIsCommentViewVisible(true)}
                      style={{
                        position: 'absolute',
                        bottom: 120,
                        left: 24,
                        zIndex: 100,
                      }}
                      activeOpacity={0.7}>
                      <View style={[styles.commentBtn]}>
                        <Icon
                          name={'message-circle'}
                          type={'feather'}
                          color={'#fff'}
                          size={32}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              <TwilioVideoLocalView
                enabled={isVideoEnabled}
                style={styles.localVideo}
              />
              <BottomView
                isAudioEnabled={isAudioEnabled}
                hasEndView
                onMic={_onMuteButtonPress}
                onEnd={_onEndButtonPress}
                onVideo={_onVideoDisable}
                isVideoEnabled={isVideoEnabled}
              />
            </View>
          )}

          <TwilioVideo
            ref={twilioVideo}
            onRoomDidConnect={_onRoomDidConnect}
            onRoomDidDisconnect={_onRoomDidDisconnect}
            onRoomDidFailToConnect={_onRoomDidFailToConnect}
            onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
            onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
            onNetworkQualityLevelsChanged={_onNetworkLevelChanged}
          />
        </View>
      ) : (
        <WaitToStart
          onTimerFinish={() => {
            setIsTestStarted(true);
            _onConnectButtonPress();
          }}
          onCancel={() => _onBack()}
        />
      )}

      <AddComment
        isVisible={isCommentViewVisible}
        onClose={() => setIsCommentViewVisible(false)}
        setComment={_onSetInterviewerComment}
      />
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: 150,
    height: 250,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    // marginTop: 20,
    // marginLeft: 10,
    // marginRight: 10,
    // width: 100,
    // height: 120,
    // flex:1,
    height: '100%',
    width: '100%',
  },
  callDisconnectedText: {
    fontSize: 12,
    color: '#888',
    fontFamily: fonts.notoSans600,
    marginTop: 12,
  },
  oops: {
    fontSize: 48,
    color: colors.accent,
    fontFamily: fonts.notoSans800,
  },
  commentBtn: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.alert,
    borderRadius: 32,
  },
});

export default TwoWay;
