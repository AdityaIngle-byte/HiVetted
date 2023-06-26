import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import {fonts} from '../../../../values/fonts';
import {colors} from '../../../../values/colors';
import RatingQuestion from '../../../items/RatingQuestion';
import ButtonView from '../../../components/ButtonView';
import {IS_TABLET} from '../../../../values/dimens';
import {MenuItem} from '../resume/items/MenuItem';

const SubmitMCQ = props => {
  const baseViewRef = useRef(null);
  const {testRejected}=props.route.params;

  const _onSubmit = () => {
    console.log('[SubmitMCQ.js] On Submit : ', props);
    props.navigation.replace('Splash');
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      title={'Submit Assessment'}>
      <View style={{flex: 1}}>
        <ScrollView style={styles.parent}>
          <Text style={styles.thankyou}>Thank you!</Text>
          <Text style={[styles.description]}>
            {testRejected?'Your assessment got automatically submitted as the system detected change of focus due to toggling between screens':'High5Hire has received your submission.'} There is no further action
            needed from you.{'\n'}
            {'\n'}You'll be contacted after your submission has been reviewed.
          </Text>
          <Text style={[styles.moreText]}>
            We have some more features for you, you might be interested
          </Text>
          <MenuItem
            hasIcon
            iconName="plus"
            iconType="feather"
            title="Create High5 Resume"
            onPress={() => props.navigation.navigate('High5Resume')}
          />
          <View style={styles.row2}>
            <View style={styles.bar} />
            <Text style={[styles.description, {marginTop: 0}]}>OR</Text>
            <View style={styles.bar} />
          </View>
          <MenuItem
            hasIcon
            iconName="video"
            iconType="feather"
            title="Create a Video Resume"
            // selected={selectedView === 2}
            onPress={() => props.navigation.navigate('VideoResumeInstructions')}
            // style={styles.menuItemTitle}
            // parentStyle={styles.menuItemParent}
          />
        </ScrollView>
        <ButtonView
          title={'Close'}
          containerStyle={{margin: 24}}
          buttonStyle={{
            backgroundColor: colors.accent,
            borderColor: colors.accent,
          }}
          onPress={() => _onSubmit()}
        />
      </View>
    </BaseView>
  );
};

export default SubmitMCQ;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  thankyou: {
    fontSize: IS_TABLET ? 64 : 32,
    fontFamily: fonts.notoSans700,
    color: colors.primary,
    alignSelf: 'center',
    paddingTop: 24,
  },
  moreText: {
    fontSize: IS_TABLET ? 32 : 16,
    fontFamily: fonts.notoSans600,
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 72,
    marginBottom: 16,
  },
  description: {
    // color: '#fff',
    fontFamily: fonts.notoSans400_2,
    fontSize: IS_TABLET ? 20 : 12,
    textAlign: 'center',
    marginTop: 16,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 40,
    marginTop: 24,
  },
  bar: {
    width: '25%',
    height: 1,
    backgroundColor: colors.primary,
    marginHorizontal: 16,
  },
});