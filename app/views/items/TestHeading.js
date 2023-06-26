import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../values/colors';
import {fonts} from '../../values/fonts';
import {Icon} from 'react-native-elements';
import CountDown from 'react-native-countdown-component';
import {IS_TABLET} from '../../values/dimens';

const TestHeading = props => {
  const {
    style,
    currentQuestionIndex,
    totalQuestions,
    hasTimer,
    time,
    hasTakes,
    takes,
  } = props;

  return (
    <View style={[styles.row, style]}>
      <Text style={styles.text}>
        Question{' '}
        <Text style={{color: colors.accent, fontFamily: fonts.notoSans800}}>
          {currentQuestionIndex}
        </Text>{' '}
        of {totalQuestions}
      </Text>
      {hasTimer && (
        <View style={[styles.row, {justifyContent: 'center'}]}>
          <Icon name="clock" type="feather" color={colors.primary} size={20} />
          <CountDown
            until={time * 60}
            onFinish={() => {}}
            size={16}
            timeToShow={['M', 'S']}
            timeLabels={{m: '', s: ''}}
            digitStyle={{backgroundColor: 'transparent'}}
            digitTxtStyle={{
              color: colors.accent,
              fontFamily: fonts.notoSans700,
            }}
            showSeparator
            separatorStyle={{color: colors.accent}}
          />
        </View>
      )}
      {/* {hasTakes && (
        <Text style={styles.text}>
          Takes Left -{' '}
          <Text style={{color: colors.accent, fontFamily: fonts.notoSans800}}>
            {takes}
          </Text>
        </Text>
      )} */}
    </View>
  );
};

export default TestHeading;

const styles = StyleSheet.create({
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
});
