import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Fragment, useEffect, useRef } from 'react';
import BaseView from '../../../../hoc/BaseView';
import UsersView from '../items/UsersView';
import { images, instructions } from '../../../../../assets/images';
import { colors } from '../../../../../values/colors';
import { fonts } from '../../../../../values/fonts';
import { useSelector } from 'react-redux';
import { MCQ, ONE_WAY, TWO_WAY } from '../../../../../values/strings';
import { commonStyles } from './commonStyles';
import ButtonView from '../../../../components/ButtonView';
import { IS_TABLET } from '../../../../../values/dimens';
import moment from 'moment';

const WelcomeView = props => {
  const baseViewRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);
  // const interviewType = useSelector(state => state.home.interviewType);

  // let type = '';
  // if (interviewType !== null) {
  //   if (interviewType === MCQ) {
  //     type = 'MCQ Interview';
  //   } else if (interviewType === ONE_WAY) {
  //     type = '1-Way Interview';
  //   } else if (interviewType === TWO_WAY) {
  //     type = '2-Way Interview';
  //   } else {
  //     type = interviewType;
  //   }
  // }

  useEffect(() => {
    _init();

    return () => { };
  }, []);

  const _init = () => { };

  return (
    <BaseView ref={baseViewRef}>
      <ScrollView
        style={styles.parent}
        contentContainerStyle={{ paddingBottom: 48 }}>
        <View style={styles.userView}>
          {/* <Image
            source={images.user}
            style={styles.userImage}
            resizeMode="contain"
          /> */}
          {/* <View style={{flex: 1}}> */}
          <Text style={styles.userName}>Hello, {userPrefs.firstName + ' ' + userPrefs.lastName}!</Text>
          {/* {userPrefs.email !== undefined && (
              <Text style={styles.interview}>{userPrefs.email}</Text>
            )} */}
          {/* </View> */}
          {/* <ButtonView 
            title={'+ CREATE RESUME'}
            size={'small'}
            buttonStyle={{paddingHorizontal: 16}}
            onPress={() => props.navigation.navigate('ResumeHome')}
          /> */}
        </View>

        <View style={commonStyles.bar} />
        {userPrefs.testAssign !== undefined && (
          <Fragment>
            {/* <Text style={commonStyles.heading}>
              Welcome to High5Hire assessment for the job title
              <Text> "{userPrefs.testAssign.role}".</Text>
            </Text> */}
            <Text
              style={[commonStyles.heading, { fontFamily: fonts.notoSans400_2 }]}>
              Welcome to the next step of assessment for
              <Text style={{ fontFamily: fonts.notoSans700 }}>
                {' '}
                {userPrefs.testAssign.testName}.
              </Text>
            </Text>
            <Text style={commonStyles.description}>
              We understand the importance of the process, so we have created
              a convenient experience to help you to take this assessment.
            </Text>
            {/* <Image
              source={instructions.image1}
              style={commonStyles.image}
              resizeMode="contain"
            /> */}
            <Text
              style={[
                commonStyles.description2,
                { marginTop: 48, color: colors.accent },
              ]}>
              Are you here for first time?
            </Text>
            <Text
              style={{
                color: '#888',
                fontFamily: fonts.notoSans600,
                textAlign: 'center',
                fontSize: 12,
              }}>
              You can take a practice session.
            </Text>

            <ButtonView
              title={'Practice Assessment'}
              containerStyle={{ margin: 16 }}
              onPress={props.onPractice}
              outline
            />
            <View style={styles.row2}>
              <View style={styles.bar} />
              <Text style={[commonStyles.description2]}>OR</Text>
              <View style={styles.bar} />
            </View>
            <ButtonView
              title={'Start Assessment'}
              containerStyle={{ marginHorizontal: 16, marginBottom: 16 }}
              onPress={props.onContinue}
            />
          </Fragment>
        )}
      </ScrollView>

      {/* <ButtonView
        title={'Continue'}
        containerStyle={{margin: 16}}
        onPress={props.onContinue}
      /> */}
    </BaseView>
  );
};

export default WelcomeView;

const styles = StyleSheet.create({
  parent: {},
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:colors.primary,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: 16,
  },
  userImage: {
    height: IS_TABLET ? 96 : 56,
    width: IS_TABLET ? 96 : 56,
    // borderRadius:28
  },
  userName: {
    fontSize: IS_TABLET ? 32 : 24,
    // color:'#fff',
    color: colors.primary,
    fontFamily: fonts.notoSans700,
    textTransform: 'capitalize',
    // paddingLeft: 8,
  },
  interview: {
    fontSize: 12,
    color: colors.defaultTextColor,
    fontFamily: fonts.notoSans600,
    // textTransform: 'uppercase',
  },
  view: {
    backgroundColor: colors.accent,
    // flexWrap:'wrap',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  itemView: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    color: '#888',
  },
  itemValue: {
    fontSize: 14,
    fontFamily: fonts.notoSans700,
    color: colors.defaultTextColor,
  },
  row: {
    marginHorizontal: 16,
    // backgroundColor: '#f5f5f5',
    marginTop: 16,
    borderRadius: 8,
    flexDirection: 'row',
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 24,
  },
  bar: {
    width: '25%',
    height: 1,
    backgroundColor: colors.primary,
  },
});

const Item = props => {
  return (
    <View style={[styles.itemView, props.style]}>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text style={styles.itemValue}>{props.value}</Text>
    </View>
  );
};
