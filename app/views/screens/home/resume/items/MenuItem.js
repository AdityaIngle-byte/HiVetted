import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
// import {images} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {IS_TABLET} from '../../../../../values/dimens';
import {fonts} from '../../../../../values/fonts';
// import { localImagesPath } from '../../assets/src/localImagesPath'

export const MenuItem = props => {
  const {
    hasIcon,
    iconName,
    iconType,
    hasImage,
    source,
    title,
    color,
    selected,
  } = props;

  const [checked, setChecked] = useState(false);

  const tintColor = selected ? '#fff' : colors.primary;

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{marginTop: IS_TABLET ? 24 : 24}, props.style]}>
      <View
        style={[
          styles.itemView,
          {backgroundColor: selected ? colors.primary : '#fff'},
          props.parentStyle,
        ]}>
        {hasIcon && (
          <Icon
            name={iconName}
            type={iconType}
            color={tintColor}
            size={IS_TABLET ? 40 : 20}
            containerStyle={{width: IS_TABLET ? 64 : 32}}
          />
        )}
        {hasImage && (
          <Image source={source} style={styles.image} resizeMode="contain" />
        )}
        <Text style={[styles.itemTitle, {color: tintColor}, props.titleStyle]}>
          {title}
        </Text>
        {/* {props.hasCheckBox && (
          <TouchableOpacity
            onPress={() => {
              setChecked(prevState => !prevState);
              setTimeout(() => {
                props.onCheckPress(checked);
              }, 500);
            }}>
            <Image
              source={checked ? images.check : images.unchecked}
              style={styles.checkIcon}
            />
          </TouchableOpacity>
        )} */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    height: IS_TABLET ? 72 : 56,
    // width : IS_TABLET ? 72 : 48,
    flexDirection: 'row',
    paddingLeft: IS_TABLET ? 16 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: IS_TABLET ? 24 : 16,
    color: '#888',
    paddingLeft: 8,
    fontFamily: fonts.notoSans600,
    // flex: 1,
    // fontWeight:'700'
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 4,
    tintColor: colors.accent,
  },
  checkIcon: {
    height: 24,
    width: 24,
    marginRight: 4,
  },
});
