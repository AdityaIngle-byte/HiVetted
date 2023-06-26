import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../values/colors';
import {IS_TABLET} from '../../values/dimens';
import {fonts} from '../../values/fonts';
// import { fonts } from '../../values/fonts';

const HeaderModal = props => {
  const {title, onBackPress} = props;

  // const [userImage, setUserImage] = useState('')

  return (
    <View style={[styles.parent, props.parent]}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.headerView} onPress={onBackPress}>
        <Icon
          name={'close'}
          type={'antdesign'}
          color={'#000'}
          size={IS_TABLET ? 40 : 24}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderModal;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
    // backgroundColor:'#e0e0e0',
    height: IS_TABLET ? 72 : 48,
    // paddingRight:16
  },
  headerView: {
    // position: 'absolute',
    padding: IS_TABLET ? 16 : 8,
    marginLeft: 16,
    // left:0,
    // zIndex: 100
  },
  title: {
    fontSize: IS_TABLET ? 32 : 20,
    // fontWeight:'800',
    flex: 1,
    paddingLeft: 16,
    color: '#000',
    fontFamily: fonts.notoSans700,
  },
  userImage: {
    height: 48,
    width: 48,
    backgroundColor: '#e0e0e0',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
