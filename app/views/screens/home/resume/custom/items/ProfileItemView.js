import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../../../values/colors';
import {fonts} from '../../../../../../values/fonts';

const ProfileItemView = props => {
  const {hasIcon, iconName, iconType, iconSize, value} = props;

  return (
    <View style={styles.parent}>
      {hasIcon && (
        <Icon
          name={iconName}
          type={iconType}
          size={iconSize ? iconSize : 12}
          color={colors.defaultTextColor}
          containerStyle={{marginRight: 8}}
        />
      )}
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default ProfileItemView;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flex: 1,
  },
  value: {
    fontSize: 12,
    color: colors.defaultTextColor,
    fontFamily: fonts.notoSans400_2,
  },
});
