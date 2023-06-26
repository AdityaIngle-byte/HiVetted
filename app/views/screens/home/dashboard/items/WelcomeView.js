import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {images} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import {useSelector} from 'react-redux';
import {MCQ, ONE_WAY, TWO_WAY} from '../../../../../values/strings';
import { IS_TABLET } from '../../../../../values/dimens';

const WelcomeView = props => {
  const interviewType = useSelector(state => state.home.interviewType);

  let type = '';
  if (interviewType !== null) {
    if (interviewType === MCQ) {
      type = 'MCQ Interview';
    } else if (interviewType === ONE_WAY) {
      type = '1-Way Interview';
    } else if (interviewType === TWO_WAY) {
      type = '2-Way Interview';
    } else {
      type = interviewType;
    }
  }

  return (
    <View style={styles.parent}>
      <Image
        source={images.high5Icon}
        style={styles.userImage}
        resizeMode="contain"
      />
      <View style={{flex: 1, paddingLeft: 16}}>
        <Text style={styles.userName}>Welcome, Robert Cooper</Text>
        <View style={styles.view}>
          <Text style={styles.interview}>{type}</Text>
        </View>
      </View>
    </View>
  );
};

export default WelcomeView;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // marginTop:16
  },
  userImage: {
    height: IS_TABLET ? 120 : 56,
    width: IS_TABLET ? 120 : 56,
    // borderRadius:28
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontFamily: fonts.notoSans700,
  },
  interview: {
    fontSize: 12,
    color: '#f0f0f0',
    fontFamily: fonts.notoSans600,
    textTransform: 'uppercase',
  },
  view: {
    backgroundColor: colors.accent,
    // flexWrap:'wrap',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
});
