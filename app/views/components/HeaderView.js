import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../values/colors';
import {IS_TABLET} from '../../values/dimens';
import {fonts} from '../../values/fonts';
import MenuView from './MenuView';

const HeaderView = props => {
  const {
    headerParentStyle,
    hasBack,
    onBackPress,
    hasHome,
    onHomePress,
    hasTitle = true,
    title,
    hasInfo,
    onInfoPress,
    hasSettings,
    onSettingsPress,
    hasQuit,
    onQuitPress,
    hasRightComponent,
    onRightComponentPress,
    menuView,
  } = props;

  return (
    <View style={[styles.parent, headerParentStyle]}>
      {hasBack && (
        <TouchableOpacity style={styles.headerView} onPress={onBackPress}>
          <Icon
            name={'arrow-back-ios'}
            type={'material'}
            color={'#fff'}
            size={IS_TABLET ? 32 : 20}
          />
        </TouchableOpacity>
      )}
      {hasQuit && (
        <TouchableOpacity style={styles.headerView} onPress={onQuitPress}>
          <Icon
            name={'log-out'}
            type={'feather'}
            color={'#fff'}
            size={IS_TABLET ? 32 : 20}
          />
        </TouchableOpacity>
      )}
      {props.hasCustomIcon && (
        <TouchableOpacity style={styles.headerView} onPress={props.onIconPress}>
          <Icon name={props.iconName} type={props.iconType} color={'#fff'} />
        </TouchableOpacity>
      )}
      {hasTitle && <Text style={styles.titleStyle}>{title}</Text>}

      {hasInfo && (
        <TouchableOpacity style={styles.notificationView} onPress={onInfoPress}>
          <View style={styles.iconView}>
            <Icon
              name={'info'}
              type={'feather'}
              color={colors.primary}
              size={20}
            />
          </View>
        </TouchableOpacity>
      )}

      {hasRightComponent && (
        <TouchableOpacity style={styles.notificationView} onPress={onRightComponentPress}>
            <Icon name={props.rightComponentName} type={props.rightComponentNameType} color={'#fff'} />
        </TouchableOpacity>
      )}

      {menuView && (
        <View style={styles.notificationView}>
            <MenuView {...props}/>
        </View>
      )}

      

      
      {hasHome && (
        <TouchableOpacity style={styles.notificationView} onPress={onHomePress}>
          <View style={styles.iconView}>
            <Icon
              name={'home'}
              type={'feather'}
              color={'#fff'}
              size={IS_TABLET ? 32 : 20}
            />
          </View>
        </TouchableOpacity>
      )}

      {hasSettings && (
        <TouchableOpacity
          style={styles.notificationView}
          onPress={onSettingsPress}>
          <View style={styles.iconView}>
            <Icon
              name={'settings'}
              type={'feather'}
              color={'#fff'}
              size={IS_TABLET ? 32 : 20}
            />
          </View>
        </TouchableOpacity>
      )}

      <View style={styles.notificationView}>{props.rightComponent}</View>
    </View>
  );
};

export default HeaderView;

const styles = StyleSheet.create({
  parent: {
    height: IS_TABLET ? 72 : 56,
    backgroundColor: colors.primary,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  headerView: {
    position: 'absolute',
    // padding: IS_TABLET ? 24 : 16,
    left: 0,
    zIndex: 100,
    paddingVertical: 8,
    paddingHorizontal: IS_TABLET ? 24 : 16,
  },
  menuIcon: {
    height: 40,
    width: 40,
    // padding:8
    // tintColor:colors.accent
  },
  titleStyle: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: IS_TABLET ? 24 : 16,
    fontFamily: fonts.notoSans600,
  },
  badge: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: colors.primary,
    height: 8,
    width: 8,
    borderRadius: 4,
    zIndex: 100,
  },
  notificationView: {
    position: 'absolute',
    // padding:12,
    margin:6,
    right: 10,
    zIndex: 100,
  },
  iconView: {
    padding: IS_TABLET ? 24 : 12,
  },
});
