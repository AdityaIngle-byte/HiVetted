import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../../hoc/BaseView';
import UsersView from '../items/UsersView';
import {images, instructions} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import {useSelector} from 'react-redux';
import {MCQ, ONE_WAY, TWO_WAY} from '../../../../../values/strings';
import {commonStyles} from './commonStyles';
import ButtonView from '../../../../components/ButtonView';
import {Icon} from 'react-native-elements';
import {
  checkAndRequestCameraPermission,
  checkAndRequestMicrophonePermission,
} from '../../../../../utils/PermissionsCheck';
import {IS_TABLET} from '../../../../../values/dimens';

const CheckCameraAndMicrophone = props => {
  const baseViewRef = useRef(null);

  const [isMicrophonePermissionsProvided, setIsMicrophonePermissionsProvided] =
    useState(false);
  const [isCameraPermissionsProvided, setIsCameraPermissionsProvided] =
    useState(false);

  useEffect(() => {
    // _init()
    _cameraPermissions();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const _init = () => {
  //     _cameraPermissions()
  // }

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

  return (
    <BaseView ref={baseViewRef}>
      <ScrollView
        style={{flex: 1, paddingTop: 16}}
        contentContainerStyle={{paddingBottom: 48}}>
        <Text style={commonStyles.heading}>Camera & Mic Access</Text>
        <View style={commonStyles.bar} />
        

        <Text style={commonStyles.description}>
          This app requires permission to access both your camera and microphone
          in order to record your responses.{'\n'}
          {'\n'}
          Please allow access on the following screens in order to continue on
          this device.
        </Text>

        <View>
          <Text style={commonStyles.description}>Required Permissions</Text>
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
        {/* <Image
          source={instructions.cameraAndMic}
          style={commonStyles.image}
          resizeMode="contain"
        /> */}
      </ScrollView>
      <ButtonView
        title={'Continue'}
        containerStyle={{margin: 16}}
        onPress={props.onContinue}
        disabled={
          !isCameraPermissionsProvided || !isMicrophonePermissionsProvided
        }
      />
    </BaseView>
  );
};

export default CheckCameraAndMicrophone;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.notoSans400_2,
    marginLeft: 12,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: IS_TABLET ? 18 : 12,
    paddingHorizontal: IS_TABLET ? 32 : 12,
  },
  itemValue: {
    fontSize: IS_TABLET ? 18 : 14,
    fontFamily: fonts.notoSans600,
    color: colors.defaultTextColor,
  },
});

const PermissionsItem = props => {
  const {success, fail, hasPermission, onPress} = props;

  return (
    <View>
      {hasPermission ? (
        <View style={[styles.itemView, {justifyContent: 'flex-start'}]}>
          <Icon
            name="check"
            type={'entypo'}
            color={colors.success}
            containerStyle={{marginRight: 8}}
          />
          <Text style={[styles.itemValue, {color: colors.success}]}>
            {success}
          </Text>
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          <View style={[styles.itemView, {justifyContent: 'flex-start'}]}>
            <Icon
              name="alert-circle"
              type={'feather'}
              color={colors.alert}
              containerStyle={{marginRight: 8}}
            />
            <Text style={[styles.itemValue, {color: colors.alert, flex: 1}]}>
              {fail}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};
