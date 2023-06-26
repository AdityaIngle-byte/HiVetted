import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useRef} from 'react';
import BaseView from '../../../../hoc/BaseView';
import UsersView from '../items/UsersView';
import {images, instructions} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import {useSelector} from 'react-redux';
import {MCQ, ONE_WAY, TWO_WAY} from '../../../../../values/strings';
import {commonStyles} from './commonStyles';
import ButtonView from '../../../../components/ButtonView';
import {IS_TABLET} from '../../../../../values/dimens';
import moment from 'moment';

const AboutQuestions = props => {
  const baseViewRef = useRef(null);
debugger;
  const userPrefs = useSelector(state => state.login.userPrefs);
  const {questionsList}=props;
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

    return () => {};
  }, []);

  const _init = () => {};

  return (
    <BaseView ref={baseViewRef}>
      <ScrollView
        style={styles.parent}
        contentContainerStyle={{paddingBottom: 48}}>
        <Text style={commonStyles.heading}>What you can expect?</Text>
        <View style={[commonStyles.bar,{marginBottom: 0}]} />
        {userPrefs.testAssign !== undefined && (
          <Fragment>
            {/* <Text style={commonStyles.heading}>
              Welcome to High5Hire assessment for the job title
              <Text> "{userPrefs.testAssign.role}".</Text>
            </Text> */}
            {/* <Text style={[commonStyles.heading]}>
              Welcome to the next step of assessment for
              <Text style={{color:colors.accent}}> "{userPrefs.testAssign.role}".</Text>
            </Text> */}
            <View style={styles.row}>
              {/* <View style={styles.divider} /> */}
              <Item
                title={'Total Questions'}
                value={questionsList.length}
                style={{marginRight: 8}}
              />
              <Item
                title={'Type'}
                value={userPrefs.testAssign.testCategory=='OneWay'?'Video':userPrefs.testAssign.testCategory}
                style={{marginLeft: 8}}
              />
            </View>
            <View style={styles.row}>
              {/* <View style={styles.divider} /> */}
              <Item
                title={'Invited Date'}
                value={moment(userPrefs.createdAt).format('MM-DD-YYYY')}
                style={{marginRight: 8}}
              />
              <Item
                title={'Expiry Date'}
                value={moment(userPrefs.createdAt)
                  .add(parseInt(userPrefs.expiryDays), 'days')
                  .format('MM-DD-YYYY')}
                style={{marginLeft: 8}}
              />
            </View>
            {userPrefs.testAssign.testCategory === 'MCQ' && (
              <Item
                title={'Duration'}
                value={`${userPrefs.testAssign.details.duration} min`}
                style={{margin: 16}}
              />
            )}
            {/* <Text style={commonStyles.description}>
              We understand the importance of this process, so we have created a
              quick, convenient experience designed to help you introduce
              yourself and your skill set to us here at High5Hire.
            </Text> */}
            {/* <Image
              source={instructions.image1}
              style={commonStyles.image}
              resizeMode="contain"
            /> */}
          </Fragment>
        )}
      </ScrollView>
      <ButtonView
        title={'Continue'}
        containerStyle={{margin: 16}}
        onPress={props.onContinue}
      />
    </BaseView>
  );
};

export default AboutQuestions;

const styles = StyleSheet.create({
  parent: {
    paddingTop: 16
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor:colors.primary,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop:16
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
});

const Item = props => {
  return (
    <View style={[styles.itemView, props.style]}>
      <Text style={styles.itemTitle}>{props.title}</Text>
      <Text style={styles.itemValue}>{props.value}</Text>
    </View>
  );
};
