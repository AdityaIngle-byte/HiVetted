import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { IS_TABLET } from '../../values/dimens';
import {fonts} from '../../values/fonts';

const PlusMinusView = props => {
  return (
    <View style={styles.parent}>
      <TouchableOpacity style={styles.view} onPress={props.onMinus}>
        <Text style={styles.title}>-</Text>
      </TouchableOpacity>
      <View style={styles.titleView}>
        <Text style={styles.title}>{props.value}</Text>
      </View>
      <TouchableOpacity style={styles.view} onPress={props.onPlus}>
        <Text style={styles.title}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlusMinusView;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    height:  IS_TABLET ? 48 : 32,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    borderRadius: 4,
  },
  view: {
    height: IS_TABLET ? 48 : 32,
    width: IS_TABLET ? 48 : 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    height:  IS_TABLET ? 48 : 30,
    width:  IS_TABLET ? 48 : 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: '#c4c4c4',
    borderRightColor: '#c4c4c4',
  },
  title: {
    fontSize:  IS_TABLET ? 24 : 16,
    fontFamily: fonts.notoSans600,
    color: '#888',
  },
});
