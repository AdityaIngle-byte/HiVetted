/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import {MenuItem} from './items/MenuItem';
import {IS_TABLET} from '../../../../values/dimens';
import ButtonView from '../../../components/ButtonView';
import {colors} from '../../../../values/colors';
import {fonts} from '../../../../values/fonts';
// import { needsOffscreenAlphaCompositing } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
// import { AsYouType } from 'libphonenumber-js';

const ResumeHome = props => {
  const baseViewRef = useRef(null);

  const [selectedView, setSelectedView] = useState(0);

  const _onBack = () => props.navigation.goBack();

  const _onUpdate = index => setSelectedView(index);

  const _onNext = () => {
    if (selectedView === 1) {
      props.navigation.navigate('High5Resume');
    } else if (selectedView === 2) {
      props.navigation.navigate('VideoResumeInstructions');
    }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => _onBack()}
      title={'Create Resume'}>
      <View style={styles.parent}>
        {/* <Text style={styles.resumeText}>New Resume</Text> */}
        <MenuItem
          hasIcon
          iconName="plus"
          iconType="feather"
          title="Create using High5 Templates"
          selected={selectedView === 1}
          onPress={() => _onUpdate(1)}
          // titleStyle={styles.menuItemTitle}
          // parentStyle={styles.menuItemParent}
        />
        <MenuItem
          hasIcon
          iconName="video"
          iconType="feather"
          title="Create a Video Resume"
          selected={selectedView === 2}
          onPress={() => _onUpdate(2)}
          // titleStyle={styles.menuItemTitle}
          // parentStyle={styles.menuItemParent}
        />
        {/* <MenuItem
          hasIcon
          iconName="upload"
          iconType="feather"
          title="Upload Resume"
          selected={selectedView === 3}
          onPress={() => _onUpdate(3)}
          titleStyle={styles.menuItemTitle}
          parentStyle={styles.menuItemParent}
        /> */}

        <ButtonView
          title={'Next'}
          disabled={selectedView === 0}
          onPress={() => _onNext()}
          containerStyle={{marginTop: IS_TABLET ? 48 : 24}}
          buttonStyle={{
            backgroundColor: colors.accent,
            borderColor: colors.accent,
          }}
        />
      </View>
    </BaseView>
  );
};

export default ResumeHome;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: IS_TABLET ? 32 : 16,
  },
  resumeText: {
    fontFamily: fonts.notoSansRegular,
    color: '#1B1B1B',
    fontSize: IS_TABLET ? 24 : 12,
  },
});



