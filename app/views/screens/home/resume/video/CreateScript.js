import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import BaseView from '../../../../hoc/BaseView';
import InputView from '../../../../components/InputView';
import ButtonView from '../../../../components/ButtonView';
import {fonts} from '../../../../../values/fonts';
import {colors} from '../../../../../values/colors';
import {Icon, Overlay} from 'react-native-elements';
import Collapsible from 'react-native-collapsible';
import {IS_TABLET, SCREEN_WIDTH} from '../../../../../values/dimens';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import HeaderModal from '../../../../components/HeaderModal';
import { checkCameraAndMicrophonePermissions } from '../../../../../utils/PermissionsCheck';

const CreateScript = props => {
  const baseViewRef = useRef(null);

  const [scriptTitle, setScriptTitle] = useState('');
  const [scriptDescription, setScriptDescription] = useState(
    'Hi there! My name is John Milligan Dow, and I’d love to take a couple of minutes to tell you why hiring me as your marketing intern will benefit your organization.',
  );
  const [isDetailShow, setIsDetailShow] = useState(true);
  const [preview, setPreview] = useState(false);

  const _onBack = () => props.navigation.goBack();

  const _onSave = () => {
    if (scriptDescription.length > 0) {
      _continue();
    } else {
      showConfirmAlert(
        'Continue',
        'You have not added any script, Do you want to continue without script?',
        () => _continue(),
      );
    }
  };

  const _continue = () => {
    checkCameraAndMicrophonePermissions()
      .then(() => {
        console.log('[CreateScript.js] Success ');
        props.navigation.navigate('RecordResume', {
          title: scriptTitle,
          script: scriptDescription,
        });
      })
      .catch(error => {
        console.log('[CreateScript.js] : ', error);
      });
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => _onBack()}
      title={'Add Script'}>
      <ScrollView
        style={styles.parent}
        contentContainerStyle={{paddingBottom: 48}}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>
          Write Teleprompter script below, same will appear while recording your
          video pitch.
        </Text>
        <InputView
          label={'Script Title'}
          value={scriptTitle}
          onChangeText={text => setScriptTitle(text)}
        />
        <InputView
          label={'Script Description'}
          value={scriptDescription}
          onChangeText={text => setScriptDescription(text)}
          multiline={true}
          viewStyle={{height: 240, paddingVertical: 8}}
          textInputStyle={{height: 240, textAlignVertical: 'top'}}
          numberOfLines={100}
        />
        <View style={styles.row}>
          <ButtonView
            title={'PREVIEW'}
            containerStyle={{flex: 1, marginRight: 8}}
            buttonStyle={{
              backgroundColor: colors.accent,
              borderColor: colors.accent,
            }}
            onPress={() => {
              if (scriptDescription.length < 1) {
                showAlert('error', 'No Script Added!');
              } else {
                setPreview(true);
              }
            }}
          />
          <ButtonView
            title={'START'}
            containerStyle={{flex: 1, marginLeft: 8}}
            onPress={() => _onSave()}
          />
        </View>
        <TouchableOpacity
          style={{padding: 8}}
          onPress={() => setIsDetailShow(prevState => !prevState)}>
          <View style={styles.questionView}>
            <Text style={styles.question}>How to write script?</Text>

            <Icon
              name={isDetailShow ? 'arrow-right' : 'arrow-drop-down'}
              type="material"
              color={colors.primary}
              size={32}
            />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={isDetailShow}>
          <Text style={styles.answer}>{scriptSample}</Text>
        </Collapsible>
      </ScrollView>
      <PreviewScript
        isVisible={preview}
        scriptTitle={scriptTitle}
        script={scriptDescription}
        onClose={() => setPreview(false)}
      />
    </BaseView>
  );
};

export default CreateScript;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: IS_TABLET ? 24 : 16,
    paddingTop: 16,
  },
  title: {
    fontSize: IS_TABLET ? 20 : 14,
    fontFamily: fonts.notoSans600,
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: IS_TABLET ? 40 : 24,
  },
  questionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  question: {
    fontSize: IS_TABLET ? 24 : 16,
    fontFamily: fonts.notoSans600,
    color: colors.accent,
  },
  answer: {
    fontSize: IS_TABLET ? 16 : 12,
    fontFamily: fonts.notoSans400_2,
    color: '#888',
    paddingBottom: 12,
    paddingHorizontal: IS_TABLET ? 16 : 8,
  },
});

const scriptSample = `
Take a look at our 6 simple steps on how to write a professional video resume script. 

1. Create an elevator pitch
The first thing you should do before recording your video resume is to create an elevator pitch. Your potential employer doesn’t have hours to watch video resumes, so aim to get your pitch across in under a minute. Keep your elevator pitch short, detailed, and full of personality. 

2. Introduce yourself
Before you start talking about why your potential employer should hire you, introduce yourself. Share your name, the role you’re applying for, and why you’re making a video resume. You can even share your current job position if you’re studying, or transitioning between jobs.  

3. Discuss past professional experiences 
If you have passed professional experience in a particular field, share some highlight stories, your skills, strengths, and how you’ve overcome workplace difficult experiences. Employers are more than likely going to ask you related questions, so it’s best to share your professional experiences first. Just don’t get too personal as they don’t need to know your life story. 

4. Don’t mention past work relationships
Avoid mentioning any past workplace relationships you may have had. Don’t discuss old co-workers or past bosses. Instead, describe how you’re a team player and get along well with others. 

5. Use professional and appropriate language choices
When writing your video resume script, make sure to keep your language choices professional and workplace friendly. Adapt your script to the position or company you are applying for. If you’re going to be communicating with the public, a more casual approach will work. But if you’re applying for a corporate position that requires precise language, be mindful of not mentioning slang terms and stay professional. 

6. Write your script using bullet points
Sometimes reading a script word for word can cause a lack of engaging eye contact. Instead, use bullet points to highlight keywords and skills you would like to talk about. They’re a great method to keep eye contact and prompt you to show your true personality. 

Sample - 
Hi there! My name is John Milligan Dow, and I’d love to take a couple of minutes to tell you why hiring me as your marketing intern will benefit your organization.

Currently, I’m completing my junior year at Ohio University. I’ll be getting my Bachelor of Business Administration degree, with a major in marketing, in spring 2021. My coursework has provided me with a strong foundation in marketing, as I’ve already completed courses in the management of promotion, consumer behavior, and business information systems design.

In the last two years, I’ve been able to augment my education with hands-on experience, attained through two previous summer internships. In my first internship, I focused on the company’s website, doing analysis, design, and optimization. They saw an 11% increase in traffic by the end of the summer. My second internship, at a design agency, had me creating and distributing marketing materials, such as press releases and newsletters. Because of this, I know the basics of Adobe Creative Suite, which is a huge asset. Along with my technical skills, I’ve worked with a diversity of people in a range of roles, so I’m a true team-player. My supervisors have all praised my relationship-building and communication skills.

Finally, I simply love marketing. I love making an impact, spreading the word, and seeing the change for the business. I’m dedicated and passionate, and I guarantee that you won’t regret hiring me. Thanks so much for taking the time to listen!
`;

const PreviewScript = props => {
  const {isVisible, scriptTitle, script, onClose} = props;

  return (
    <Overlay isVisible={isVisible} onBackdropPress={onClose}>
      <View style={{width: SCREEN_WIDTH - 48, maxHeight: SCREEN_WIDTH}}>
        <HeaderModal title={'Preview'} onBackPress={onClose} />
        <Text style={[styles.question, {paddingHorizontal: 16}]}>
          {scriptTitle}
        </Text>
        <ScrollView>
          <Text style={[styles.answer, {paddingHorizontal: 16}]}>{script}</Text>
        </ScrollView>
      </View>
    </Overlay>
  );
};
