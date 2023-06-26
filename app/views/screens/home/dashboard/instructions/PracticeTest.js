import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import BaseView from '../../../../hoc/BaseView';
import UsersView from '../items/UsersView';
import {images, instructions} from '../../../../../assets/images';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import {useSelector} from 'react-redux';
import {MCQ, ONE_WAY, TWO_WAY} from '../../../../../values/strings';
import {commonStyles} from './commonStyles';
import ButtonView from '../../../../components/ButtonView';
import {Icon} from 'react-native-elements';

const PracticeTest = props => {
  const baseViewRef = useRef(null);

  useEffect(() => {
    _init();

    return () => {};
  }, []);

  const _init = () => {};

  return (
    <BaseView ref={baseViewRef}>
      <ScrollView
        style={{flex: 1, paddingTop: 16}}
        contentContainerStyle={{paddingBottom: 48}}>
        <Text style={commonStyles.heading}>Practice First</Text>
        <View style={commonStyles.bar} />
        <Text style={commonStyles.description}>
          Remember, you can practice as many times as you need to feel
          comfortable.
        </Text>
        <Image
          source={instructions.imagePractice}
          style={commonStyles.image}
          resizeMode="contain"
        />
      </ScrollView>
      <ButtonView
        title={'Practice'}
        containerStyle={{margin: 16}}
        onPress={props.onPractice}
      />
      <ButtonView
        title={'Skip'}
        containerStyle={{marginHorizontal: 16, marginBottom: 16}}
        onPress={props.onContinue}
        outline
      />
    </BaseView>
  );
};

export default PracticeTest;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  text: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: fonts.notoSans400_2,
    marginLeft: 12,
  },
});
