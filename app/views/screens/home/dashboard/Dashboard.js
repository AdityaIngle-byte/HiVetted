import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import BaseView from '../../../hoc/BaseView';
import UsersView from './items/UsersView';
import { fonts } from '../../../../values/fonts';
import { colors } from '../../../../values/colors';
import WelcomeView from './items/WelcomeView';
import CheckView from '../../../components/CheckView';
import ButtonView from '../../../components/ButtonView';
import { showAlert, showConfirmAlert } from '../../../../utils/Message';
import { useSelector } from 'react-redux';
import { INTERVIEWER, MCQ, ONE_WAY, TWO_WAY } from '../../../../values/strings';
import {
  checkAndRequestCameraPermission,
  checkAndRequestMicrophonePermission,
  checkCameraAndMicrophonePermissions,
} from '../../../../utils/PermissionsCheck';
import { Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';

const Dashboard = props => {
  const baseViewRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);
  const interviewType = useSelector(state => state.home.interviewType);

  const [isSameUser, setIsSameUser] = useState(true);
  const [isAllInstructionsAccepted, setIsAllInstructionsAccepted] =
    useState(true);

  const [isMicrophonePermissionsProvided, setIsMicrophonePermissionsProvided] =
    useState(false);
  const [isCameraPermissionsProvided, setIsCameraPermissionsProvided] =
    useState(false);

  const [resumeUri, setResumeUri] = useState(null);
  const [idUri, setIdUri] = useState(null);

  useEffect(() => {
    _init();

    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _init = () => {
    if (
      interviewType === ONE_WAY ||
      interviewType === TWO_WAY ||
      interviewType === INTERVIEWER
    ) {
      _cameraPermissions();
    }
  };

  const _cameraPermissions = () => {
    checkAndRequestCameraPermission()
      .then(response => {
        setIsCameraPermissionsProvided(true);
        _microphonePermissions();
      })
      .catch(error => {
        setIsCameraPermissionsProvided(false);
      });
  };

  const _microphonePermissions = () => {
    checkAndRequestMicrophonePermission()
      .then(response => {
        setIsMicrophonePermissionsProvided(true);
      })
      .catch(error => {
        setIsMicrophonePermissionsProvided(false);
      });
  };

  // MCQ Methods-----------------------------------------------------------------------------------
  const _onPracticeMCQ = () => {
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      setTimeout(() => {
        baseViewRef.current.hideLoader();
        props.navigation.navigate('PracticeMCQ');
      }, 1000);
    }
  };

  const _onRejectMCQ = () => {
    showConfirmAlert(
      'Reject',
      "Once Rejected, You won't be able to take the test again. Are you sure you want to reject?",
      () => { },
    );
  };

  const _onAcceptMCQ = () => {
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      setTimeout(() => {
        baseViewRef.current.hideLoader();
        props.navigation.navigate('Modules');
      }, 2000);
    }
  };

  // ONE WAY Methods-----------------------------------------------------------------------------------
  const _onAcceptOneWay = () => { };

  const _onRejectOneWay = () => { };

  const _onPracticeOneWay = () => {
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      setTimeout(() => {
        baseViewRef.current.hideLoader();
        props.navigation.navigate('OneWay');
      }, 1000);
    }
  };

  //TWO way----------------------------------------------------------------------------------------------------
  const _onStartInterview = () => {
    props.navigation.navigate('SubmitTwoWay', {
      comments: ['Leadership', 'Analytical', 'Weak in Communication'],
    });
    // props.navigation.navigate('TwoWay')
  };

  // on upload document-------------------------
  const _onUploadResume = () => {
    DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
    })
      .then(response => {
        console.log('[Dashboard.js] Document: ', response);
        if (response.length > 0) {
          setResumeUri(response[0]);
        }
      })
      .catch(error => {
        console.log('[Dashboard.js] Document Error: ', error);
      });
  };

  const _onUploadID = () => {
    DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.allFiles],
    })
      .then(response => {
        console.log('[Dashboard.js] Document: ', response);
        if (response.length > 0) {
          setIdUri(response[0]);
        }
      })
      .catch(error => {
        console.log('[Dashboard.js] Document Error: ', error);
      });
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      title={'Home'}
      headerParentStyle={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}>
      <ScrollView
        style={styles.parent}
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}>
        <WelcomeView />
        {/* <UsersView /> */}

        <Text style={styles.heading}>Date/Time</Text>
        <View style={styles.view}>
          <Item title={'Date'} value={'2020-03-25'} />
          <View style={styles.divider} />
          <Item title={'Time'} value={'10:00 AM'} />
          <View style={styles.divider} />
          <Item title={'Duration'} value={'45 min'} />
        </View>

        <Text style={styles.heading}>Instructions</Text>
        <View style={styles.view}>
          <Item
            title={"Don't eat or drink during the interview."}
          // value={'Mobile App Developer'}
          />
          <View style={styles.divider} />
          <Item
            title={'Put Your phone on silent mode.'}
          // value={jobDescription}
          />
          <View style={styles.divider} />
          <Item
            title={'Check your internet connection.'}
          // value={requiredSkills}
          />
          <View style={styles.divider} />
          <Item
            title={"Don't close the app."}
          // value={requiredSkills}
          />
        </View>

        {/* <Text style={styles.heading}>Job Details</Text>
           <View style={styles.view}>
                <Item2 
                    title={'Title'}
                    value={'Mobile App Developer'}
                />
                <View style={styles.divider}/>
                <Item2 
                    title={'Description'}
                    value={jobDescription}
                />
                <View style={styles.divider}/>
                <Item2 
                    title={'Required Skills'}
                    value={requiredSkills}
                />
           </View> */}

        {(interviewType === MCQ ||
          interviewType === ONE_WAY ||
          interviewType === TWO_WAY) && (
            <View>
              <Text style={styles.heading}>Required Documents</Text>
              <View style={styles.view}>
                <Item3
                  title={'Resume'}
                  onPress={() => _onUploadResume()}
                  file={resumeUri !== null ? resumeUri.name : null}
                  onRemove={() => setResumeUri(null)}
                />
                <View style={styles.divider} />
                <Item3
                  title={'Identity Proof'}
                  onPress={() => _onUploadID()}
                  file={idUri !== null ? idUri.name : null}
                  onRemove={() => setIdUri(null)}
                />
              </View>
            </View>
          )}

        {(interviewType === ONE_WAY ||
          interviewType === TWO_WAY ||
          interviewType === INTERVIEWER) && (
            <View>
              <Text style={styles.heading}>Required Permissions</Text>
              <View style={styles.view}>
                <PermissionsItem
                  success={'Camera Permissions Provided'}
                  fail={'Check Camera Permissions, not Provided Yet'}
                  hasPermission={isCameraPermissionsProvided}
                  onPress={() => _cameraPermissions()}
                />
                <View style={styles.divider} />
                <PermissionsItem
                  success={'Microphone Permissions Provided'}
                  fail={'Check Microphone Permissions, not Provided Yet'}
                  hasPermission={isMicrophonePermissionsProvided}
                  onPress={() => _microphonePermissions()}
                />
              </View>
            </View>
          )}

        {/* <View style={{paddingBottom:12}}> */}
        <CheckView
          title={'I Accept above given image and name is mine.'}
          checked={isSameUser}
          onPress={() => setIsSameUser(prevState => !prevState)}
        />
        <CheckView
          title={'I Accept above given all instructions.'}
          checked={isAllInstructionsAccepted}
          onPress={() => setIsAllInstructionsAccepted(prevState => !prevState)}
        />
        {interviewType === MCQ && (
          <View>
            <View style={[styles.itemView, { justifyContent: 'space-around' }]}>
              <ButtonView
                title={'Reject'}
                size={'medium'}
                buttonStyle={{
                  paddingHorizontal: 16,
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                }}
                containerStyle={{ flex: 1, marginRight: 8 }}
                onPress={() => _onRejectMCQ()}
              />
              <ButtonView
                title={'Accept'}
                size={'medium'}
                buttonStyle={{ paddingHorizontal: 16 }}
                containerStyle={{ flex: 1, marginLeft: 8 }}
                disabled={!isSameUser || !isAllInstructionsAccepted}
                onPress={() => _onAcceptMCQ()}
              />
            </View>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => _onPracticeMCQ()}>
              <Text
                style={{ fontFamily: fonts.notoSans700, color: colors.darkBlue }}>
                Practice Test
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {interviewType === ONE_WAY && (
          <View>
            <View style={[styles.itemView, { justifyContent: 'space-around' }]}>
              <ButtonView
                title={'Reject'}
                size={'medium'}
                buttonStyle={{
                  paddingHorizontal: 16,
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                }}
                containerStyle={{ flex: 1, marginRight: 8 }}
                onPress={() => _onRejectOneWay()}
              />
              <ButtonView
                title={'Accept'}
                size={'medium'}
                buttonStyle={{ paddingHorizontal: 16 }}
                containerStyle={{ flex: 1, marginLeft: 8 }}
                disabled={
                  !isSameUser ||
                  !isAllInstructionsAccepted ||
                  !isCameraPermissionsProvided ||
                  !isMicrophonePermissionsProvided
                }
                onPress={() => _onAcceptOneWay()}
              />
            </View>
            <TouchableOpacity
              style={{ alignSelf: 'center' }}
              onPress={() => _onPracticeOneWay()}>
              <Text
                style={{ fontFamily: fonts.notoSans700, color: colors.darkBlue }}>
                Practice Test
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {interviewType === TWO_WAY && (
          <ButtonView
            title={'START INTERVIEW'}
            // size={'medium'}
            buttonStyle={{
              paddingHorizontal: 16,
              backgroundColor: colors.accent,
              borderColor: colors.accent,
            }}
            containerStyle={{ marginHorizontal: 16 }}
            onPress={() => _onStartInterview()}
            disabled={
              !isSameUser ||
              !isAllInstructionsAccepted ||
              !isCameraPermissionsProvided ||
              !isMicrophonePermissionsProvided
            }
          />
        )}

        {interviewType === INTERVIEWER && (
          <ButtonView
            title={'START INTERVIEW'}
            // size={'medium'}
            buttonStyle={{
              paddingHorizontal: 16,
              backgroundColor: colors.accent,
              borderColor: colors.accent,
            }}
            containerStyle={{ marginHorizontal: 16 }}
            onPress={() => _onStartInterview()}
            disabled={
              !isSameUser ||
              !isAllInstructionsAccepted ||
              !isCameraPermissionsProvided ||
              !isMicrophonePermissionsProvided
            }
          />
        )}
        {/* </View> */}
      </ScrollView>
    </BaseView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 14,
    fontFamily: fonts.notoSans700,
    color: colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    color: '#888',
  },
  itemValue: {
    fontSize: 14,
    fontFamily: fonts.notoSans600,
    color: colors.defaultTextColor,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderColor,
  },
  view: {
    marginHorizontal: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 8,
    borderRadius: 8,
  },
  file: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    color: colors.darkBlue,
    // paddingHorizontal:16,
    // paddingBottom:12
  },
});

const Item = props => {
  return (
    <View style={styles.itemView}>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text style={styles.itemValue}>{props.value}</Text>
    </View>
  );
};

const Item2 = props => {
  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 12 }}>
      <Text style={[styles.itemTitle, { fontSize: 12 }]}>{props.title}</Text>
      <Text style={styles.itemValue}>{props.value}</Text>
    </View>
  );
};

const Item3 = props => {
  return (
    <View>
      <View style={styles.itemView}>
        <Text style={styles.itemValue}>{props.title}</Text>
        <TouchableOpacity onPress={props.onPress}>
          <Text style={[styles.itemValue, { color: colors.darkBlue }]}>
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      {props.file !== null && (
        <View
          style={[
            styles.itemView,
            { paddingTop: 0, justifyContent: 'flex-start' },
          ]}>
          <Text style={styles.file}>{props.file}</Text>
          <TouchableOpacity onPress={props.onRemove}>
            <Text
              style={[
                styles.file,
                { color: colors.accent, paddingHorizontal: 16 },
              ]}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const PermissionsItem = props => {
  const { success, fail, hasPermission, onPress } = props;

  return (
    <View>
      {hasPermission ? (
        <View style={[styles.itemView, { justifyContent: 'flex-start' }]}>
          <Icon
            name="check"
            type={'entypo'}
            color={colors.success}
            containerStyle={{ marginRight: 8 }}
          />
          <Text style={[styles.itemValue, { color: colors.success }]}>
            {success}
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={[styles.itemView, { justifyContent: 'flex-start' }]}>
            <Icon
              name="alert-circle"
              type={'feather'}
              color={colors.alert}
              containerStyle={{ marginRight: 8 }}
            />
            <Text style={[styles.itemValue, { color: colors.alert, flex: 1 }]}>
              {fail}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const jobDescription = `We are looking for a React Native developer interested in building performant mobile apps on both the iOS and Android platforms. You will be responsible for architecting and building these applications, as well as coordinating with the teams responsible for other layers of the product infrastructure. Building a product is a highly collaborative effort, and as such, a strong team player with a commitment to perfection is required.`;
const requiredSkills = `JavaScript, Android Studio, XCode, etc`;
