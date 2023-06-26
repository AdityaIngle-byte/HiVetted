import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
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

const RecordingTips = props => {
  const baseViewRef = useRef(null);

  useEffect(() => {
    _init();

    return () => {};
  }, []);

  const _init = () => {};

  return (
    <BaseView ref={baseViewRef}>
      <ScrollView
        style={{flex: 1, paddingTop: 16}}
        contentContainerStyle={{paddingBottom: 48}}>
        <Text style={commonStyles.heading}>Recording Tips</Text>
        <View style={commonStyles.bar} />
        <Text style={commonStyles.description}>
          If you are distracted by seeing yourself, tap the camera icon to hide
          your video. Your camera will continue to record video while in this
          mode.{'\n'}
          {'\n'}
          Take your interview in a quiet, distraction free area with good
          lighting. Make sure the light is in front of your face and not behind
          you.
        </Text>
        <Image source={instructions.recordingTip} style={commonStyles.image} />
      </ScrollView>
      <ButtonView
        title={'Continue'}
        containerStyle={{margin: 16}}
        onPress={props.onContinue}
      />
    </BaseView>
  );
};

export default RecordingTips;

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
});
