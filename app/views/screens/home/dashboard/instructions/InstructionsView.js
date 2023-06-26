import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {Fragment, useEffect, useRef, useState} from 'react';
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
import {IS_TABLET} from '../../../../../values/dimens';
import {
  mcqInstructions,
  mcqNote,
  oneWayInstructions,
  oneWayNote,
} from '../../../../../json/instructions';
import CheckView from '../../../../components/CheckView';

const InstructionsView = props => {
  const baseViewRef = useRef(null);
  const {questionsList}=props;
  // const interviewType = useSelector(state => state.home.interviewType);
  const userPrefs = useSelector(state => state.login.userPrefs);

  const [isChecked, setIsChecked] = useState(false);

  // let type = '';
  // if (interviewType !== null) {
  //   if (interviewType === MCQ) type = 'MCQ Interview';
  //   else if (interviewType === ONE_WAY) type = '1-Way Interview';
  //   else if (interviewType === TWO_WAY) type = '2-Way Interview';
  //   else type = interviewType;
  // }

  useEffect(() => {
    _init();

    return () => {};
  }, []);

  const _init = () => {};

  const _renderInstruction = ({item, index}) => {
    return (
      <Text style={styles.itemText}>
        {index + 1}. {item}
      </Text>
    );
  };

  return (
    <BaseView ref={baseViewRef}>
      {userPrefs.testAssign !== undefined && (
        <Fragment>
          <ScrollView
            style={{flex: 1, paddingTop: 16}}
            contentContainerStyle={{paddingBottom: 48}}>
            <Text style={[commonStyles.heading]}>Instructions</Text>
            <View style={commonStyles.bar} />
            {userPrefs.testAssign.testCategory!='General'?
              <Text style={[commonStyles.description]}>
                In this assessment there are{' '}
                <Text style={{fontFamily: fonts.notoSans700}}>
                  {questionsList.length} question(s)
                </Text>{' '}
                for you to answer. {userPrefs.testAssign.testCategory == 'OneWay'?'All questions will require you to record a response with Video and Audio..':'You are required to select the correct answer from the given choices...'}
                {'\n'}
                {'\n'}This assessment will have{' '}
                <Text style={{fontFamily: fonts.notoSans700}}>
                  {userPrefs.testAssign.details.duration} min
                </Text>{' '}
                of time limit, you are advised to complete the assessment within
                time limit. {'\n'}
                {'\n'}We suggest to take practice test in order to get familiarity
                with the assessment process. We wish you good luck for the
                assessment.
              </Text>
            :
            <Text style={[commonStyles.description]}> 
              This assessment will comprise of  <Text style={{fontFamily: fonts.notoSans700}}>All Type Questions:</Text> MCQ, OneWay and Multiline. There will be a <Text style={{fontFamily: fonts.notoSans700}}>timer</Text> which will begin along with the assessment (Prime timer for the test at top-right corner). You will have only <Text style={{fontFamily: fonts.notoSans700}}>one take</Text> to attempt the assessment. The other details related to the assessment are mentioned below.
              {'\n'} {'\n'} 
              <Text style={styles.bullet}>{'\u2022'} </Text>
              Candidate needs to attempt each question to proceed to the next question.
              {'\n'}
              <Text style={styles.bullet}>{'\u2022'} </Text>
              Candidate cannot go back to the previous question.
              {'\n'}
              <Text style={styles.bullet}>{'\u2022'} </Text>
              If the test is not submitted due to any hardware/software/internet failure at candidate end, then the result will not be processed, and you will be marked absent.
              {'\n'}
              <Text style={styles.bullet}>{'\u2022'} </Text>
              Once the final submission is done, you will not be able to take up the assessment again.
              {'\n'} {'\n'} 
              <Text style={{fontFamily: fonts.notoSans700}}>For MCQ Question</Text>{'\n'}
              The candidate needs to select the right option from the multiple choices given with each question. Each question has multiple (2 or more) options, and the candidate has to select the correct option.{'\n'}{'\n'}
              <Text style={{fontFamily: fonts.notoSans700}}>For OneWay Question</Text>{'\n'}
              For each question, there will be allowable time to submit the response and will be displayed below the recording screen after the test has started. The recording will stop automatically after maximum time limit has reached.{'\n'}{'\n'}
              <Text style={{fontFamily: fonts.notoSans700}}>For Multiline Question</Text>{'\n'}
              Candidate needs to write the descriptive answer in the text box.
            </Text>
            }
            {/* <FlatList
              data={
                userPrefs.testAssign.testCategory === 'MCQ'
                  ? mcqInstructions
                  : oneWayInstructions
              }
              renderItem={_renderInstruction}
              showsVerticalScrollIndicator={false}
              // style={{flexWrap:'wrap'}}
            />

            <View style={styles.noteView}>
              <Text style={[styles.noteText]}>
                Note:{' '}
                <Text style={{fontFamily: fonts.notoSans400_2}}>
                  {userPrefs.testAssign.testCategory === 'MCQ'
                    ? mcqNote
                    : oneWayNote}
                </Text>
              </Text>
            </View> */}

            {/* {interviewType === MCQ ? (
            <View style={styles.row}>
              <Icon
                name={'question-answer'}
                type={'material'}
                color={colors.primary}
              />
              <Text style={[styles.text]}>
                {userPrefs.testAssign.questions.length} questions
              </Text>
            </View> */}
            {/* ) : (
          <View style={styles.row}>
            <Icon name={'video'} type={'feather'} color={colors.primary} />
            <Text style={styles.text}>6 video questions</Text>
          </View>
        )} */}
        <View style={styles.warningUIModal}>
          <View style={styles.warningUIHeader}>
              <Icon
                name={'alert-triangle'}
                type={'feather'}
                color={colors.primary}
                size={20}
              />
            <Text style={styles.warningUITitle}>Warning</Text>
          </View>
          <View>
            <Text style={styles.warningUIBody}>During the assessment,interaction with other applications,or screen changes is strictly prohibited.Otherwise,your test will get submitted automatically.</Text>
          </View>
        </View>
          </ScrollView>
          <CheckView
            title={'I have read and understood the instructions'}
            checked={isChecked}
            onPress={() => setIsChecked(prevState => !prevState)}
          />
          <ButtonView
            title={'Start'}
            containerStyle={{margin: 16}}
            onPress={props.onContinue}
            disabled={!isChecked}
          />
        </Fragment>
      )}
    </BaseView>
  );
};

export default InstructionsView;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: IS_TABLET ? 32 : 16,
    marginTop: 16,
  },
  warningUIModal:{
    padding:10,
    margin:6,
    marginHorizontal:12,
    backgroundColor:'lightyellow',
  },
  warningUIHeader:{
    flexDirection:"row",
    alignItems:"center"
  },
  text: {
    fontSize: IS_TABLET ? 18 : 16,
    color: colors.primary,
    fontFamily: fonts.notoSans700,
    marginLeft: IS_TABLET ? 18 : 12,
  },
  itemText: {
    fontSize: IS_TABLET ? 18 : 12,
    // color: '#fff',
    // marginTop:36,
    fontFamily: fonts.notoSans400_2,
    // textAlign: 'center',
    // paddingTop:8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    // borderBottomWidth: 0.5,
    // borderBottomColor:'#e0e0e0'
  },
  noteView: {
    backgroundColor: '#ff333333',
    margin: 16,
    padding: 8,
    borderRadius: 4,
  },
  noteText: {
    fontSize: IS_TABLET ? 18 : 12,
    // color: '#fff',
    // marginTop:36,
    fontFamily: fonts.notoSans700,
    // textAlign: 'center',
    // paddingTop:8,
  },
  bullet:{
    fontWeight:"bold",
    fontSize:20
  },
  warningUITitle:{
    fontWeight:'bold',
    fontSize:16,
    marginLeft:2,
  },
  warningUIBody:{
    fontWeight:'bold',
    marginTop:10,
    fontFamily:fonts.notoSans700
  }
});
