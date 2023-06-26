import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AirbnbRating, Rating} from 'react-native-elements';
import {colors} from '../../values/colors';
import { fonts } from '../../values/fonts';
import { IS_TABLET } from '../../values/dimens';

const RatingQuestion = props => {
  const {question} = props;

  return (
    <View style={styles.parent}>
      <Text style={styles.ques}>{question}</Text>
      <Rating
        type="custom"
        ratingCount={10}
        imageSize={IS_TABLET ? 36 : 24}
        fractions={1}
        style={{alignSelf: 'flex-start', paddingTop: 8}}
        tintColor={'#e0e0e0'}
        ratingColor={colors.primary}
        onStartRating={rating => {
          // alert('Rating')
          // console.log('[RatingQuestion.js] onStartRating', rating);
        }}
        onFinishRating={rating => {
          // alert('Rating')
          // console.log('[RatingQuestion.js] onFinishRating', rating);
        }}
      />
    </View>
  );
};

export default RatingQuestion;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: IS_TABLET ? 24 : 12,
    marginTop: IS_TABLET ? 32 : 16,
  },
  ques: {
    fontFamily: fonts.notoSans600,
    fontSize: IS_TABLET ? 24 : 16,
  },
});
