import { View, Text } from 'react-native'
import React,{useRef}from 'react'
import BaseView from '../../../hoc/BaseView'
import { showConfirmAlert } from '../../../../utils/Message'
import { clearUserPrefs } from '../../../../utils/UserPrefs'

export default function CustomerDashboard(props) {

  const baseViewRef = useRef(null)

  const _onLogout = () => {
    showConfirmAlert(
        'Logout',
        'Are you sure you want to log out?',
        () => {
            clearUserPrefs()
            // onLogout()
            props.navigation.replace('Login')
        }
    );    
  }

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      title={'Dashboard'}
      hasCustomIcon iconName='menu' iconType='feather'
      onIconPress={()=>props.navigation.toggleDrawer()}
      menuView
      _onLogout={_onLogout}
    ></BaseView>
  )
}
