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

const InterviewerFeedback3 = props => {

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
            question={'1. How much rating would you like to give this app?'}
        />

        <RatingQuestion 
            question={'2. Were the questions easy to understand?'}
        />

        <RatingQuestion 
            question={'3. Was the time alloted to complete the test is sufficient?'}
        />

      <ButtonView 
        title={'Submit'}
        containerStyle={{marginTop:32}}
        onPress={props.onSubmit}
      />

    </View>
    </BaseView>
  )
}

export default InterviewerFeedback3

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