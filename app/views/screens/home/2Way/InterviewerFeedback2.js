import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseView from '../../../hoc/BaseView'
import { fonts } from '../../../../values/fonts'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../values/colors'
import NoDataView from '../../../components/NoDataView'
import AddComment from './items/AddComment'
import RatingQuestion from '../../../items/RatingQuestion'
import ButtonView from '../../../components/ButtonView'
import CheckView from '../../../components/CheckView'

const InterviewerFeedback2 = props => {

    const [reviews, setReviews] = useState('')
    const [isHire, setIsHire] = useState(false)
  
  useEffect(() => {
    _init()
    return () => {
      
    };
  }, [])


  const _init = () => {
   
  }




  return (
    <BaseView>
    <View
      style={styles.parent}
    >

        <RatingQuestion 
            question={'Communication Feedback?'}
        />

        <RatingQuestion 
            question={'Behavior Feedback?'}
        />

        <RatingQuestion 
            question={'Overall interview performance?'}
        />

        <Text style={styles.heading}>Write your reviews</Text>
        <TextInput 
            style={styles.textInput}
            value={reviews}
            onChangeText={text => setReviews(text)}
            multiline
            numberOfLines={6}
        />


        <Text style={styles.heading}>Decision</Text>  
        <CheckView 
            title={'Hire'}
            checked={isHire}
            onPress={() => setIsHire(true)}
        />
        <CheckView 
            title={"Don't Hire"}
            checked={!isHire}
            onPress={() => setIsHire(false)}
        />
      
      
      <ButtonView 
        title={'Next'}
        containerStyle={{marginTop:32}}
        onPress={props.onNext}
      />

    </View>
    </BaseView>
  )
}

export default InterviewerFeedback2

const styles = StyleSheet.create({
  parent : {
    flex:1,
    padding:16
  },
  row : {
    flexDirection:'row',
    alignItems: 'center'
  },
  heading : {
    fontSize:16,
    fontFamily:fonts.notoSans400_2,
    marginTop:24,
    // flex:1
  },
  comment : {
    fontSize:16,
    fontFamily:fonts.notoSans600,
    flex:1
  },
  textInput : {
    borderWidth:1,
    borderRadius:4,
    borderColor:'#e0e0e0',
    height:120,
    padding:12,
    marginTop:12,
    fontSize:14,
    fontFamily:fonts.notoSans600,
  }
})