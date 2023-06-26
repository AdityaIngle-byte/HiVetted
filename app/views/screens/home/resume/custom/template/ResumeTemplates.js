import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {showAlert} from '../../../../../../utils/Message';
import BaseView from '../../../../../hoc/BaseView';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';

const ResumeTemplates = props => {
  const baseViewRef = useRef(null);

  useEffect(() => {
    return () => {};
  }, []);

  const _onSelectResume = (title, htmlCode) => {
    // console.log('[ResumeTemplates.js] on Select: ',title,htmlCode);
    const data = {
      title,
      html_code: htmlCode,
    };

    showAlert('success', `Selected Template "${title}"`);
    props.route.params.onGoBack(data);
    props.navigation.goBack();
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Resume Templates"
      navigation={props.navigation}
      hasNotification>
      <ScrollView
        contentContainerStyle={{paddingBottom: 32}}
        style={{backgroundColor: '#FBFBFB'}}>
        <View style={styles.parent}>
          {/* <View style={styles.row}> */}
          {/* <Template1
            parentStyle={styles.topMargin}
            scrollEnabled={false}
            onPreviewPress={htmlCode =>
              props.navigation.navigate('ResumePreview', {
                htmlCode: htmlCode,
                header: 'Template 1',
              })
            }
            onSelectPress={htmlCode => _onSelectResume('Template 1', htmlCode)}
          /> */}
          <Template2
            parentStyle={styles.topMargin}
            scrollEnabled={false}
            onPreviewPress={htmlCode =>
              props.navigation.navigate('ResumePreview', {
                htmlCode: htmlCode,
                header: 'Template 1',
              })
            }
            onSelectPress={htmlCode => _onSelectResume('Template 1', htmlCode)}
          />
          {/* <Template3
            parentStyle={styles.topMargin}
            scrollEnabled={false}
            onPreviewPress={htmlCode =>
              props.navigation.navigate('ResumePreview', {
                htmlCode: htmlCode,
                header: 'Template 3',
              })
            }
            onSelectPress={htmlCode => _onSelectResume('Template 3', htmlCode)}
          /> */}
          <Template4
            parentStyle={styles.topMargin}
            scrollEnabled={false}
            onPreviewPress={htmlCode =>
              props.navigation.navigate('ResumePreview', {
                htmlCode: htmlCode,
                header: 'Template 2',
              })
            }
            onSelectPress={htmlCode => _onSelectResume('Template 2', htmlCode)}
          />
          {/* </View> */}
          {/* <View style={styles.row}>
                    <Template3
                        parentStyle={styles.rightMargin}
                        scrollEnabled={false}
                        onPreviewPress={htmlCode => this.props.navigation.navigate('ResumePreview',{'htmlCode' : htmlCode,header:'Template 3'})}
                        onSelectPress={htmlCode => this._onSelectResume('Template 3',htmlCode)}
                    />
                    <Template4
                        parentStyle={styles.leftMargin}
                        scrollEnabled={false}
                        onPreviewPress={htmlCode => this.props.navigation.navigate('ResumePreview',{'htmlCode' : htmlCode,header:'Template 4'})}
                        onSelectPress={htmlCode => this._onSelectResume('Template 4',htmlCode)}
                    />
                </View> */}
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default ResumeTemplates;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
    // backgroundColor:'#FBFBFB'
    // backgroundColor:'#d4d4d4'
  },
  row: {
    height: 360,
    // flex:1,
    flexDirection: 'row',
    paddingTop: 16,
  },
  rightMargin: {
    marginRight: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  leftMargin: {
    marginLeft: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  topMargin: {
    marginTop: 16,
  },
});
