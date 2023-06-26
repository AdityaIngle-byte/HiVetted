import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../../values/colors'
import { fonts } from '../../../../values/fonts'

const LoginViewSelect = props => {


    const [index, setIndex] = useState(0)


    return (
        <View style={styles.parent}>
            <Item 
                title={'Sign In.'}
                isSelected={index === 0}
                onPress={() => {
                    setIndex(0)
                    props.onUpdateIndex(0)
                }}
               
            />
            {/* <Item 
                title={'Interview Code'}
                isSelected={index === 1}
                onPress={() => {
                    setIndex(1)
                    props.onUpdateIndex(1)
                }}
            /> */}
        </View>
    )
}

export default LoginViewSelect

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        marginTop:16
    },
    itemView : {
        marginRight:24
    },
    itemTitle : {
        fontSize:24,
        fontFamily:fonts.notoSansMedium,
        fontWeight:"bold"
    },
    bottomUnderline : {
        height:4,
        backgroundColor: colors.primary,
        marginHorizontal:12,
        marginTop:4,
        borderRadius:4
    }
})


const Item = props => {

    const isSelected = props.isSelected;

    return (
        <TouchableOpacity
            onPress={props.onPress}
            disbaled
        >
        <View style={styles.itemView}>
            <Text style={[styles.itemTitle,{color:colors.accent}]}>{props.title}</Text>
            <Text style={[styles.itemTitle,{fontSize:13, fontWeight:"normal",marginTop:5}]}>Welcome back!. Sign In to get started using High5</Text>
            {/* <View style={[styles.bottomUnderline,{backgroundColor: isSelected?colors.primary : 'transparent'}]}/> */}
        </View>
        </TouchableOpacity>
    )
}