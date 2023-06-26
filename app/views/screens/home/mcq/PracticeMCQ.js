import {
  AppState,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import WaitToStart from './items/WaitToStart';
import {showConfirmAlert,showComplete} from '../../../../utils/Message';
import PagerView from 'react-native-pager-view';
import {javascriptJson} from '../../../../json/01_javascript';
import MCQItem from './items/MCQItem';
import {colors} from '../../../../values/colors';
import {fonts} from '../../../../values/fonts';
import {Icon} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import ButtonView from '../../../components/ButtonView';
import MCQListModal from '../../../modals/MCQListModal';
import {IS_TABLET} from '../../../../values/dimens';
import {useSelector} from 'react-redux';
import {
  practiceMCQ,
  practiceQuestionsJson,
} from '../../../../json/practiceQuestions';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { showAlert } from '../../../../utils/Message';


const PracticeMCQ = props => {
  const baseViewRef = useRef(null);
  const pagerViewRef = useRef(null);

  const [isTestStarted, setIsTestStarted] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [isQuestionsModalVisible, setIsQuestionsModalVisible] = useState(false);

  const [list, setList] = useState([]);

  const userPrefs = useSelector(state => state.login.userPrefs);

  useEffect(() => {
    _init();
    AsyncStorage.setItem('SwitchNumber', JSON.stringify(0));
    const subscription = AppState.addEventListener('change', state => {
      if(state=='active'){
        (async () => {
          const temp_numberofTimes = await AsyncStorage.getItem('SwitchNumber');
          var numberofTimes = JSON.parse(temp_numberofTimes);
          if (numberofTimes<2){
            numberofTimes=numberofTimes+1;
            await AsyncStorage.setItem('SwitchNumber', JSON.stringify(numberofTimes));
            showAlert('error','Warning: Screen change detected');
          }else{
            showAlert('error','Test submitted. : You have been caught switching between apps.');
            props.navigation.goBack('');
          }
        })();
      }
    });

    return () => {
      subscription.remove();
      (async () => { await AsyncStorage.removeItem('SwitchNumber');})
    };

  }, []);

  const _init = () => {
    Alert.alert(
      "Warning",
      "During the assessment,interaction with other applications,or screen changes is strictly prohibited.Otherwise,your test will get submitted automatically.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    const _list = [];
    practiceMCQ.challenges.forEach(it => {
      it.options.forEach(opt => (opt.selected = false));
      _list.push(it);
    });
    // console.log('[PracticeMCQ.js] init : ', _list);
    setList(_list);
  };

  // const init = () => {
  //   const _list = practiceMCQ.challenges;
  //   // // const _list = practiceQuestionsJson
  //   // console.log('[PracticeMCQ.js] Init : ', _list);
  //   // // const updatedList = []
  //   // _list.forEach(it => {
  //   //   const newOptions = it.options.map((choice, index) => {
  //   //     const item = {
  //   //       selected: false,
  //   //       choice: choice,
  //   //     };
  //   //     return item;
  //   //   });

  //   //   it.options = newOptions;
  //   //   // return it;
  //   // });

  //   // console.log('[PracticeMCQ.js] Init : ', JSON.stringify(_list));
  //   setList(_list);
  // };

  const _onBack = () => {
    showConfirmAlert('Cancel Assessment', 'Are you sure you want to cancel?', () =>
      props.navigation.goBack(),
    );
  };

  const _onSaveAndNext = () => {
    // const hasSelectedAnyOption =
    //   list[initialIndex].options.filter(it => it.selected).length > 0;
    // console.log(
    //   '[PracticeMCQ.js] On Next : ',
    //   pagerViewRef,
    //   initialIndex,
    //   hasSelectedAnyOption,
    // );
    if (pagerViewRef !== null) {
      if (initialIndex === list.length - 1) {
        _onSubmit();
      } else {
        pagerViewRef.current.setPage(initialIndex + 1);
        setInitialIndex(initialIndex + 1);
      }
    }
  };

  const _onSubmit = () => {
    showComplete('Submit', 'Practice Assessment Completed.', () => {
      props.navigation.goBack('');
    },'success');
    setTimeout(()=>{
      props.navigation.goBack('');
    },2000)

  };

  const _onPrev = () => {
    if (pagerViewRef !== null) {
      pagerViewRef.current.setPage(initialIndex - 1);
      setInitialIndex(initialIndex - 1);
    }
  };

  const _onSelectQuestionFromModal = index => {
    console.log('[PracticeMCQ.js] Index : ', index);
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
      hasBack
      onBackPress={() => _onBack()}
      title={'Practice: '+userPrefs.testAssign.testName}
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
      // }
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
                  until={5 * 60}
                  onFinish={() => {}}
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
                  // running={isTimerStopped}
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
                  isPracticeTest={true}
                  initialIndex={initialIndex+1}
                  listLength={list.length}
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
                // disabled={
                //   !list[initialIndex].options.filter(it => it.selected)
                //     .length > 0
                // }
              />
            </View> */}
          </View>
        ) : (
          <WaitToStart
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

export default PracticeMCQ;

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
