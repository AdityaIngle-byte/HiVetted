import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import HeaderModal from '../components/HeaderModal';
import MyStatusBar from '../components/MyStatusBar';
import MCQItem from './items/MCQItem';
import {fonts} from '../../values/fonts';
import {colors} from '../../values/colors';
import {SCREEN_WIDTH} from '../../values/dimens';

const MCQListModal = props => {
  const {isVisible, onClose, list, onItemPress} = props;

  // console.log('[MCQListModal.js] init => ', list);

  const _renderItem = ({item, index}) => {
    // console.log('[MCQListModal.js] item : ', item);
    const selected = item.options.filter(it => it.selected).length > 0;
    return (
      <View
        style={[
          styles.itemView,
          {backgroundColor: selected ? colors.success : '#e5e5e5'},
        ]}>
        <Text style={[styles.itemText, {color: selected ? '#fff' : '#888'}]}>
          {index + 1}
        </Text>
      </View>
    );
  };

  // <MCQItem item={item} index={index} onPress={() => onItemPress(index)} />
  return (
    <ReactNativeModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      // onBackdropPress={onClose}
      style={{
        alignSelf: 'flex-end',
        width: '75%',
        height: '100%',
        padding: 0,
        margin: 0,
      }}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}>
      <View style={styles.parent}>
        <MyStatusBar statusBarColor={'#fff'} />
        <HeaderModal title={'Questions'} onBackPress={onClose} />

        <FlatList
          data={list}
          renderItem={_renderItem}
          contentContainerStyle={{paddingBottom: 32}}
          numColumns={3}
        />
      </View>
    </ReactNativeModal>
  );
};

export default MCQListModal;

const width = ((SCREEN_WIDTH * 75) / 100 - 64) / 3;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemView: {
    height: 64,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginLeft: 16,
    marginBottom: 16,
  },
  itemText: {
    fontSize: 24,
    fontFamily: fonts.notoSans700,
  },
});
