import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../../../../../values/fonts';
import {colors} from '../../../../../values/colors';
import MCQChoiceItem from './MCQChoiceItem';
import ButtonView from '../../../../components/ButtonView';
import {Icon} from 'react-native-elements';
import {IS_TABLET, SCREEN_HEIGHT} from '../../../../../values/dimens';
import {showAlert} from '../../../../../utils/Message';
import ZoomableImage from '../../../../../utils/ZoomableImage';
import InputView from '../../../../components/InputView';

const MCQItem = props => {
  const {data, index, key, listLength, isTestStarted = false,isLastQuestion,isPracticeTest,initialIndex,fromGeneral,multilineAns,setMultilineAns} = props;

  const [choices, setChoices] = useState([]);
  const [extraData, setExtraData] = useState(false);
  const [change, setChange] = useState('');
 


  // console.log('[MCQItem.js] init : ',data)

  useEffect(() => {
    setChoices(data.options);
    console.log("fiNAL Choices")
    console.log(choices)
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setChoices]);

  const _renderChoice = ({item, index}) => {

    return (
      <MCQChoiceItem
        item={item}
        index={index}
        onPress={() => _onChoicePress(item)}
      />
    );
  };

  const _onChoicePress = item => {
    if (isTestStarted) {
      const _list = choices;
      _list.forEach(it => (it.selected = false));

      const index = _list.findIndex(it => it.option === item.option);
      _list[index].selected = true;
      // console.log('[MCQItem.js] : ',_list)
      setChoices(_list);
      setExtraData(!extraData);
    } else {
      showAlert('error', "Timeout! You can't answer now.");
    }
  };

  const _onClearResponse = () => {
    const _list = choices;
    _list.forEach(it => (it.selected = false));
    setChoices(_list);
    setExtraData(!extraData);
  };

  // const _onSaveAndNext = () => {
  //   props.onSaveAndNext()
  // }

  // const _resetChoices = () => {
  //   const _list = choices;
  //   _list.forEach(it => it.selected = false);
  //   setChoices(_list)
  // }

  // const _onNext = () => {
  //   _resetChoices()
  //   props.onNext()
  // }

  // const _onPrev = () => {
  //   _resetChoices()
  //   props.onPrev()
  // }
  // const handleChange=(text)=>{
  //   var t=initialIndex+1;
  //   setMultilineAns(prevState=>({
  //     ...prevState,
  //     'count':t,
  //     ans:text
  //   }))
  // }
  const handleChange=(text)=>{
    setChange(text);
    setMultilineAns(text)
  }

  return (
    <ScrollView style={styles.parent} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{data.question}</Text>
      {data.imageUrl !== undefined &&
        data.imageUrl !== null &&
        data.imageUrl !== '' && (
          <Image
            source={{uri: data.imageUrl}}
            style={{height: 240, width: '100%'}}
            resizeMode="contain"
            // imageWidth={240}
            // imageHeight={240}
          />
        )}
      <View>
      {
       
        fromGeneral==true && data.type==="Multiline" ?
        <InputView 
          parentStyle={{marginHorizontal:16,marginTop:16}}
          textInputViewStyle={{}}
          textInputStyle={[styles.multiLineTextInputStyle,{height:220}]}
          multiline
          blurOnSubmit
          value={change}
          onChangeText={text =>  handleChange(text)}
          viewStyle={{paddingHorizontal:0}}
        />:
        <FlatList
        data={choices}
        renderItem={_renderChoice}
        extraData={extraData}
        keyExtractor={item => item.option}
      />
      }
      </View>

      {/* {choices.filter(it => it.selected).length > 0 && (
        <TouchableOpacity onPress={_onClearResponse}>
          <Text style={styles.clear}>clear response</Text>
        </TouchableOpacity>
      )} */}
      {
        fromGeneral!=true?
        <TouchableOpacity
        onPress={() => props.onSaveAndNext()}
        style={{alignSelf: 'flex-end', marginVertical: 16}}
        disabled={choices.filter(it => it.selected).length < 1}
        activeOpacity={0.7}>
        <View style={{backgroundColor:choices.filter(it=>it.selected).length>0?"#009eff":"lightgray",borderRadius:6,paddingHorizontal:10}}>
        <Text
          style={[
            styles.clear,
            {
              color:
                choices.filter(it => it.selected).length > 0
                  ? 'white'
                  : '#888',
            },
          ]}>
            {/* initialIndex + 1 */}
          {isLastQuestion || (isPracticeTest && listLength==initialIndex) ? 'Submit' : 'Next'}
        </Text>
        </View>
      </TouchableOpacity>
      : <View style={{ margin: 24}}>
          {
            data.type=='Multiline'?
            <ButtonView
            title={
              isLastQuestion || (isPracticeTest && listLength==initialIndex) ? 'Submit' : 'Next'
            }
            size={'medium'}
            containerStyle={{flex: 1, marginLeft: 8,marginTop:150}}
            buttonStyle={{
              backgroundColor: colors.darkBlue,
              borderColor: colors.darkBlue,
            }}
            onPress={() => props.onSaveAndNext()}
            disabled={multilineAns!=''?false:true}
            />
            :
            <ButtonView
            title={
              isLastQuestion || (isPracticeTest && listLength==initialIndex) ? 'Submit' : 'Next'
            }
            size={'medium'}
            containerStyle={{flex: 1, marginLeft: 8,marginTop:70}}
            buttonStyle={{
              backgroundColor: colors.darkBlue,
              borderColor: colors.darkBlue,
            }}
            onPress={() => props.onSaveAndNext()}
            disabled={choices.filter(it => it.selected).length < 1}
            />
          }
         
        </View>

      }
     

      {/* <TouchableOpacity
        style={{alignSelf: 'flex-end', marginVertical: 16}}
        disabled={choices.filter(it => it.selected).length < 1}
        activeOpacity={0.7}
        onPress={() => props.onSaveAndNext()}>
        <View
          style={[
            styles.iconView,
            {
              backgroundColor:
                choices.filter(it => it.selected).length > 0
                  ? colors.accent
                  : '#888',
            },
          ]}>
          <Icon
            name="chevron-right"
            type="entypo"
            size={36}
            color={
              choices.filter(it => it.selected).length > 0
                ? '#fff'
                : '#e0e0e0'
            }
          />
        </View>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default MCQItem;

const styles = StyleSheet.create({
  parent: {
    // flex:1
    height: '100%',
  },
  title: {
    fontSize: IS_TABLET ? 28 : 20,
    fontFamily: fonts.notoSans600,
    color: colors.primary,
    marginVertical: IS_TABLET ? 16 : 0,
  },
  bottomView: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  clear: {
    fontSize: IS_TABLET ? 28 : 16,
    fontFamily: fonts.notoSans600,
    padding: IS_TABLET ? 16 : 8,
  },
  iconView: {
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  multiLineTextInputStyle : {
    minHeight:172,
    paddingTop:24,
    // borderWidth:1,
    borderColor:'#d4d4d4',
    padding:12,
    borderRadius:4,
    borderBottomColor:'#d4d4d4',
    backgroundColor: '#fff',
    textAlignVertical:'top'
}
});
