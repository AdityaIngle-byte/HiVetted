import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {images} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import { IS_TABLET } from '../../../../../values/dimens';
import {fonts} from '../../../../../values/fonts';

const ProfileTitleView = props => {
  const {
    hasIcon,
    hasCheckIcon,
    checked,
    onCheckPress,
    iconName,
    iconType,
    iconColor,
    title,
    onPress,
    children,
    arrowColor,
  } = props;

  return (
    <View style={[styles.parent, props.parentStyle]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.row}>
          <Icon
            name={iconName}
            type={iconType}
            color={iconColor ? iconColor : colors.primary}
            size={IS_TABLET ? 40 : 20}
          />
          
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onCheckPress}>
            <Image
              source={checked ? images.check : images.unCheck}
              style={[styles.image]}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default ProfileTitleView;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
    // marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    // height: IS_TABLET ? 72 : 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: IS_TABLET ? 24 : 16,
    fontFamily: fonts.notoSans400_2,
    color: colors.primary,
    paddingLeft: 12,
    flex: 1,
  },
  image: {
    height: IS_TABLET ? 32 : 16,
    width: IS_TABLET ? 48 : 24,
  },
});
