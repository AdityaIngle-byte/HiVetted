import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import {colors} from '../../values/colors';
import MyStatusBar from '../components/MyStatusBar';
import HeaderView from '../components/HeaderView';
import Loader from './Loader';
import NetInfo from '@react-native-community/netinfo';
import {fonts} from '../../values/fonts';

export default class BaseView extends Component {
  state = {
    loader: false,
    isRefreshing: false,
    internetData: null,
  };

  componentDidMount = () => {
    // this.isTablet();
    this.unsubscribe = NetInfo.addEventListener(state => {
      // console.log('Connection type', state);
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  isTablet = () => {
    // console.log('[BaseView.js] isTablet : ', deviceInfoModule.isTablet());
    // alert(SCREEN_WIDTH)
    // return deviceInfoModule.isTablet();
  };

  showLoader = () => {
    this.setState({
      loader: true,
    });
  };

  hideLoader = () => {
    this.setState({
      loader: false,
    });
  };

  showRefreshing = () => {
    this.setState({
      isRefreshing: true,
    });
  };

  hideRefreshing = () => {
    this.setState({
      isRefreshing: false,
    });
  };

  render() {
    const {
      hasStatusBar,
      statusBarColor,
      headerParentStyle,
      hasHeader,
      parentStyle,
      children,
    } = this.props;
    const {loader, internetData} = this.state;

    return (
      <View style={[styles.safeAreaView, parentStyle]}>
        {hasStatusBar && (
          <MyStatusBar
            statusBarColor={statusBarColor ? statusBarColor : colors.primary}
          />
        )}
      
        {hasHeader && <HeaderView {...this.props} />}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{flex: 1}}>
          {children}
        </KeyboardAvoidingView>

        <Loader loader={loader} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  view: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  netText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: fonts.notoSans600,
  },
});
