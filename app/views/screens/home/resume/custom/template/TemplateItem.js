import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
import {colors} from '../../../../../../values/colors';
import {fonts} from '../../../../../../values/fonts';
import ButtonView from '../../../../../components/ButtonView';

const TemplateItem = props => {
  const {name, type, html, onSelect, onPreview} = props;

  return (
    <View style={[styles.parent, props.parentStyle]}>
      <View style={styles.webview}>
        <WebView
          style={{width: '100%'}}
          source={{html: html}}
          scrollEnabled={false}
          scalesPageToFit={false}
        />
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{type}</Text>

      <View style={styles.row}>
        <ButtonView
          title="Select"
          containerStyle={{flex: 1, marginRight: 4, height: 32, marginTop: 0}}
          buttonStyle={{height: 32, paddingVertical: 0}}
          titleStyle={{paddingVertical: 0, fontSize: 14}}
          onPress={onSelect}
        />
        <ButtonView
          title="Preview"
          outline
          containerStyle={{flex: 1, marginLeft: 4, height: 32, marginTop: 0}}
          buttonStyle={{height: 32, paddingVertical: 0}}
          titleStyle={{paddingVertical: 0, fontSize: 14}}
          onPress={onPreview}
        />
      </View>
    </View>
  );
};

export default TemplateItem;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    // paddingHorizontal:12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EcEcec',
    padding: 16,
  },
  webview: {
    // flex:1,
    borderRadius: 8,
    // borderWidth:1,
    // justifyContent:'center',
    paddingBottom: 16,
    // borderColor:colors.accent,
    height: 240,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  name: {
    fontSize: 14,
    fontFamily: fonts.notoSans600,
    marginTop: 4,
  },
  type: {
    fontSize: 10,
    // fontFamily: fonts.notoSans400,
  },
});
