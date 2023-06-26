import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import BaseView from '../../../hoc/BaseView';
import {fonts} from '../../../../values/fonts';
import {colors} from '../../../../values/colors';
import RatingQuestion from '../../../items/RatingQuestion';
import ButtonView from '../../../components/ButtonView';
import {useSelector} from 'react-redux';
import {INTERVIEWER, TWO_WAY} from '../../../../values/strings';
import CandidateFeedback from './CandidateFeedback';
import InterviewerFeedback from './InterviewerFeedback';

const SubmitTwoWayInterview = props => {
  const baseViewRef = useRef(null);

  const interviewType = useSelector(state => state.home.interviewType);

  useEffect(() => {
    init();
    return () => {};
  }, []);

  const init = () => {};

  const _onSubmit = () => {
    console.log('[SubmitTwoWayInterview.js] On Submit : ', props);
    props.navigation.replace('Splash');
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      // hasBack
      // onBackPress={() => _onBack()}
      title={'SUBMIT 2-WAY'}>
      {interviewType === INTERVIEWER && (
        <InterviewerFeedback {...props} onSubmit={() => _onSubmit()} />
      )}

      {interviewType === TWO_WAY && (
        <CandidateFeedback onSubmit={() => _onSubmit()} />
      )}
    </BaseView>
  );
};

export default SubmitTwoWayInterview;
