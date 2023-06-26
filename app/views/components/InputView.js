import {StyleSheet, Text, View,Platform, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput,useColorScheme} from 'react-native';
import {colors} from '../../values/colors';
import {IS_TABLET} from '../../values/dimens';
import {fonts} from '../../values/fonts';
import { NetInfoCellularGeneration } from '@react-native-community/netinfo';

const InputView = props => {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    textInputStyle,
    hasLabel = true,
    error,
    touched,
    required,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const tintColor = isFocused ? colors.defaultTextColor : '#888';
  const borderColor = isFocused ? colors.defaultTextColor : '#c4c4c4';

  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={[styles.parent, props.parentStyle]}>
      {hasLabel && (
        <Text style={[styles.label, {color: tintColor}]}>{label}{required==true?<Text style={styles.errorStar}> *</Text>:null}</Text>
      )}
      <View
        style={[
          styles.view,
          // eslint-disable-next-line react-native/no-inline-styles
          {borderColor: borderColor},
          props.viewStyle,
        ]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode?'gray':placeholder}
          // placeholderTextColor='gray'
          style={[Platform.OS === 'ios' ? styles.textInput:NetInfoCellularGeneration, {color: tintColor}, textInputStyle]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && touched && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputView;

const styles = StyleSheet.create({
  parent: {
    marginTop: IS_TABLET ? 40 : 24,
  },
  label: {
    fontSize: IS_TABLET ? 16 : 12,
    marginBottom: 4,
    fontFamily: fonts.notoSans400_2,
  },
  view: {
    ...Platform.select({
      ios: {
        height: IS_TABLET ? 64 : 48,
      },
      android: {
        // flex:1,
        // height: IS_TABLET ? 64 : 37,
      },
    }),
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    fontSize: IS_TABLET ? 100 : 16,
    fontFamily: fonts.notoSans600,
  },
  error: {
    fontSize: 12,
    fontFamily: fonts.notoSans400_2,
    color: '#f33',
  },
  errorStar:{
    color: '#f33',
  }
});
