import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import {fonts} from '../../../../values/fonts';
import {colors} from '../../../../values/colors';
import RatingQuestion from '../../../items/RatingQuestion';
import ButtonView from '../../../components/ButtonView';
import StepIndicator from '../../../../utils/indicator/StepIndicator';
import InterviewerFeedback1 from './InterviewerFeedback1';
import InterviewerFeedback2 from './InterviewerFeedback2';
import InterviewerFeedback3 from './InterviewerFeedback3';

const labels = ['Skills Feedback', 'Overall Feedback', 'Submit'];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: colors.primary,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: colors.primary,
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: colors.primary,
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: colors.primary,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: colors.primary,
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: colors.primary,
};

const InterviewerFeedback = props => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const _onSkillsNext = () => {
    setCurrentPosition(1);
  };

  const _onOverallNext = () => {
    setCurrentPosition(2);
  };

  const _onSubmit = () => {
    console.log('[SubmitMCQ.js] On Submit : ', props);
    props.navigation.replace('Splash');
  };

  return (
    <View style={styles.parent}>
      <Text style={styles.thankyou}>Thank you!</Text>
      <Text
        style={[
          styles.thankyou,
          {fontSize: 16, paddingTop: 0, paddingBottom: 24},
        ]}>
        Add your reviews.
      </Text>

      <StepIndicator
        customStyles={customStyles}
        currentPosition={currentPosition}
        labels={labels}
        stepCount={3}
        onPress={position => setCurrentPosition(position)}
      />
      <ScrollView style={{flex: 1}}>
        {currentPosition === 0 && (
          <InterviewerFeedback1 {...props} onNext={() => _onSkillsNext()} />
        )}

        {currentPosition === 1 && (
          <InterviewerFeedback2 {...props} onNext={() => _onOverallNext()} />
        )}

        {currentPosition === 2 && (
          <InterviewerFeedback3 {...props} onSubmit={() => _onSubmit()} />
        )}
      </ScrollView>

      {/* <ScrollView>
            <View style={styles.parent}>
                
                <RatingQuestion 
                    question={'1. How much rating would you like to give this app?'}
                />

                <RatingQuestion 
                    question={'2. Were the questions easy to understand?'}
                />

                <RatingQuestion 
                    question={'3. Was the time alloted to complete the test is sufficient?'}
                />

            </View>
            </ScrollView>
            <ButtonView 
                title={'Submit & Close'}
                containerStyle={{margin:24}}
                buttonStyle={{backgroundColor:colors.accent,borderColor:colors.accent}}
                onPress={props.onSubmit}
            /> */}
    </View>
  );
};

export default InterviewerFeedback;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingTop: 16,
  },
  thankyou: {
    fontSize: 32,
    fontFamily: fonts.notoSans700,
    color: colors.primary,
    alignSelf: 'center',
    paddingTop: 24,
  },
});
