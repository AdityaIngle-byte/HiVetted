import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../../../hoc/BaseView'
import UsersView from './items/UsersView'
import { fonts } from '../../../../values/fonts'
import { colors } from '../../../../values/colors'
import WelcomeView from './items/WelcomeView'
import CheckView from '../../../components/CheckView'
import ButtonView from '../../../components/ButtonView'
import { showAlert, showConfirmAlert } from '../../../../utils/Message'
import { useSelector } from 'react-redux'
import { INTERVIEWER, MCQ, ONE_WAY, TWO_WAY } from '../../../../values/strings'
import { checkAndRequestCameraPermission, checkAndRequestMicrophonePermission, checkCameraAndMicrophonePermissions } from '../../../../utils/PermissionsCheck'
import { Icon } from 'react-native-elements'
import DocumentPicker from 'react-native-document-picker'

const Modules = props => {
    
    const baseViewRef = useRef(null)

    // const interviewType = useSelector(state => state.home.interviewType)

    
    


    useEffect(() => {

        _init()

        return () => {
            
        };
    }, [])


    const _init = () => {
       
    }
  


    return (
        <BaseView
            ref={baseViewRef}  
            hasStatusBar
            hasHeader
            hasBack
            onBackPress={() => props.navigation.goBack()}
            title={'Modules'}
            headerParentStyle={{borderBottomLeftRadius:0,borderBottomRightRadius:0}}
        >
        <ScrollView 
            style={styles.parent}
            contentContainerStyle={{paddingBottom:48}}
            showsVerticalScrollIndicator={false}
        >
           
       </ScrollView>
        </BaseView>
    )
}

export default Modules

const styles = StyleSheet.create({
    parent : {
        flex:1,
        backgroundColor:'#fff'
    },
   
})


