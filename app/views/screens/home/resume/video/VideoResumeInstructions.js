import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import BaseView from '../../../../hoc/BaseView';
import VideoResumeInstructionItem from '../items/VideoResumeInstructionItem';
import ButtonView from '../../../../components/ButtonView';
import { IS_TABLET } from '../../../../../values/dimens';

const VideoResumeInstructions = props => {
  const baseViewRef = useRef(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {});

  const _onAddScript = () => {
    props.navigation.goBack();
    props.navigation.navigate('CreateScript');
    // alert('Hi')
  };

  return (
    <BaseView
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Instructions"
      navigation={props.navigation}
      hasNotification
      ref={baseViewRef}>
      <View style={styles.parent}>
        <ScrollView>
          <Text style={styles.heading}>Do this:</Text>
          {doThis.map(it => {
            return (
              <VideoResumeInstructionItem key={index.toString()} item={it} />
            );
          })}
          <Text style={styles.heading}>Don't do this:</Text>
          {dontDoThis.map(it => {
            return (
              <VideoResumeInstructionItem key={index.toString()} item={it} />
            );
          })}
        </ScrollView>
        {/* </ViewPager>
            <Indicators 
                list={[...doThis,...dontDoThis]}
                selectedIndex={index}
            /> */}
        <View style={styles.bottomView}>
          <ButtonView
            title={'Create Teleprompt Script'}
            containerStyle={{width: '100%'}}
            onPress={() => _onAddScript()}
          />

          {/* <TouchableOpacity>
                    <Text style={styles.label}>Record Resume without Script</Text>
                </TouchableOpacity> */}
        </View>
      </View>
    </BaseView>
  );
};

export default VideoResumeInstructions;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomView: {
    marginHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  heading: {
    fontFamily: fonts.notoSansBold,
    fontSize: IS_TABLET ? 40 : 24,
    color: colors.accent,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

const doThis = [
  {
    id: 'vr1',
    title: '1. Be professional',
    description:
      "Dress as you would for an interview and maintain a professional demeanor. Avoid slang and, of course, cursing. Be cautious when it comes to jokes. What's funny to you may not make others laugh. ",
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr2',
    title: '2. Find a good background',
    description:
      "Pay attention to the background of shots: make sure it looks tidy and that there are no noises in the background. You'll also want to make sure the lighting is good. A shadow across half of your face can be distracting. ",
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr3',
    title: '3. Prepare a script',
    description:
      "Don't ad-lib your video. You want to seem natural and off the cuff, but should have a sense of what you want to say and how you want to phrase it. Do not read directly from a script or from your resume, as that leads to a dull video. Think of the video as a pitch for why a particular company should hire you. As such, your main objective should be to express what benefits you'll provide the company, as well as your goals, skills, and accomplishments. ",
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr4',
    title: '4. Know your audience',
    description:
      'As you plan your script and filming location, consider who will watch the video and calibrate accordingly. For instance, a video prepared for a position at a bank might differ from a video created for a start-up.',
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr5',
    title: "5. Show, don't tell",
    description:
      "Use visuals to illustrate what you're saying in the video script, ones that showcase your talents and skills. For instance, if you're applying for a job where presentations are a significant part of the role, you can film B-roll of yourself assembling a PowerPoint. If any of your presentations were recorded, use that footage in your video resume.",
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr6',
    title: '6. Keep it brief',
    description:
      'Videos should be between 30 and 120 seconds. Anything longer than that is unlikely to be watched.',
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr7',
    title: '7. Share with friends and family',
    description:
      'Getting feedback from others is an important step. Ask a few people to watch your video, and make edits and changes based on their comments. ',
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
];

const dontDoThis = [
  {
    id: 'vr1',
    title: '1. Use of slang words and jargon',
    description:
      'One of the biggest no-nos of a video resume is using slang words or jargon. This may be perceived as disrespectful and lessen your chances to be shortlisted.',
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr2',
    title: "2. Don't mix your personal life with your professional one",
    description:
      " If you have information on your Facebook or Twitter page that you'd prefer employers don't see, don't link your video resume to them.",
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
  {
    id: 'vr3',
    title:
      "3. Don't expect your video resume to replace your traditional resume",
    description:
      'Not all employers are interested in a video resume, and others are worried about discrimination issues, such as hiring candidates because of how they look and sound rather than their qualifications. However, a well-done video can bolster your candidacy for employment. ',
    // image: require('../../../../assets/images/1wayinterview.png'),
  },
];
