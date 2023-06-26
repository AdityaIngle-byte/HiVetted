import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Collapsible from 'react-native-collapsible';
import { IS_TABLET, SCREEN_WIDTH } from '../../../../../values/dimens';
import {fonts} from '../../../../../values/fonts';
import HeaderModal from '../../../../components/HeaderModal';
import PlusMinusView from '../../../../components/PlusMinusView';

const CameraFontsView = props => {
  const {isCollapsed} = props;

  return (
    <Collapsible 
        collapsed={isCollapsed}
        // style={{position: 'absolute',right:0}}
    >
      <View style={styles.collapsedView}>
        <HeaderModal
          title="Teleprompt Settings"
          onBackPress={props.onCross}
          parent={{borderTopLeftRadius: 8, borderTopRightRadius: 8,backgroundColor:'#fff'}}
        />

        <View style={[styles.row2]}>
          <Text style={styles.text}>Font Size</Text>
          <PlusMinusView
            onMinus={props.onFontSizeDecrease}
            value={props.fontSize}
            onPlus={props.onFontSizeIncrease}
          />
        </View>
        <View
          style={[
            styles.row2,
            {borderBottomLeftRadius: 8, borderBottomRightRadius: 8},
          ]}>
          <Text style={styles.text}>Motion</Text>
          <PlusMinusView
            onMinus={props.onFontSpeedDecrease}
            value={`${props.fontSpeed}x`}
            onPlus={props.onFontSpeedIncrease}
          />
        </View>
      </View>
    </Collapsible>
  );
};

export default CameraFontsView;

const styles = StyleSheet.create({
  collapsedView: {
    // marginHorizontal:16,
    marginBottom: 8,
    // borderRadius : 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
    marginTop: 12,
    width : IS_TABLET ? 480 : 360,
    alignSelf:'flex-end',
    // position: 'absolute',right:0
  },
  text: {
    fontFamily: fonts.notoSans600,
    color: '#888',
    fontSize:  IS_TABLET ? 20 : 16,
  },
  row2: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    height:  IS_TABLET ? 84 : 64,
    // borderRadius:8
  },
});
