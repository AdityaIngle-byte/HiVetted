import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../../values/fonts';
import ButtonView from './ButtonView';

const NoDataView = props => {
  return (
    <View style={[styles.parent, props.parentStyle]}>
      {/* {
                props.hasImage
                &&
                <Image 
                    source={images.noJobsImage}
                    style={[styles.image,props.imageStyle]}
                    resizeMode='contain'
                />
            } */}
      <Text style={styles.msg}>{props.msg}</Text>
      {props.hasTryAgain && (
        <ButtonView
          title={props.buttonTitle ? props.buttonTitle : 'Try Again'}
          onPress={props.onTryAgain}
          containerStyle={{flexWrap: 'wrap', alignSelf: 'center'}}
        />
      )}
    </View>
  );
};

export default NoDataView;

const styles = StyleSheet.create({
  parent: {},
  msg: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
    fontFamily: fonts.notoSans600,
  },
  image: {
    height: 144,
    width: 144,
    alignSelf: 'center',
  },
});
