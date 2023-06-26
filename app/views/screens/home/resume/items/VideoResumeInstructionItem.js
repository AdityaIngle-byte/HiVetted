import React from 'react';
import {Image} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../../../../../values/colors';
import { IS_TABLET } from '../../../../../values/dimens';
import {fonts} from '../../../../../values/fonts';

const VideoResumeInstructionItem = props => {
  const {item, key} = props;

  return (
    <View
      // key={key}
      style={styles.parent}>
      <Text style={styles.title}>{item.title}</Text>
      {/* <Image 
                style={styles.image}
                source={item.image}
                resizeMode='contain'
            /> */}
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

export default VideoResumeInstructionItem;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    paddingVertical: 12,
  },
  title: {
    fontSize: IS_TABLET ? 20 : 14,
    fontFamily: fonts.notoSans700,
    color: colors.primary,
  },
  description: {
    fontSize: IS_TABLET ? 16 : 10,
    fontFamily: fonts.notoSans400_2,
    color: colors.defaultTextColor,
  },
  image: {
    height: 360,
    width: '100%',
  },
});
