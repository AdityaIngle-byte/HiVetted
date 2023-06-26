import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../values/fonts';
import {colors} from '../../../values/colors';
import {IS_TABLET} from '../../../values/dimens';

const MCQItem = props => {
  const {item, index, onPress} = props;

  let bgColor = '#e0e0e0';

  const filteredList = item.options.filter(it => it.selected);
  if (filteredList.length > 0) {
    bgColor = colors.success;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{marginTop: 16}}
      activeOpacity={0.7}>
      <View style={[styles.parent, {backgroundColor: bgColor}]}>
        <Text style={styles.text}>
          {index + 1}. {item.question}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MCQItem;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: IS_TABLET ? 24 : 12,
    paddingVertical: IS_TABLET ? 16 : 8,
  },
  text: {
    fontFamily: fonts.notoSans600,
    color: colors.defaultTextColor,
    fontSize: IS_TABLET ? 20 : 14
  },
});
