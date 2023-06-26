import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseView from '../../../hoc/BaseView'
import { fonts } from '../../../../values/fonts'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../values/colors'
import NoDataView from '../../../components/NoDataView'
import AddComment from './items/AddComment'
import RatingQuestion from '../../../items/RatingQuestion'
import ButtonView from '../../../components/ButtonView'

const InterviewerFeedback1 = props => {

  const [isCommentViewVisible, setIsCommentViewVisible] = useState(false)
  const [comments, setComments] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    _init()
    return () => {
      
    };
  }, [])


  const _init = () => {
    // console.log('[InterviewerFeedback1.js] init : ',props)
    const {comments} = props.route.params;

    if(comments !== undefined) {
      setComments(comments)
    }
  }


  // const _onAddComment = () => {

  // }


  const _onSetInterviewerComment = comment => {
    console.log('[TwoWay.js] Interviewer Comment :',comment)
    const list = [comment,...comments];
    setComments(list)
  }


  const _renderComment = ({item,index}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.comment}>{index+1}. {item}</Text>
        <TouchableOpacity
          style={{padding:8}}
          onPress={() => _onDeleteComment(item)}
        >
          <Icon 
            name='close'
            type='ant-design'
            size={16}
          />
        </TouchableOpacity>
      </View>
    )
  }


  const _onDeleteComment = (comment) => {
    const filteredList = comments.filter(it=>it!==comment)
    setComments(filteredList)
  }


  const _renderSkill = ({item,index}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.comment}>{index+1}. {item}</Text>
        <TouchableOpacity
          style={{padding:8}}
        >
          <Icon 
            name='close'
            type='ant-design'
            size={16}
          />
        </TouchableOpacity>
      </View>
    )
  }


  return (
    <BaseView>
    <View
      style={styles.parent}
    >
      
      <View style={styles.row}>
        <Text style={[styles.heading,{marginTop:8}]}>Comments</Text>
        <TouchableOpacity
          style={{padding:8}}
          onPress={() => setIsCommentViewVisible(true)}
        >
          <Text style={[styles.heading,{marginTop:8,color:colors.accent}]}>ADD</Text>
        </TouchableOpacity>
      </View>
      {
        comments.length > 0
        ?
        <FlatList 
          data={comments}
          renderItem={_renderComment}
        />
        :
        <NoDataView 
          msg={'No Comment Added'}
          parentStyle={{padding:24}}
        />
      }


      <View style={styles.row}>
        <Text style={[styles.heading,{marginTop:8}]}>Skills</Text>
        <TouchableOpacity
          style={{padding:8}}
        >
          <Text style={[styles.heading,{marginTop:8,color:colors.accent}]}>ADD</Text>
        </TouchableOpacity>
      </View>
      {
        skills.length > 0
        ?
        <FlatList 
          data={skills}
          renderItem={_renderSkill}
        />
        :
        <NoDataView 
          msg={'No Skills Added'}
          parentStyle={{padding:24}}
        />
      }


      <RatingQuestion 
          question={'Rating For "React Native"?'}
      />
      <ButtonView 
        title={'Next'}
        containerStyle={{marginTop:32}}
        onPress={props.onNext}
      />

    </View>
    

    <AddComment 
      isVisible={isCommentViewVisible}
      onClose={() => setIsCommentViewVisible(false)}
      setComment={_onSetInterviewerComment}
    />
    </BaseView>
  )
}

export default InterviewerFeedback1

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
    fontFamily:fonts.notoSans600,
    marginTop:32,
    flex:1
  },
  comment : {
    fontSize:12,
    fontFamily:fonts.notoSans400_2,
    flex:1
  }
})