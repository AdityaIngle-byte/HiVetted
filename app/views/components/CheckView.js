import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CheckBox, Icon} from 'react-native-elements';
import {colors} from '../../values/colors';
import {fonts} from '../../values/fonts';

const CheckView = props => {
  return (
    <CheckBox
      title={props.title}
      checked={props.checked}
      onPress={props.onPress}
      checkedIcon={
        <Icon name="check-square" type="feather" color={colors.primary} />
      }
      uncheckedIcon={<Icon name="square" type="feather" color={'#888'} />}
      containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
      textStyle={{fontFamily: fonts.notoSans700}}
    />
  );
};

export default CheckView;

const styles = StyleSheet.create({});
