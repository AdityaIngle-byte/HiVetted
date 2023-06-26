import {View,Text,Image,StyleSheet}                            from 'react-native'
import React                                                   from 'react'
import {DrawerContentScrollView,DrawerItemList,DrawerItem}     from '@react-navigation/drawer'
import {images }                                               from '../../assets/images';
import {colors }                                               from '../../values/colors';
import {useSelector }                                          from 'react-redux'
import AntDesign                                               from 'react-native-vector-icons/Octicons';
import {showConfirmAlert }                                     from '../../utils/Message';
import {clearUserPrefs }                                       from '../../utils/UserPrefs';

export default function CustomDrawer(props) {

//   const _onLogout = () => {
//     showConfirmAlert(
//         'Logout',
//         'Are you sure you want to log out?',
//         () => {
//             clearUserPrefs()
//             props.navigation.replace('Login')
//         }
//     ); 
//   }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:colors.primary,flex:1}}>
      <View style={styles.header}>
        <View style={styles.subHeader}>
          <Image source={images.matchedTagIcon} style={styles.matchedTagIcon}/>
          <View>
            <Text style={styles.name}>Aditya</Text>
            <View style={styles.role}>
              <Text style={styles.roleText}>Role : Candidate</Text>
              <Text style={styles.roleText}>Company : LISA</Text>
            </View>
          </View>
        </View>
      </View>
      <DrawerItemList {...props}/>
      <View style={styles.logout}>
      {/* <DrawerItem 
        icon={()=><AntDesign name='sign-out' size={30}/> }
        label="Logout" onPress={_onLogout} /> */}
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
    matchedTagIcon:{
        height:60,
        width:60,
        borderRadius:30,
        margin:10,
        padding:10,
        borderWidth:0.1,
        borderColor:'black'
    },
    name:{
        fontWeight:'bold',
        color:colors.whiteColor,
        fontSize:20
    },
    role:{
        marginRight:50,
        marginTop:5
    },
    roleText:{
        fontSize:12,
        color:colors.whiteColor,
        marginVertical:3
    },
    logout:{
        justifyContent:"flex-end",
        margin:5,
    },
    header:{
        marginBottom:30,
        marginTop:10
    },
    subHeader:{
        flexDirection:"row",
        alignItems:"center"
    }
})


