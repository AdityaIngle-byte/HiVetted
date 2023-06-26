import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BaseView from '../../../../hoc/BaseView';
import UsersView from '../items/UsersView';
import {images, instructions} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import {useSelector} from 'react-redux';
import {MCQ, ONE_WAY, TWO_WAY} from '../../../../../values/strings';
import {commonStyles} from './commonStyles';
import ButtonView from '../../../../components/ButtonView';
import {Icon} from 'react-native-elements';
import {Fragment} from 'react';

const BeginTest = props => {
  const baseViewRef = useRef(null);

  const userPrefs = useSelector(state => state.login.userPrefs);

  useEffect(() => {
    _init();
    return () => {};
  }, []);

  const _init = () => {};

  return (
    <BaseView ref={baseViewRef}>
      {userPrefs.testAssign !== undefined && (
        <Fragment>
          <ScrollView
            style={{flex: 1, paddingTop: 16}}
            contentContainerStyle={{paddingBottom: 48}}>
            <Text style={commonStyles.heading}>Are you ready?</Text>
            <View style={commonStyles.bar} />

            <Text style={commonStyles.description}>
              In this interview there are{' '}
              <Text
                style={{fontFamily: fonts.notoSans700, color: colors.accent}}>
                {userPrefs.testAssign.questions.length} questions
              </Text>{' '}
              for you to answer.
              {props.has1WayQuestions &&
                `Some of the questions will require you to
              record a response with video.
              Each question will have its own time limit.
              `}
              {'\n\n'}
              Once you submit your answer, you cannot change it and you will be
              taken to the next question
            </Text>
            <Image source={instructions.begin} style={commonStyles.image} />
          </ScrollView>
          <ButtonView
            title={'Begin'}
            containerStyle={{margin: 16}}
            onPress={props.onBegin}
          />
          <ButtonView
            title={'Go Back to Practice'}
            containerStyle={{marginHorizontal: 16, marginBottom: 16}}
            onPress={props.onGoBackToPractice}
            outline
          />
        </Fragment>
      )}
    </BaseView>
  );
};

export default BeginTest;
