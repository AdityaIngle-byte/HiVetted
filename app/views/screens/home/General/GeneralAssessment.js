import {Image, StyleSheet, Text, TouchableOpacity, View,AppState,Alert} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import WaitToStart from '../mcq/items/WaitToStart';
import {
  showAlert,
  showChoiceAlert,
  showConfirmAlert,
  showComplete
} from '../../../../utils/Message';
import {colors} from '../../../../values/colors';
import {fonts} from '../../../../values/fonts';
import {Icon} from 'react-native-elements';
import {oneWayJson} from '../../../../json/OneWayJson';
import TestHeading from '../../../items/TestHeading';
import ButtonView from '../../../components/ButtonView';
import PreviewVideoModal from '../../../modals/PreviewVideoModal';
import {RNCamera} from 'react-native-camera';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CountDown from 'react-native-countdown-component';
import {IS_TABLET} from '../../../../values/dimens';
import {useSelector} from 'react-redux';
import {submitAssessment} from '../../../../redux/actions/homeActions';
import MovableView from '../../../../utils/MovableView';
import {errorHandler} from '../../../../redux/networkRequests/ErrorHandler';
import AxiosBase from '../../../../redux/networkRequests/AxiosBase';
import PagerView from 'react-native-pager-view';
import MCQItem from '../mcq/items/MCQItem';
import { generalJSON } from '../../../../json/GeneralQues';
import AsyncStorage from '@react-native-community/async-storage';

const DURATION = 6;

const GeneralAssessment = props => {

  const baseViewRef = useRef(null);
  const cameraRef = useRef(null);
  const pagerViewRef = useRef(null);

  // const [isPreview, setIsPreview] = useState(false);

  const userPrefs = useSelector(state => state.login.userPrefs);

  // const [duration, setDuration] = useState(DURATION);
  const [testType, setTestType] = useState('TEST');
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [recordedData, setRecordedData] = useState(null);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [initialStart, setInitialStart] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [waitTimer, setWaitTimer] = useState(3);
  const [isCountDownRunning, setIsCountDownRunning] = useState(true);
  const [currentTake, setCurrentTake] = useState(0);
  const [duration, setDuration] = useState(0);
  const [multilineAns, setMultilineAns] = useState('');
  const [isTestTimerRunning, setIsTestTimerRunning] = useState(true);
  const [count,setCount] = useState(-1);

  const [list, setList] = useState([]);

  useEffect(() => {
    init();
    _initNormal();
    if (!isFirstTime) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffectCallback();
    }
    // AsyncStorage.setItem('isSubmitted', JSON.stringify(false));
    // AsyncStorage.setItem('SwitchNumber', JSON.stringify(0));
    const subscription = AppState.addEventListener('change', state => {
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
              setIsTestTimerRunning(false);
              showAlert('error','Test submitted : You have been caught switching between apps.');
              _onSubmit(list,true);
              // _submittingAssessment(true,list);
            }
          }
        })();
      }
    });

    return () => {
      subscription.remove();
      (async () => { 
        await AsyncStorage.removeItem('SwitchNumber');
        await AsyncStorage.removeItem('isSubmitted');
      })
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, list]);

  const init = () => {
    debugger;
    const {qList, type} = props.route.params;
    if (type !== undefined) {
      setTestType(type);
    }
    if(type == 'PRACTICE'){
      debugger;
      if(list.length<1){
        Alert.alert(
          "Warning",
          "During the assessment,interaction with other applications,or screen changes is strictly prohibited.Otherwise,your test will get submitted automatically.",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
        AsyncStorage.setItem('SwitchNumber', JSON.stringify(0));
        AsyncStorage.setItem('isSubmitted', JSON.stringify(false));
        const qList = [];
        generalJSON.forEach(it => {
          it.options.forEach(opt => (opt.selected = false));
          qList.push(it);
        });
        console.log(qList);
        var _list = qList;
        var mcq=[];
        var video=[];var temp=[];
          _list.forEach((it, index) => {
          if(it.type=="OneWay"){
              it.answerUri = null;
              it.currentTake = 0;
              video.push(it);
          // return it;
          }else{
              mcq.push(it);
          }
          });
          mcq.forEach((it, index) => {
              temp.push(it);
          })
       
          video.forEach((it, index) => {
              temp.push(it);
          })
        setList(temp);
      }
    }else{
      debugger;
      if (list.length < 1) {
        AsyncStorage.setItem('SwitchNumber', JSON.stringify(0));
        AsyncStorage.setItem('isSubmitted', JSON.stringify(false));
        // const updatedList = []
        var _list = qList;
        var mcq=[];
        var video=[];var temp=[];
          _list.forEach((it, index) => {
          if(it.type=="OneWay"){
              it.answerUri = null;
              it.currentTake = 0;
              video.push(it);
          // return it;
          }else{
              mcq.push(it);
          }
          });
          mcq.forEach((it, index) => {
              temp.push(it);
          })
       
          video.forEach((it, index) => {
              temp.push(it);
          })
       
        console.log('[OneWay.js] Init : ', temp);
        setList(temp);
      }
    }
  };

  const _initNormal = useCallback(() => {
    

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

  const useEffectCallback = () => {
    console.log('[OneWayQuestionItem.js] Called', isRecording);
    if (cameraRef !== null) {
      if (isRecording) {
        _startRecordVideo();
      } else {
        console.log('[OneWayQuestionItem.js] Video Recording Stop');
        _stopRecordVideo();
      }
    }
  };

  const _onRecord = () => {
    debugger;
    // console.log('[OneWayQuestionItem.js] Record Called')
    setInitialStart(true);
    setIsFirstTime(false);
    setIsRecording(prevState => !prevState);
    setIsCountDownRunning(true);
  };

  const _startRecordVideo = async () => {
    if (cameraRef !== null) {
      try {
        console.log('[OneWayQuestionItem.js] starting Video: ', cameraRef);
        const recordOptions = {
          quality: RNCamera.Constants.VideoQuality['480p'],
          maxDuration: parseInt(list[initialIndex].duration),
        };
        const promise = cameraRef.current.recordAsync(recordOptions);
        if (promise) {
          const data = await promise;
          console.log('[OneWayQuestionItem.js] takeVideo', data);
          setRecordedData(data);
        }
      } catch (e) {
        console.log('[OneWayQuestionItem.js] takeVideo error', e);
      }
    }
  };

  const _submittingAssessment = (testRejected=false) => {
    const quesAns = [];
    list.forEach((ques, index) => {
        if(ques.type=='MCQ'){
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
        }else if(ques.type=="Multiline"){
          const data = {
              questionId: ques._id,
              type: ques.type,
              isCorrectAnswer: false,
              isAnswered: ques.hasOwnProperty('multineANS') == true ? true : false,
              multiLineAns: ques.multineANS
          };
          quesAns.push(data);
        } else{
            const data = {
                questionId: ques._id,
                type: ques.type,
                isCorrectAnswer: false,
                isAnswered: ques.answerUri !== null ? true : false,
                videoUrl: ques.answerUri,
            };
            quesAns.push(data);
        } 
    });

    const data = {
      candidateId: userPrefs._id,
      questions: quesAns,
      candidateName: userPrefs.firstName+' '+userPrefs.lastName,
      // userId: userPrefs.testAssign.createdBy,
      // testId: userPrefs.testAssign._id,
      // deleted: false,
      testAssign: userPrefs.testAssign,
      // createdBy: {id: userPrefs.createdBy.id, role: userPrefs.createdBy.role,name:userPrefs.createdBy.name},
      createdBy:userPrefs.createdBy,
      reviewer:userPrefs.reviewer,
      testRejected:testRejected==true?true:false,
    };

    console.log('[AssessmentScreen.js] _onSubmit : ', data);

    if (baseViewRef !== null) {
      baseViewRef.current.showLoader();
      submitAssessment(data)
        .then(response => {
          baseViewRef.current.hideLoader();
          console.log('[AssessmentScreen.js] _onSubmit response: ', response);
          props.navigation.replace('SubmitMCQ', {
            list: list,
          });
        })
        .catch(error => {
          baseViewRef.current.hideLoader();
          // console.log('[AssessmentScreen.js] _onSubmit error: ', error);
        });
    }
  };

  const _stopRecordVideo = () => {
    // setIsCountDownRunning(false);
    setIsRecording(false);
    console.log('[OneWayQuestionItem.js] Stopping Video: ', cameraRef);
    if (cameraRef !== null) {
      cameraRef.current.stopRecording();
    }
  };

  // const _updateItem = data => {
  //     console.log('[OneWayQuestionItem.js] takeVideo', data);
  //     setRecordedData(data)
  // }

  const _onSubmit = (updatedList,testRejected=false) => {
    if (testType === 'PRACTICE') {
      // showComplete('Submit', 'Practice Assessment Completed.', () => {
      //   props.navigation.goBack('');
      // },'success');
      testRejected==true?showAlert('error','Test submitted : You have been caught switching between apps.'):
      showComplete('Submit', 'Practice Assessment Completed.', () => {
        props.navigation.goBack('');
      },'success');
        props.navigation.goBack('');
    } else {
      const quesAns = [];
      updatedList.forEach((ques, index) => {
        if(ques.type=='MCQ'){
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
        }else if(ques.type=="Multiline"){
          const data = {
              questionId: ques._id,
              type: ques.type,
              isCorrectAnswer: false,
              isAnswered: ques.hasOwnProperty('multineANS') == true ? true : false,
              multiLineAns: ques.multineANS,
          };
          quesAns.push(data);
        } else{
            const data = {
                questionId: ques._id,
                type: ques.type,
                isCorrectAnswer: false,
                isAnswered: ques.answerUri !== null ? true : false,
                videoUrl: ques.answerUri,
            };
            quesAns.push(data);
        } 
      });

      const data = {
        candidateId: userPrefs._id,
        questions: quesAns,
        candidateName: userPrefs.firstName+' '+userPrefs.lastName,
        testAssign: userPrefs.testAssign,
        createdBy:userPrefs.createdBy,
        reviewer:userPrefs.reviewer,
        testRejected:testRejected==true?true:false,
      };

      console.log('[OneWay.js] _onSubmit : ', data);

      if (baseViewRef !== null) {
        baseViewRef.current.showLoader();
        submitAssessment(data)
          .then(response => {
            baseViewRef.current.hideLoader();
            console.log('[OneWay.js] _onSubmit response: ', response);
            props.navigation.replace('SubmitMCQ', {
              list: list,
              testRejected:testRejected
            });
          })
          .catch(error => {
            baseViewRef.current.hideLoader();
            console.log('[OneWay.js] _onSubmit error: ', error);
          });
      }
      // props.navigation.replace('SubmitOneWay', {
      //   list: list,
      // });
    }
  };

  // Old Function show Preview Video and Get the Reset and Upload button.

  // const _onSaveAndNext = () => {
  //   if (recordedData !== null) {
  //     props.navigation.navigate('PreviewVideo', {
  //       videoUrl: recordedData.uri,
  //       detail: list[initialIndex],
  //       list: list,
  //       testType: testType,
  //       onGoBack: (data, list) => {
  //         if (data === 'Reset') {
  //           _onPreviewReset();
  //         } else if (data === 'Upload') {
  //           _onUpload(list);
  //           setRecordedData(null);
  //           setInitialStart(false);
  //           // _updateCurrentTake(true);
  //           setWaitTimer(3);
  //           setCurrentTake(0);
  //         }
  //       },
  //     });
  //   }
  // };

  // New Function to directly upload the video on the server.
  const _onSaveAndNext = (value,type) => {
    if(value=='MCQ'){
        if (pagerViewRef !== null) {
            if(type=='Multiline'){
                const detail   = list[initialIndex];
                const _list=list;
                const index = list.findIndex(it => it._id === detail._id);
                _list[initialIndex].multineANS = multilineAns;
                setList(_list);
            }
            if (initialIndex === list.length - 1) {
                // _onSubmit();
                setIsTestTimerRunning(false);
                if (testType === 'PRACTICE') {
                    showAlert('error','Practice Assessment Completed. : You have been caught switching between apps.');
                    props.navigation.goBack('');
                }else{
                  _submittingAssessment() // 1 if mcq and multiline
                }
            } else {
                pagerViewRef.current.setPage(initialIndex + 1);
                setInitialIndex(initialIndex + 1);
            }
        }
    }
    if (recordedData !== null) {
      setIsTestTimerRunning(false);
      onUploadPreview();
    }
  };

  const onUploadPreview = async () => {
    if (baseViewRef !== null) {
      var videoUrl =recordedData.uri;
      var detail   = list[initialIndex];
      // var list     = list;
      // var testType = testType;
      console.log('[PreviewVideo.js]', videoUrl, detail, testType, list);
      const _list = list;
      const index = list.findIndex(it => it._id === detail._id);
      if (testType === 'PRACTICE') {
        _list[index].answerUri = videoUrl;
        // console.log('[OneWay.js] On upload : ', _list);
        _onButtonPress('Upload', _list);
        setIsTestTimerRunning(true);
      }else if (testType === 'TEST') {
        baseViewRef.current.showLoader();
        // setIsUploading(true);
        console.log('[PreviewVideo.js] _onUpload : ', videoUrl);
        // const videoDetail = await RNFS.fs.stat(videoUrl);
        // console.log('[PreviewVideo.js] _onUpload : ', videoDetail);
        const formData = new FormData();
    
        const videoFileType = videoUrl.split('.');
        const fileName = videoUrl.split('/');
        const videoFile = {
          name: fileName[fileName.length - 1],
          type: `video/${videoFileType[videoFileType.length - 1]}`,
          uri: videoUrl,
        };
        formData.append('videos', videoFile);
        formData.append('questionId', detail._id);
        formData.append('candidateId', userPrefs._id);
        formData.append('testId', userPrefs.testAssign._id);
    
        console.log('[PreviewVideo.js] _onUpload : ', formData);
        AxiosBase.post('videos/storeVideos', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(response => {
            baseViewRef.current.hideLoader();
            console.log('[HomeActions.js] response : ', response);
            // setIsUploading(false);
            if (response.data.videoUrl !== undefined) {
              _list[index].answerUri = response.data.videoUrl;
              _onButtonPress('Upload', _list);
              setIsTestTimerRunning(true);
            }
          })
          .catch(error => {
            baseViewRef.current.hideLoader();
            console.log(error);
            // setIsUploading(false);
            showAlert('error', 'Error while uploading video. Try Again.');
            errorHandler(error);
          });
      } 
    }
  };

  const _onButtonPress = (flag, list) => {
      if (flag === 'Upload') {
        onGoBack(flag, list);
      } else {
        onGoBack(flag);
      }
  
    // _onClose();
  };

  const onGoBack =(data, list) => {
    if (data === 'Reset') {
      _onPreviewReset();
    } else if (data === 'Upload') {
      _onUpload(list);
      setRecordedData(null);
      setInitialStart(false);
      // _updateCurrentTake(true);
      setWaitTimer(3);
      setCurrentTake(0);
      _stopRecordVideo();
    }
  }

  const _onPreviewReset = () => {
    console.log('[OneWay.js] on Reset : ', currentTake);
      setRecordedData(null);
      setInitialStart(false);
      // _updateCurrentTake(true);
      setWaitTimer(3);
 
  };

  const _onUpload = updatedList => {
    console.log('[OneWay.js] Updated List : ', updatedList);
    setWaitTimer(3);
    setCurrentTake(0);
    // setList(_list);
    if (initialIndex === list.length - 1) {
      _onSubmit(updatedList);
    } else {
      setInitialIndex(value => value + 1);
    }

    if (testType === 'TEST') {
      // const _list = list;
      // const index = list.findIndex(it => it._id === list[initialIndex]._id);
      // _list[index].answerUri = recordedData.uri;
      setList(updatedList);
    }

    // _onPreviewReset();
  };

  // const _onSkip = () => {
  //   setIsCountDownRunning(false);
  //   setWaitTimer(3);
  //   console.log('[OneWay.js] on Skip : ', list.length - 1, initialIndex);
  //   _stopRecordVideo();
  //   showChoiceAlert(
  //     'Skip',
  //     'Skipped Question will not be visible again. Are you sure you want to skip?',
  //     () => {
  //       const take = 0;
  //       setCurrentTake(take);
  //       if (initialIndex === list.length - 1) {
  //         console.log('[OneWay.js] Test Completed');
  //         // alert('Done')
  //         setTimeout(() => {
  //           // setIsTestStarted(false)
  //           _onSubmit(list);
  //           _onPreviewReset();
  //         }, 500);
  //       } else {
  //         setInitialIndex(value => value + 1);
  //         setIsCountDownRunning(true);
  //         setRecordedData(null);
  //         setInitialStart(false);
  //         // _updateCurrentTake(true);
  //         setWaitTimer(3);
  //         console.log('[OneWay.js] Test skipped Completed');
  //       }
  //     },
  //     'continue',
  //     () => setIsCountDownRunning(true),
  //     () => setIsCountDownRunning(true),
  //     // () => _onRecord(),
  //     // () => _onRecord(),
  //   );
  // };

  const _updateCurrentTake = hasRecording => {
    const totalTakes = parseInt(list[initialIndex].takes);
    console.log('[OneWay.js] : ', currentTake, totalTakes, isRecording);
      if (!isRecording) {
        setCurrentTake(value => value + 1);
      }
      _onRecord();

    //   console.log(
    //     '[OneWay.js] on Update Current Take : ',
    //     currentTake,
    //     isRecording,
    //   );
    //   if (isRecording) {
    //     _stopRecordVideo();
    //   } else {
    //     showAlert('error', 'You have already taken all takes.');
    //   }
    // } else {
    //   console.log(
    //     '[OneWay.js] on Update Current Take : ',
    //     currentTake,
    //     isRecording,
    //   );
    //   if (!isRecording) {
    //     setCurrentTake(value => value + 1);
    //   }
    // if (hasRecording) {

    // }
    // }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack={testType === 'PRACTICE'}
      onBackPress={() => _onBack()}
      title={testType === 'PRACTICE' ? 'Practice: '+userPrefs.testAssign.testName : 'Assessment: '+userPrefs.testAssign.testName}>
      <View style={[styles.parent]}>
        {isTestStarted && list.length > 0 ? (
            <View style={{flex: 1}}>
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

            {/* <OneWayQuestionItem
                        duration={duration}
                        item={list[initialIndex]}
                        setRecordedData={data => setRecordedData(data)}
                    /> */}
            
            
                <PagerView
                style={{flex: 1,}}
                initialPage={0}
                ref={pagerViewRef}
                scrollEnabled={false}>
                {list[initialIndex].type=='MCQ' || list[initialIndex].type=='Multiline'
                ?
                    list.map((item, index) => (
                        <MCQItem
                            data={item}
                            index={index}
                            key={index}
                            isTestStarted={isTestStarted}
                            onSaveAndNext={() => _onSaveAndNext('MCQ',item.type)}
                            isLastQuestion={initialIndex === list.length - 1}
                            fromGeneral={true}
                            multilineAns={multilineAns}
                            setMultilineAns={setMultilineAns}
                            initialIndex={initialIndex}
                        />
                    ))
                :
                    <View style={[styles.parent]}>
                        <View style={{}}>
                        <Text style={styles.title}>{list[initialIndex].question}</Text>
                        {list[initialIndex].imageUrl !== '' && (
                            <Image
                            source={{uri: list[initialIndex].imageUrl}}
                            style={{height: 240, width: '100%'}}
                            resizeMode="contain"
                            />
                        )}
                        </View> 
                        <View style={{flex:1}}>
                        {/* <MovableView
                            onMove={values => console.log(values)}
                            disabled={list[initialIndex].imageUrl === ''}
                            style={
                            list[initialIndex].imageUrl !== ''
                                ? styles.moveableView
                                : styles.cameraView
                            }> */}
                            <RNCamera
                            ref={cameraRef}
                            style={
                                list[initialIndex].imageUrl !== ''
                                ? styles.cameraView2
                                : styles.cameraView
                            }
                            type={RNCamera.Constants.Type.front}>
                            {!initialStart && (
                                <View style={styles.initialStart}>
                                <Text>Recording will be start automatically after</Text>
                                <CountDown
                                    until={waitTimer}
                                    onFinish={() => _updateCurrentTake(true)}
                                    size={48}
                                    timeToShow={['S']}
                                    timeLabels={{s: 'Seconds'}}
                                    digitStyle={{backgroundColor: 'transparent'}}
                                    digitTxtStyle={{
                                    color: colors.accent,
                                    fontFamily: fonts.notoSans700,
                                    }}
                                    showSeparator
                                    separatorStyle={{color: colors.accent}}
                                    running={isCountDownRunning}
                                    onChange={value => setWaitTimer(value)}
                                />
                                </View>
                            )}
        
                            <TouchableOpacity
                                style={styles.recordView}
                                activeOpacity={0.7}
                                // disabled
                                onPress={() => _updateCurrentTake(true)}>
                                {isRecording ? (
                                <CountdownCircleTimer
                                    isPlaying={isRecording}
                                    duration={parseInt(list[initialIndex].duration)}
                                    colors={[colors.accent]}
                                    size={IS_TABLET ? 72 : 56}
                                    strokeWidth={IS_TABLET ? 18 : 12}
                                    trailColor={colors.primary}
                                    // running={isCountDownRunning}
                                    onComplete={() => _stopRecordVideo()}>
                                    {({remainingTime}) => (
                                    <Text style={styles.time}>{remainingTime}</Text>
                                    )}
                                </CountdownCircleTimer>
                                ) : (
                                <View style={styles.recordBtn}>
                                    <View style={styles.recordSubBtn} />
                                </View>
                                )}
                            </TouchableOpacity>
                            </RNCamera>
                        {/* </MovableView> */}
                        </View>
                    </View>
                 }
                </PagerView>
            
            {(list[initialIndex].type=='MCQ' || list[initialIndex].type=='Multiline')?null:
            <View style={styles.bottomView}>
              {/* <ButtonView
                title={'Skip'}
                size={'medium'}
                containerStyle={{flex: 1, marginRight: 8}}
                buttonStyle={{
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                }}
                onPress={() => _onSkip()}
              /> */}
              <ButtonView
                title={
                  initialIndex === list.length - 1
                    ? 'Submit'
                    : 'Next'
                }
                size={'medium'}
                containerStyle={{flex: 1, marginLeft: 8}}
                buttonStyle={{
                  backgroundColor: colors.darkBlue,
                  borderColor: colors.darkBlue,
                }}
                onPress={() => _onSaveAndNext()}
                disabled={recordedData === null}
              />
            </View>
            }
          </View>
        ) : (
          <WaitToStart
            onTimerFinish={() => setIsTestStarted(true)}
            // onTimerFinish={() => {}}
            onCancel={() => _onBack()}
            text={'Your assessment starts in'}
          />
        )}
      </View>

      {/* <PreviewVideoModal
        isVisible={isPreview}
        onClose={() => setIsPreview(false)}
        videoUrl={recordedData !== null ? recordedData.uri : null}
        onReset={() => _onPreviewReset()}
        onUpload={() => _onUpload()}
      /> */}
    </BaseView>
  );
};

export default GeneralAssessment;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal:10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:10
  },
  text: {
    fontSize: IS_TABLET ? 24 : 14,
    color: colors.defaultTextColor,
    fontFamily: fonts.notoSans400_2,
  },
  bottomView: {
    flexDirection: 'row',
    margin: 24,
  },
  title: {
    fontSize: IS_TABLET ? 18 : 12,
    fontFamily: fonts.notoSans400_2,
    color: colors.primary,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  moveableView : {
    height: '40%',
    width: '40%',
    position: 'absolute',
    bottom: 48,
    right: 16,
  },
  cameraView2: {
    height: '100%',
    width: '100%',
    overflow:'hidden'
    // flex:1
    // position: 'absolute',
    // bottom: 48,
    // right: 16,
  },
  cameraView: {
    flex: 1,
    // marginHorizontal:16,
    marginTop: 16,
    // borderRadius:8,
    overflow: 'hidden',
  },
  recordView: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    zIndex: 100,
  },
  recordBtn: {
    height: IS_TABLET ? 72 : 56,
    width: IS_TABLET ? 72 : 56,
    backgroundColor: colors.accent,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordSubBtn: {
    height: IS_TABLET ? 28 : 16,
    width: IS_TABLET ? 28 : 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  time: {
    fontSize: IS_TABLET ? 24 : 18,
    color: '#fff',
    fontFamily: fonts.notoSans600,
  },
  initialStart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
