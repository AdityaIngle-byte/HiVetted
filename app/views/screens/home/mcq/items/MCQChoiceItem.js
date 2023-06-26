import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../values/fonts';
import {colors} from '../../../../../values/colors';
import {Icon} from 'react-native-elements';
import {IS_TABLET} from '../../../../../values/dimens';

const MCQChoiceItem = props => {
  const {item, index, onPress} = props;

  const bgColor = item.selected ? colors.primary : '#e0e0e0';
  const textColor = item.selected ? '#e0e0e0' : colors.primary;

  return (
    <TouchableOpacity
      style={{marginTop: IS_TABLET ? 24 : 24}}
      onPress={onPress}>
      <View style={[styles.parent, {backgroundColor: bgColor}]}>
        {item.selected && (
          <Icon
            name="check"
            type="entypo"
            color={textColor}
            containerStyle={{marginRight: 8}}
          />
        )}
        <Text style={[styles.question, {color: textColor}]}>{item.option}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MCQChoiceItem;

const styles = StyleSheet.create({
  parent: {
    paddingHorizontal: IS_TABLET ? 24 : 16,
    paddingVertical: IS_TABLET ? 24 : 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap:'wrap'
  },
  question: {
    fontSize: IS_TABLET ? 20 : 14,
    fontFamily: fonts.notoSans400_2,
  },
});
