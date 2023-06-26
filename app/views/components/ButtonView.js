import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '../../values/colors';
import { IS_TABLET } from '../../values/dimens';
import { fonts } from '../../values/fonts';

const ButtonView = props => {
  const {
    title,
    containerStyle,
    buttonStyle,
    titleStyle,
    onPress,
    iconRight,
    iconLeft,
    outline,
    size,
  } = props;

  const bgColor = outline ? '#fff' : colors.primary;
  const textColor = outline ? colors.primary : '#fff';

  let height = IS_TABLET ? 64 : 48;
  let fontSize = IS_TABLET ? 28 : 16;

  if (size === 'small') {
    height = IS_TABLET ? 48 : 28;
    fontSize = IS_TABLET ? 16 : 12;
  } else if (size === 'medium') {
    height = IS_TABLET ? 56 : 36;
    fontSize = IS_TABLET ? 20 : 14;
  }

  return (
    <Button
      title={title}
      titleStyle={[
        styles.titleStyle,
        { color: textColor, fontSize: fontSize },
        titleStyle,
      ]}
      containerStyle={[styles.containerStyle, { height: height }, containerStyle]}
      buttonStyle={[
        styles.buttonStyle,
        { backgroundColor: bgColor, height: height, },
        buttonStyle,
      ]}
      onPress={onPress}
      iconRight={iconRight}
      iconLeft={iconLeft}
      icon={props.icon}
      disabled={props.disabled}
      disabledStyle={[{ borderColor: '#888' }, props.disabledStyle]}
      disabledTitleStyle={[{ color: '#888' }, props.disabledTitleStyle]}
    />
  );
};

export default ButtonView;

const styles = StyleSheet.create({
  containerStyle: {
    // height:48,
    // borderRadius:24
    // marginTop:20,
    // alignItems:'center',
    // justifyContent : 'center'
  },
  buttonStyle: {
    // height:48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    padding: 0,
    // alignSelf:'center'
    justifyContent: 'center'
  },
  titleStyle: {
    // fontFamily: fonts.notoSans600,
    fontSize: 16,
    // textAlign:'center',
    // paddingRight:24,
    // alignSelf:'center'
  },
});
