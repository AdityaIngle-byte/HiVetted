import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { colors } from '../../values/colors';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 40 : StatusBar.currentHeight;

export default MyStatusBar = props => (
    <View style={[{height: STATUSBAR_HEIGHT,}, { backgroundColor : props.statusBarColor ? props.statusBarColor : colors.primary}]}>
        <StatusBar translucent backgroundColor={props.statusBarColor} barStyle='light-content'/>
    </View>
  );