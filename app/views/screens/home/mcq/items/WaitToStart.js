import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {images} from '../../../../../assets/images';
import BaseView from '../../../../hoc/BaseView';
import {fonts} from '../../../../../values/fonts';
import {colors} from '../../../../../values/colors';
import CountDown from 'react-native-countdown-component';
import ButtonView from '../../../../components/ButtonView';
import {IS_TABLET} from '../../../../../values/dimens';

const WaitToStart = props => {
  const [isTimerStopped, setIsTimerStopped] = useState(true);

  return (
    <BaseView>
      <View style={styles.parent}>
        <Image
          style={styles.logo}
          source={images.high5LogoBlue}
          resizeMode="contain"
        />
        <Text style={styles.text1}>{props.text}</Text>
        <View style={styles.timeView}>
          <CountDown
            until={8}
            onFinish={props.onTimerFinish}
            size={IS_TABLET ? 64 : 32}
            timeToShow={['S']}
            timeLabels={{s: ''}}
            digitStyle={{backgroundColor: 'transparent'}}
            timeLabelStyle={{backgroundColor: 'green'}}
            digitTxtStyle={{
              color: '#fff',
              fontFamily: fonts.notoSans700,
              fontSize: IS_TABLET ? 32 : 28,
            }}
            // onPress={() => alert('hello')}
            running={isTimerStopped}
          />
        </View>
      </View>
      <ButtonView
        title={'Cancel'}
        containerStyle={{margin: 24}}
        onPress={props.onCancel}
      />
    </BaseView>
  );
};

export default WaitToStart;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 72,
  },
  logo: {
    height: 172,
    width: '50%',
    marginBottom: 48,
  },
  text1: {
    fontFamily: fonts.notoSans600,
    fontSize: IS_TABLET ? 18 : 14,
  },
  timeView: {
    height: IS_TABLET ? 144 : 96,
    width: IS_TABLET ? 144 : 96,
    backgroundColor: colors.accent,
    borderRadius: IS_TABLET ? 72 : 60,
    marginTop: IS_TABLET ? 24 : 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
