import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../../../../assets/images'
import { colors } from '../../../../../values/colors'
import { fonts } from '../../../../../values/fonts'
import { capturedSelfie } from '../../../../../utils/ImageLoader'

const UsersView = props => {

    const [userImage, setUserImage] = useState(null)


    const _onUploadUserImage = () => {
        capturedSelfie()
            .then(response => {
                setUserImage(response)
            })
            .catch(error => {
                
            })
    }


    return (
        <View style={styles.parent}>
        <TouchableOpacity
            onPress={() => _onUploadUserImage()}
        >
            <Image 
                source={userImage!==null?{uri:userImage.uri} : images.user}
                style={styles.userImage}
                resizeMode='cover'
            />
            
            <Text style={[styles.edit]}>Edit</Text>
        </TouchableOpacity>
        <View style={{flex:1,paddingLeft:16}}>
            <Text style={styles.userName}>Roberto Cooper</Text>
            <Text style={styles.designation}>Javascript Developer</Text>
        </View>
        </View>
    )
}

export default UsersView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:colors.primary,
        paddingHorizontal:16,
        // borderBottomLeftRadius:8,borderBottomRightRadius:8
        marginTop:16
    },
    userImage : {
        height:56,
        width:56,
        borderRadius:28,
        borderWidth:1,
        borderColor:colors.borderColor
    },
    userName : {
        fontSize:20,
        color:colors.primary,
        fontFamily:fonts.notoSans700
    },
    designation : {
        fontSize:12,
        color:colors.defaultTextColor,
        fontFamily:fonts.notoSans400_2
    },
    edit : {
        fontSize:12,
        color:colors.defaultTextColor,
        fontFamily:fonts.notoSans600,
        textAlign:'center',
        marginTop:4,
        position:'absolute',
        bottom:0,right:0,left:0
    },
})