import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../values/colors';
import {fonts} from '../../values/fonts';

const PickerView = props => {
  const {
    parentStyle,
    hasIcon,
    iconName,
    iconType,
    iconColor,
    label,
    isRequired,
    requiredColor,
    error,
    touched,
    errorColor,
    onPress,
    value,
    required
  } = props;

  return (
    <View style={[styles.parent, parentStyle]}>
      <Text style={[styles.label]}>{label}{required==true?<Text style={styles.errorStar}> *</Text>:null}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={[props.pickerStyle]}
        disabled={props.disabled}>
        <View style={styles.row}>
          <Text style={styles.value}>{value}</Text>
          <Icon name="arrow-drop-down" type="material" />
        </View>
      </TouchableOpacity>
      {error && touched && (
        <Text
          style={[
            styles.error,
            {color: errorColor ? errorColor : colors.alert},
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default PickerView;

const styles = StyleSheet.create({
  parent: {
    // flex:1,
  },
  row: {
    height: 48,
    // borderColor:'#C4c4c4',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#888',
    borderRadius: 4,
    // backgroundColor: '#fff',
    // marginTop:4
  },
  label: {
    fontFamily: fonts.notoSans400_2,
    fontSize: 12,
    color: '#888',
    // position: 'absolute',
    // paddingLeft: 8,
    marginBottom:4
    // zIndex: 100,
    // paddingTop: 4,
  },
  value: {
    fontFamily: fonts.notoSans600,
    fontSize: 14,
    flex: 1,
    paddingLeft: 6,
  },
  error: {
    fontFamily: fonts.notoSans400_2,
    fontSize: 12,
    paddingLeft: 8,
  },
  errorStar:{
    color: '#f33',
  }
});
