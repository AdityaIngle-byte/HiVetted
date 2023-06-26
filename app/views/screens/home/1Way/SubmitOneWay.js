import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import {fonts} from '../../../../values/fonts';
import {colors} from '../../../../values/colors';
import RatingQuestion from '../../../items/RatingQuestion';
import ButtonView from '../../../components/ButtonView';
import { IS_TABLET } from '../../../../values/dimens';

const SubmitOneWay = props => {
  const baseViewRef = useRef(null);

  // const [list, setList] = useState([])
  const [data, setData] = useState(null);

  useEffect(() => {
    init();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setData]);

  const init = () => {
    const {list} = props.route.params;

    const attemptedQuestions = list.filter(it => it.answerUri !== null);
    console.log('[SubmitOneWay.js] init :', list, attemptedQuestions);
    const _data = {
      attemptedQuestions: attemptedQuestions.length,
      totalQuestions: list.length,
    };

    setData(_data);
  };

  const _onSubmit = () => {
    console.log('[SubmitMCQ.js] On Submit : ', props);
    props.navigation.replace('Splash');
  };

  // const _onBack = () => props.navigation.replace()

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      // hasBack
      // onBackPress={() => _onBack()}
      title={'Submit Assessment'}>
      {data !== null && (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={styles.parent}>
              <Text style={styles.thankyou}>Thank you!</Text>
              <Text
                style={[
                  styles.thankyou,
                  {
                    fontSize: IS_TABLET ? 24 : 16,
                    paddingTop: 0,
                    // paddingBottom: 24,
                  },
                ]}>
                We are reviewing you assessment.
              </Text>

              {/* <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: 24,
                }}>
                <Item
                  title={'Total'}
                  value={data.totalQuestions}
                  style={{backgroundColor: colors.primary, marginRight: 12}}
                />
                <Item
                  title={'Attempted'}
                  value={data.attemptedQuestions}
                  style={{backgroundColor: colors.success, marginLeft: 12}}
                />
              </View> */}

              <TouchableOpacity
                style={{padding:8}}
                onPress={() => props.navigation.navigate('ResumeHome')}
              >
                <Text style={styles.text}>Create High5 Resume?</Text>
                <View style={{height:2,backgroundColor:colors.accent,width:144,alignSelf:'center'}}/>
              </TouchableOpacity>

              <RatingQuestion
                question={'1. How much rating would you like to give this app?'}
              />

              <RatingQuestion
                question={'2. Were the questions easy to understand?'}
              />

              <RatingQuestion
                question={
                  '3. Was the time alloted to complete the test is sufficient?'
                }
              />
            </View>
          </ScrollView>
          <ButtonView
            title={'Submit & Close'}
            containerStyle={{margin: 24}}
            buttonStyle={{
              backgroundColor: colors.accent,
              borderColor: colors.accent,
            }}
            onPress={() => _onSubmit()}
          />
        </View>
      )}
    </BaseView>
  );
};

export default SubmitOneWay;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  thankyou: {
    fontSize: IS_TABLET ? 64 : 32,
    fontFamily: fonts.notoSans700,
    color: colors.primary,
    alignSelf: 'center',
    paddingTop: 24,
  },
  itemView: {
    flex: 1,
    height: IS_TABLET ? 144 : 96,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  itemTitle: {
    color: '#fff',
    fontFamily: fonts.notoSans600,
    fontSize: IS_TABLET ? 20 : 14,
  },
  itemValue: {
    color: '#fff',
    fontFamily: fonts.notoSans800,
    fontSize: IS_TABLET ? 40 : 28,
  },
  text: {
    color: colors.accent,
    fontFamily: fonts.notoSans600,
    fontSize: IS_TABLET ? 40 : 14,
    textAlign:'center',
    // padding:8,
    // borderBottomWidth:1
  },
});

const Item = props => {
  return (
    <View style={[styles.itemView, props.style]}>
      <Text style={styles.itemValue}>{props.value}</Text>
      <Text style={styles.itemTitle}>{props.title}</Text>
    </View>
  );
};
