import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../../../hoc/BaseView'
import { fonts } from '../../../../values/fonts'
import { colors } from '../../../../values/colors'
import RatingQuestion from '../../../items/RatingQuestion'
import ButtonView from '../../../components/ButtonView'

const CandidateFeedback = props => {
  return (
        <View style={{flex:1}}>
            <ScrollView>
            <View style={styles.parent}>
                <Text style={styles.thankyou}>Thank you!</Text>
                <Text style={[styles.thankyou,{fontSize:16,paddingTop:0,paddingBottom:24}]}>We are reviewing you quiz.</Text>

                <RatingQuestion 
                    question={'1. How much rating would you like to give this app?'}
                />

                <RatingQuestion 
                    question={'2. Were the questions easy to understand?'}
                />

                <RatingQuestion 
                    question={'3. Was the time alloted to complete the test is sufficient?'}
                />

            </View>
            </ScrollView>
            <ButtonView 
                title={'Submit & Close'}
                containerStyle={{margin:24}}
                buttonStyle={{backgroundColor:colors.accent,borderColor:colors.accent}}
                onPress={props.onSubmit}
            />
        </View>
  )
}

export default CandidateFeedback

const styles = StyleSheet.create({})