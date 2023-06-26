import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import WebView from 'react-native-webview';
import ButtonView from '../../../../../components/ButtonView';
import BaseView from '../../../../../hoc/BaseView';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import { shareFile } from '../../../../../utils/Share'
import {showAlert} from '../../../../../../utils/Message';

const ResumePreview = props => {
  const baseViewRef = useRef(null);

  const [htmlCode, setHtmlCode] = useState('');
  const [header, setHeader] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    _init();
    return () => {};
  }, []);

  const _init = () => {
    const {htmlCode, header} = props.route.params;
    // console.log('[ResumePreview.js] HTML Code :',htmlCode,header)
    if (htmlCode !== undefined) {
      setHtmlCode(htmlCode);
      setHeader(header);
      setData({htmlCode, header});
    }
  };

  const _createPDF = async () => {
    let options = {
      html: htmlCode,
      fileName: header,
      directory: 'Documents',
    };
    // let file = await RNHTMLtoPDF.convert(options)
    // console.log('[ResumePreview.js] Create PDF : ',file);
    // // alert('Saved')

    // showAlert('success','Saved Successfully!')
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title={header}
      navigation={props.navigation}>
      <View style={{flex: 1}}>
        <WebView
          source={{html: htmlCode}}
          style={styles.parent}
          showsVerticalScrollIndicator={false}
        />

        {/* <View style={styles.row}>
          <ButtonView
            title="Share"
            containerStyle={{marginRight: 8, flex: 1}}
            outline
          />
          <ButtonView
            title="Download"
            containerStyle={{marginLeft: 8, flex: 1}}
            onPress={() => _createPDF()}
          />
        </View> */}
      </View>
    </BaseView>
  );
};

export default ResumePreview;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    margin: 16,
    borderRadius: 8,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
});
