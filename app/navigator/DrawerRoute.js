import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomerDashboard from "../views/screens/home/customerModule/CustomerDashboard";
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { colors } from "../values/colors";
import {View,Text} from 'react-native';

import CustomDrawer from './items/CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerRoute(){
    return(
        <Drawer.Navigator
            initialRouteName="drawerStack"
            drawerContent={props=><CustomDrawer {...props} />}
            screenOptions={{
                headerShown:false,// hide all the screen names from top header i.e drawer screen names.
                // drawerActiveBackgroundColor:colors.accent,
                drawerActiveTintColor:colors.whiteColor,
                drawerInactiveTintColor:colors.whiteColor,
            }}
        >
            <Drawer.Screen
                name="Dashboard"
                component={CustomerDashboard}
                options={{
                    drawerIcon:({focused})=>(
                        <FontAwesome5 name='home' size={20} color={colors.whiteColor}/>  
                    ),
                }} 
            />
            <Drawer.Screen
                name="Question Library"
                component={Check}
                options={{
                    drawerIcon:({focused})=>(
                        <FontAwesome5 name='home' size={20} color={colors.whiteColor}/>  
                    ),
                }} 
            />
        </Drawer.Navigator>
    )
}

const Check=()=>{
    return(
        <View>
            <Text>Question Library</Text>
        </View>
    )
}
