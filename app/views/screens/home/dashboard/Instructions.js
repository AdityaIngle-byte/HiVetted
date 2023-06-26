/* eslint-disable react-native/no-inline-styles */
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import BaseView from '../../../hoc/BaseView';
import WelcomeView from './instructions/WelcomeView';
import PagerView from 'react-native-pager-view';
import AboutQuestions from './instructions/AboutQuestions';
import CheckCameraAndMicrophone from './instructions/CheckCameraAndMicrophone';
import PracticeTest from './instructions/PracticeTest';
import RecordingTips from './instructions/RecordingTips';
import BeginTest from './instructions/BeginTest';
import { MCQ, ONE_WAY, TWO_WAY } from '../../../../values/strings';
import { useSelector } from 'react-redux';
import { showAlert, showConfirmAlert } from '../../../../utils/Message';
import { oneWayJson } from '../../../../json/OneWayJson';
import { startAssessment } from '../../../../redux/actions/homeActions';
import InstructionsView from './instructions/InstructionsView';
import { images } from '../../../../assets/images';
import { fonts } from '../../../../values/fonts';
import { colors } from '../../../../values/colors';
import { Avatar, Icon } from 'react-native-elements';
import { IS_TABLET } from '../../../../values/dimens';
import GeneralAssessment from '../General/GeneralAssessment';
import { generalJSON } from '../../../../json/GeneralQues';
import MyStatusBar from '../../../components/MyStatusBar';

const Instructions = props => {
  const baseViewRef = useRef(null);
  const pagerViewRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);
  const companyInfo =
    userPrefs.companyInfo !== undefined ? userPrefs.companyInfo : null;
  let companyAvatar = '';
  if (companyInfo !== null) {
    // const companyName = 'High5 Hire'
    const splitCompanyName = companyInfo.companyName.split(' ');
    if (splitCompanyName.length === 1) {
      companyAvatar = splitCompanyName[0].substring(0, 2);
    } else if (splitCompanyName.length > 1) {
      companyAvatar = `${splitCompanyName[0].charAt(
        0,
      )}${splitCompanyName[1].charAt(0)}`;
    }

    console.log('[Instructions.js] init => ', splitCompanyName, companyAvatar);
  }
  // const interviewType = useSelector(state => state.home.interviewType);
  const [pagerIndex, setPagerIndex] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  const has1WayQuestions =
    userPrefs.testAssign !== undefined &&
    userPrefs.testAssign.testCategory === 'OneWay';

  const hasGeneralQuestions =
    userPrefs.testAssign !== undefined &&
    userPrefs.testAssign.testCategory === 'General';
  // console.log('[Instructions.js] init => ', has1WayQuestions);

  useEffect(() => {
    _init();
    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setQuestionsList]);




  const _init = () => {
    console.log("General Json in init");
    console.log(generalJSON);
    var slicedList;
    console.log('[Instructions.js] init : ', userPrefs);
    if (questionsList.length < 1) {
      if (!has1WayQuestions) {
        const _list = [];
        userPrefs.testAssign.questions.forEach(it => {
          const newOptions = [];
          it.options.forEach((choice, index) => {
            const item = {
              selected: false,
              option: choice,
            };
            // return item;
            newOptions.push(item);
          });

          if (userPrefs.testAssign.details.oRandom == true) {
            var shuffledOptions = shuffle(newOptions);
            it.options = shuffledOptions;
          } else {
            it.options = newOptions;
          }

          // it.options = newOptions;
          //   // return it;
          _list.push(it);

        });

        let questionRandom = userPrefs.testAssign.details.qRandom;
        let isGeneral = false;
        let questions;

        if (userPrefs.testAssign.testCategory === "General") {
          while (!isGeneral) {
            questions = questionRandom
              ? shuffle(_list)
              : _list;
            let n = userPrefs.testAssign.details.numberOfQtoAppear;
            questions = questions.splice(0, n);
            if (userPrefs.testAssign.testCategory === "General") {
              questions.map((x) => {
                console.log(x.type);
                if (x.type !== "MCQ") {
                  isGeneral = true;
                }
              });
            }
          }
          console.log("My question list from adi");
          console.log(questions);

          setQuestionsList(questions);
        }

        if (userPrefs.testAssign.details.qRandom == true && userPrefs.testAssign.testCategory !== 'General') {
          var shuffledQuestions = shuffle(_list);
          // Number of QtoAppear
          if (userPrefs.testAssign.details.numberOfQtoAppear < 999999999999) {
            var k = userPrefs.testAssign.details.numberOfQtoAppear
            slicedList = shuffledQuestions.slice(0, k);
          } else {
            var k = userPrefs.testAssign.questions.length
            slicedList = shuffledQuestions.slice(0, k);
          }
          // Number of QtoAppear
          setQuestionsList(slicedList);
        } else if (userPrefs.testAssign.details.qRandom == false && userPrefs.testAssign.testCategory !== 'General') {
          // Number of QtoAppear
          if (userPrefs.testAssign.details.numberOfQtoAppear < 999999999999) {
            var k = userPrefs.testAssign.details.numberOfQtoAppear
            slicedList = _list.slice(0, k);
          } else {
            var k = userPrefs.testAssign.questions.length
            slicedList = _list.slice(0, k);
          }
          // Number of QtoAppear
          setQuestionsList(slicedList);
        }

        console.log('This is my question list');
        console.log(slicedList);

      } else {
        if (userPrefs.testAssign.details.qRandom == true) {
          var shuffledQuestions = shuffle(userPrefs.testAssign.questions);
          if (userPrefs.testAssign.details.numberOfQtoAppear < 999999999999) {
            var k = userPrefs.testAssign.details.numberOfQtoAppear
            slicedList = shuffledQuestions.slice(0, k);
          } else {
            var k = userPrefs.testAssign.questions.length
            slicedList = shuffledQuestions.slice(0, k);
          }
          setQuestionsList(slicedList);
        } else {
          if (userPrefs.testAssign.details.numberOfQtoAppear < 999999999999) {
            var k = userPrefs.testAssign.details.numberOfQtoAppear
            slicedList = userPrefs.testAssign.questions.slice(0, k);
          } else {
            var k = userPrefs.testAssign.questions.length
            slicedList = userPrefs.testAssign.questions.slice(0, k);
          }
          setQuestionsList(slicedList);
        }
      }
    }
  };

  const _onUpdatePagerIndex = index => {
    if (pagerViewRef !== null) {
      setPagerIndex(index);
      pagerViewRef.current.setPage(index);
    }
  };

  const _onPractice = () => {
    debugger;
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      setTimeout(() => {
        baseViewRef.current.hideLoader();
        if (!has1WayQuestions) {

        }
        if (userPrefs.testAssign.testCategory == 'General') {
          // generalJSON.forEach(it => {
          //   const newOptions = [];
          //   it.options.forEach((choice, index) => {
          //     const item = {
          //       selected: false,
          //       option: choice,
          //     };
          //     // return item;
          //     newOptions.push(item);
          //   });

          //   it.options = newOptions;
          //   _list.push(it);

          // });
          props.navigation.navigate('GeneralAssessment', {
            type: 'PRACTICE',
            onGoBack: () => {
              if (!has1WayQuestions) {
                // _onUpdatePagerIndex(3);
              } else {
                // _onUpdatePagerIndex(5);
              }
            },
          });
        } else if (!has1WayQuestions) {
          props.navigation.navigate('PracticeMCQ', {
            onGoBack: () => {
              if (!has1WayQuestions) {
                // _onUpdatePagerIndex(3);
              } else {
                // _onUpdatePagerIndex(5);
              }
            },
          });
        } else {
          props.navigation.navigate('OneWay', {
            qList: oneWayJson,
            type: 'PRACTICE',
            onGoBack: () => {
              if (!has1WayQuestions) {
                // _onUpdatePagerIndex(3);
              } else {
                // _onUpdatePagerIndex(5);
              }
            },
          });
        }
      }, 0);
    }
  };

  const _onBeginMCQ = () => {
    debugger;
    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      startAssessment(userPrefs._id)
        .then(response => {
          baseViewRef.current.hideLoader();
          console.log('[Instructions.js] on BeginMCQ response: ', response);
          // const takes = response.data.startTest.takes;

          if (userPrefs.testAssign.testCategory == 'General') {
            props.navigation.replace('GeneralAssessment', {
              qList: questionsList,
              type: 'TEST',
            })
          } else if (!has1WayQuestions) {
            props.navigation.replace('AssessmentScreen', {
              qList: questionsList,
            });
          } else {
            props.navigation.replace('OneWay', {
              qList: questionsList,
              type: 'TEST',
            });
          }
        })
        .catch(error => {
          baseViewRef.current.hideLoader();
          console.log('[Instructions.js] on BeginMCQ : ', error);
        });

      // Delete this later
      // baseViewRef.current.hideLoader();
      //     if(userPrefs.testAssign.testCategory=='General'){
      //       props.navigation.replace('GeneralAssessment',{
      //         qList: questionsList,
      //         type: 'TEST',
      //       })
      //     }else if (!has1WayQuestions) {
      //       props.navigation.replace('AssessmentScreen', {
      //       qList: questionsList,
      //     });
      //     }else {
      //       props.navigation.replace('OneWay', {
      //         qList: questionsList,
      //         type: 'TEST',
      //       });
      //     }
      // Delete this later
    }
  };

  function shuffle(array) {
    // debugger;
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  // ONE WAY Methods-----------------------------------------------------------------------------------
  // const _onAcceptOneWay = () => {};

  // const _onPracticeOneWay = () => {
  //   if (baseViewRef !== null) {
  //     baseViewRef.current.showLoader();
  //     setTimeout(() => {
  //       baseViewRef.current.hideLoader();
  //       props.navigation.navigate('OneWay');
  //     }, 1000);
  //   }
  // };

  //TWO way----------------------------------------------------------------------------------------------------
  // const _onStartInterview = () => {
  //   props.navigation.navigate('SubmitTwoWay', {
  //     comments: ['Leadership', 'Analytical', 'Weak in Communication'],
  //   });
  //   // props.navigation.navigate('TwoWay')
  // };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      statusBarColor={'#f5f5f5'}
    // hasHeader
    // hasQuit
    // onQuitPress={() => {
    //   showConfirmAlert('Quit Test', 'Are you sure you want to quit?', () =>
    //     props.navigation.replace('LoginWithCode'),
    //   );
    // }}
    // title={'High5 Hire'}
    // headerParentStyle={{
    //   borderBottomLeftRadius: 0,
    //   borderBottomRightRadius: 0,
    // }}
    // hasHome={pagerIndex !== 0}
    // onHomePress={() => _onUpdatePagerIndex(0)}
    >
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent:'flex-end'
        }}>
        <TouchableOpacity onPress={() => _onUpdatePagerIndex(0)}>
          {companyInfo !== null &&
            companyInfo.companyLogo !== undefined &&
            companyInfo.companyLogo !== '' &&
            companyInfo.companyLogo !== 'NA' ? (
            <Image
              source={{ uri: companyInfo.companyLogo.slice(0, companyInfo.companyLogo.indexOf('?')) }}
              style={styles.headerCompanyLogo}
            // resizeMode={'contain'}
            />
          ) : companyAvatar !== '' ? (
            <Avatar
              // source={images.high5Icon}
              // icon={{name: 'apartment', type: 'material', color: '#fff'}}
              title={companyAvatar}
              containerStyle={{
                backgroundColor: colors.accent,
                marginLeft: 16,
                marginRight: 16,
              }}
              rounded
              size={40}
            // resizeMode={'contain'}
            />
          ) : (
            <Image
              source={images.high5Icon}
              style={styles.headerCompanyLogo}
              resizeMode={'cover'}
            />
          )}
        </TouchableOpacity>
        {companyInfo !== null && (
          <Text style={styles.companyName}>{companyInfo.companyName}</Text>
        )}
      </View>

      {/* <TouchableOpacity style={{padding: 16}}>
          <Icon
            name={'info'}
            type={'feather'}
            color={colors.accent}
            size={IS_TABLET ? 32 : 28}
          />
        </TouchableOpacity> */}
      {/* </View> */}
      {!has1WayQuestions && !hasGeneralQuestions && (
        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          initialPage={pagerIndex}
          scrollEnabled={false}>
          <View key="1">
            <WelcomeView
              {...props}
              has1WayQuestions
              onPractice={() => _onPractice()}
              onContinue={() => _onUpdatePagerIndex(1)}
            />
          </View>
          <View key="2">
            <AboutQuestions
              onContinue={() => _onUpdatePagerIndex(2)}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
              {...props}
            />
            {/* <InstructionsView
              onContinue={() => _onUpdatePagerIndex(2)}
              has1WayQuestions={has1WayQuestions}
            /> */}
          </View>
          <View key={'3'}>
            {/* <PracticeTest
              onPractice={() => _onPractice()}
              onContinue={() => _onUpdatePagerIndex(3)}
            /> */}
            <InstructionsView
              // onContinue={() => _onUpdatePagerIndex(2)}
              onContinue={() => _onBeginMCQ()}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
            />
          </View>
          <View key="4">
            <BeginTest
              has1WayQuestions={has1WayQuestions}
              onBegin={() => _onBeginMCQ()}
              onGoBackToPractice={() => _onUpdatePagerIndex(2)}
            />
          </View>
        </PagerView>
      )}

      {has1WayQuestions && (
        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          initialPage={pagerIndex}
          scrollEnabled={false}>
          <View key="1">
            <WelcomeView
              {...props}
              has1WayQuestions
              onPractice={() => _onPractice()}
              onContinue={() => _onUpdatePagerIndex(1)}
            />
          </View>
          <View key="2">
            <AboutQuestions
              onContinue={() => _onUpdatePagerIndex(2)}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
              {...props}
            />
            {/* <AboutQuestions onContinue={() => _onUpdatePagerIndex(2)} /> */}
          </View>
          <View key="3">
            <CheckCameraAndMicrophone
              onContinue={() => _onUpdatePagerIndex(3)}
            />
          </View>
          <View key="4">
            <InstructionsView
              onContinue={() => _onBeginMCQ()}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
            />
            {/* <RecordingTips onContinue={() => _onUpdatePagerIndex(4)} /> */}
          </View>
          {/* <View key={'5'}>
            <PracticeTest
              onPractice={() => _onPractice()}
              onContinue={() => _onUpdatePagerIndex(5)}
            />
          </View>
          <View key="6">
            <BeginTest
              onBegin={() => _onBeginMCQ()}
              onGoBackToPractice={() => _onUpdatePagerIndex(4)}
            />
          </View> */}
        </PagerView>
      )}

      {hasGeneralQuestions && (
        <PagerView
          ref={pagerViewRef}
          style={styles.pagerView}
          initialPage={pagerIndex}
          scrollEnabled={false}>
          <View key="1">
            <WelcomeView
              {...props}
              has1WayQuestions
              onPractice={() => _onPractice()}
              onContinue={() => _onUpdatePagerIndex(1)}
            />
          </View>
          <View key="2">
            <AboutQuestions
              onContinue={() => _onUpdatePagerIndex(2)}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
              {...props}
            />
          </View>
          <View key="3">
            <CheckCameraAndMicrophone
              onContinue={() => _onUpdatePagerIndex(3)}
            />
          </View>
          <View key="4">
            <InstructionsView
              onContinue={() => _onBeginMCQ()}
              has1WayQuestions={has1WayQuestions}
              questionsList={questionsList}
            />
          </View>
        </PagerView>
      )}

      <View style={styles.row}>
        <Text style={styles.text}>Powered By </Text>
        <Image
          source={images.high5LogoBlue}
          style={styles.bottomHigh5Logo}
          resizeMode={'contain'}
        />
      </View>
    </BaseView>
  );
};

export default Instructions;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pagerView: {
    flex: 1,
    // alignItems:'center',
    // justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding:16,
    justifyContent: 'center',
    paddingBottom: 16,
  },
  text: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    color: '#888',
  },
  bottomHigh5Logo: {
    height: 24,
    width: 48,
    // tintColor: colors.accent,
    marginBottom: 10,
  },
  headerCompanyLogo: {
    height: 56,
    width: 56,
    borderRadius: 28,
    // overflow: 'hidden',
    marginHorizontal: 16,
    // alignSelf:'center',
    // borderWidth: 1,
    // borderColor: colors.borderColor,
  },
  companyName: {
    fontSize: 18,
    fontFamily: fonts.notoSans700,
    color: colors.accent,
    // marginLeft: 12,
  },
});
