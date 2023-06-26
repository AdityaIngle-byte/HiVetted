import {Alert, AppState, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import WaitToStart from '../mcq/items/WaitToStart';
import {showAlert, showConfirmAlert} from '../../../../utils/Message';
import PagerView from 'react-native-pager-view';
import {javascriptJson} from '../../../../json/01_javascript';
import MCQItem from '../mcq/items/MCQItem';
import {colors} from '../../../../values/colors';
import {fonts} from '../../../../values/fonts';
import {Icon} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import ButtonView from '../../../components/ButtonView';
import MCQListModal from '../../../modals/MCQListModal';
import {IS_TABLET} from '../../../../values/dimens';
import {
  practiceMCQ,
  practiceQuestionsJson,
} from '../../../../json/practiceQuestions';
import {useSelector} from 'react-redux';
import {submitAssessment} from '../../../../redux/actions/homeActions';
import {useCallback} from 'react';
import AsyncStorage from '@react-native-community/async-storage';


const AssessmentScreen = props => {
  const baseViewRef = useRef(null);
  const pagerViewRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);

  const [duration, setDuration] = useState(0);
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [isQuestionsModalVisible, setIsQuestionsModalVisible] = useState(false);
  const [isTestTimerRunning, setIsTestTimerRunning] = useState(true);

  const [list, setList] = useState([]);

  useEffect(() => {
    _init();
    AsyncStorage.setItem('SwitchNumber', JSON.stringify(0));
    AsyncStorage.setItem('isSubmitted', JSON.stringify(false));
    const subscription = AppState.addEventListener('change', state => {
      console.log(state);
      if(state=='active'){
        (async () => {
          const temp_numberofTimes = await AsyncStorage.getItem('SwitchNumber');
          const temp_isSubmitted = await AsyncStorage.getItem('isSubmitted');
          var isSubmitted = JSON.parse(temp_isSubmitted);
          var numberofTimes = JSON.parse(temp_numberofTimes);
          if(!isSubmitted){
            if (numberofTimes<2){
              numberofTimes=numberofTimes+1;
              await AsyncStorage.setItem('SwitchNumber', JSON.stringify(numberofTimes));
              showAlert('error','Warning: Screen change detected');
            }else{
              await AsyncStorage.setItem('isSubmitted', JSON.stringify(true));
                showAlert('error','Test submitted : You have been caught switching between apps.');
                setIsTestTimerRunning(false);
                _submittingAssessment(true,list);
           
            }
          }
        })();
      }
      // console.log('AssessmentScreen.js', state);
      // if (state === 'background' || state === 'inactive') {
      //   props.navigation.replace('Splash');
      // }
    });
    return () => {
      subscription.remove();
      (async () => { 
        await AsyncStorage.removeItem('SwitchNumber');
        await AsyncStorage.removeItem('isSubmitted');
      })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  // const _init = () => {
  //   const _list = [];
  //   practiceMCQ.challenges.forEach(it => {
  //     it.options.forEach(opt => (opt.selected = false));
  //     _list.push(it);
  //   });
  //   console.log('[PracticeMCQ.js] init : ', _list);
  //   setList(_list);
  // };

  const _init = useCallback(() => {
    // const _list = [];
    const {qList} = props.route.params;
    // const _list = qList;
    qList.forEach(it => {
      it.options.forEach((option, index) => (option.selected = false));
    });
    // console.log('[PracticeMCQ.js] Init : ', qList, userPrefs);
    setList(qList);
    // eslint-disable-next-line radix
    const details = userPrefs.testAssign.details;
    if (details.duration !== undefined && details.duration !== '') {
      setDuration(parseInt(details.duration));
    } else {
      // setDuration(15);
      showAlert('error', 'Assessment duration not specified. Contact Support.');
      props.navigation.replace('Splash');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  const _onBack = () => {
    showConfirmAlert('Cancel Assessment', 'Are you sure you want to cancel?', () =>
      props.navigation.replace('Instructions'),
    );
  };

  const _onSaveAndNext = () => {
    debugger;
    // console.log('[PracticeMCQ.js] On Next : ', pagerViewRef);
    if (pagerViewRef !== null) {
      if (initialIndex === list.length - 1) {
        // _onSubmit();
        setIsTestTimerRunning(false);
        _submittingAssessment();
      } else {
        pagerViewRef.current.setPage(initialIndex + 1);
        setInitialIndex(initialIndex + 1);
      }
    }
  };

  // const _onSubmit = () => {
  //   showConfirmAlert('Submit', 'Are you sure want to submit?', () =>
  //     _submittingAssessment(),
  //   );
  // };

  const _submittingAssessment = (testRejected=false) => {
    const quesAns = [];
    list.forEach((ques, index) => {
      const choices = ques.options.filter(option => option.selected);
      const data = {
        questionId: ques._id,
        type: ques.type,
      };
      if (choices.length > 0) {
        data.isAnswered = true;
        if (ques.answer.length > 0) {
          if (ques.answer[0] === choices[0].option) {
            data.isCorrectAnswer = true;
          } else {
            data.isCorrectAnswer = false;
          }
        }
      } else {
        data.isAnswered = false;
        data.isCorrectAnswer = false;
      }
      quesAns.push(data);
    });

    const data = {
          candidateId: userPrefs._id,
          questions: quesAns || [],
          candidateName: userPrefs.firstName+' '+userPrefs.lastName,
          testRejected:testRejected==true?true:false,
          // userId: userPrefs.testAssign.createdBy,
          // testId: userPrefs.testAssign._id,
          // deleted: false,
          testAssign: userPrefs.testAssign,
          // createdBy: {id: userPrefs.createdBy.id, role: userPrefs.createdBy.role,name:userPrefs.createdBy.name},
          createdBy:userPrefs.createdBy,
          reviewer:userPrefs.reviewer
    };

    // console.log('[AssessmentScreen.js] _onSubmit : ', data);

    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      submitAssessment(data)
        .then(response => {
          baseViewRef.current.hideLoader();
          console.log('[AssessmentScreen.js] _onSubmit response: ', response);
          props.navigation.replace('SubmitMCQ', {
            list: list,
            testRejected:testRejected 
          });
        })
        .catch(error => {
          baseViewRef.current.hideLoader();
          // console.log('[AssessmentScreen.js] _onSubmit error: ', error);
        });

      // fetch('https://high5vettingqa-api.azurewebsites.net/result/add', {
      //   method: 'POST', //Request Type
      //   body: JSON.stringify({
      //     candidateId: userPrefs._id,
      //     questions: quesAns || [],
      //     candidateName: userPrefs.firstName+' '+userPrefs.lastName,
      //     testRejected:testRejected==true?true:false,
      //     // userId: userPrefs.testAssign.createdBy,
      //     // testId: userPrefs.testAssign._id,
      //     // deleted: false,
      //     testAssign: userPrefs.testAssign,
      //     // createdBy: {id: userPrefs.createdBy.id, role: userPrefs.createdBy.role,name:userPrefs.createdBy.name},
      //     createdBy:userPrefs.createdBy,
      //     reviewer:userPrefs.reviewer
      //   }),
      //   headers: {
      //     //Header Defination
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      // })
      // .then((response) => response.json())
      // //If response is in json then in success
      // .then((responseJson) => {
      //     baseViewRef.current.hideLoader();
      //     console.log('[AssessmentScreen.js] _onSubmit response: ', responseJson);
      //     props.navigation.replace('SubmitMCQ', {
      //       list: list,
      //       testRejected:testRejected 
      //     });
      //   console.log(responseJson);
      // })
      //If response is not in json then in error
      // .catch((error) => {
      //   baseViewRef.current.hideLoader();
      //   alert('Catch');
      //   console.log(error);
      // });
    }
  };

  const _onPrev = () => {
    if (pagerViewRef !== null) {
      pagerViewRef.current.setPage(initialIndex - 1);
      setInitialIndex(initialIndex - 1);
    }
  };

  const _onSelectQuestionFromModal = index => {
    // console.log('[PracticeMCQ.js] Index : ', index);
    setIsQuestionsModalVisible(false);
    if (pagerViewRef !== null) {
      pagerViewRef.current.setPage(index);
      setInitialIndex(index);
    }
  };

  const _onShowHideQuestionsModal = () =>
    setIsQuestionsModalVisible(prevState => !prevState);

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      // hasBack
      // onBackPress={() => _onBack()}
      title={'Assessment: '+userPrefs.testAssign.testName}
      // rightComponent={
      //   isTestStarted && (
      //     <TouchableOpacity
      //       style={{padding: IS_TABLET ? 24 : 12}}
      //       onPress={() => _onShowHideQuestionsModal()}>
      //       <Icon
      //         name="list"
      //         type="feather"
      //         color={'#fff'}
      //         size={IS_TABLET ? 40 : 24}
      //       />
      //     </TouchableOpacity>
      //   )
      // }>
    >
      <View style={styles.parent}>
        {isTestStarted && list.length > 0 ? (
          <View style={{flex: 1, padding: 16}}>
            <View style={styles.row}>
              <Text style={styles.text}>
                Question{' '}
                <Text
                  style={{color: colors.accent, fontFamily: fonts.notoSans800}}>
                  {initialIndex + 1}
                </Text>{' '}
                of {list.length}
              </Text>
              <View style={[styles.clockRow]}>
                <Icon
                  name="clock"
                  type="feather"
                  color={colors.primary}
                  size={IS_TABLET ? 32 : 28}
                />
                <CountDown
                  until={duration * 60}
                  // onFinish={() => _submittingAssessment()}
                  // size={16}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: '', s: ''}}
                  digitStyle={{backgroundColor: 'transparent'}}
                  digitTxtStyle={{
                    color: colors.accent,
                    fontFamily: fonts.notoSans700,
                    fontSize: IS_TABLET ? 24 : 20,
                  }}
                  showSeparator
                  separatorStyle={{color: colors.accent}}
                  // onPress={() => alert('hello')}
                  running={isTestTimerRunning}
                />
              </View>
            </View>
            <PagerView
              style={{flex: 1}}
              initialPage={0}
              ref={pagerViewRef}
              scrollEnabled={false}>
              {list.map((item, index) => (
                <MCQItem
                  data={item}
                  index={index}
                  key={index}
                  isTestStarted={isTestStarted}
                  onSaveAndNext={() => _onSaveAndNext()}
                  isLastQuestion={initialIndex === list.length - 1}
                />
              ))}
            </PagerView>
            {/* <ButtonView
                        title={'Save & Next '}
                        size={'medium'}
                        // containerStyle={{flex:2,marginHorizontal:16}}
                        iconRight
                        icon={
                            <Icon
                                name={'chevron-small-right'}
                                type={'entypo'}
                                color={'white'}
                            />
                        }
                    /> */}

            {/* <View style={{flexDirection: 'row', marginTop: 16}}>
              <ButtonView
                title={'Previous'}
                size={'medium'}
                containerStyle={{flex: 1, marginRight: 8}}
                buttonStyle={{
                  backgroundColor: colors.darkBlue,
                  borderColor: colors.darkBlue,
                }}
                disabled={initialIndex === 0}
                onPress={() => _onPrev()}
              />
              <ButtonView
                title={
                  initialIndex === list.length - 1
                    ? 'Save & Submit'
                    : 'Save & Next '
                }
                size={'medium'}
                containerStyle={{flex: 1, marginLeft: 8}}
                buttonStyle={{
                  backgroundColor: colors.darkBlue,
                  borderColor: colors.darkBlue,
                }}
                onPress={() => _onSaveAndNext()}
                // disabled={initialIndex === list.length-1}
              />
            </View> */}
          </View>
        ) : (
          <WaitToStart
            // onTimerFinish={() => {}}
            onTimerFinish={() => setIsTestStarted(true)}
            onCancel={() => _onBack()}
            text={'Your assessment starts in'}
          />
        )}
      </View>

      {/* {list.length > 0 && (
        <MCQListModal
          isVisible={isQuestionsModalVisible}
          onClose={() => _onShowHideQuestionsModal()}
          list={list}
          onItemPress={_onSelectQuestionFromModal}
        />
      )} */}
    </BaseView>
  );
};

export default AssessmentScreen;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: IS_TABLET ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: IS_TABLET ? 24 : 14,
    color: colors.defaultTextColor,
    fontFamily: fonts.notoSans400_2,
    textAlign: 'center',
  },
  clockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.accent,
    padding: 4,
    borderRadius: 4,
  },
});
