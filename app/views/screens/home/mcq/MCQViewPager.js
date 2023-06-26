import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import BaseView from '../../../hoc/BaseView';

const MCQViewPager = () => {
  const baseViewRef = useRef(null);

  return (
    <BaseView>
      <View>
        <Text>MCQViewPager</Text>
      </View>
    </BaseView>
  );
};

export default MCQViewPager;

const styles = StyleSheet.create({});
