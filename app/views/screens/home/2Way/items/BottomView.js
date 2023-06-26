import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { colors } from '../../../../../values/colors';
import { fonts } from '../../../../../values/fonts';

const BottomView = props => {

    const {isAudioEnabled,onMic,isVideoEnabled,onVideo,onEnd,onCall} = props;

  return (
    <View style={styles.parent}>
        {/* Mic Button */}
        <TouchableOpacity
            onPress={onMic}
            activeOpacity={0.7}
        >
        <View style={styles.iconView}>
            <Icon 
                name={isAudioEnabled ? 'mic' : 'mic-off'}
                type={'feather'}
                color={colors.green}
            />
        </View>
        </TouchableOpacity>

        {/* End Button */}
        {
            props.hasEndView
            &&
            <TouchableOpacity
                onPress={onEnd}
                style={styles.endView}
                activeOpacity={0.7}
            >
            <View style={[styles.end]}>
                <Icon 
                    name={'phone-off'}
                    type={'feather'}
                    color={'#fff'}
                />
            </View>
            </TouchableOpacity>
        }

        {
            props.hasCallView
            &&
            <TouchableOpacity
                onPress={onCall}
                style={styles.endView}
                activeOpacity={0.7}
            >
            <View style={[styles.end,{backgroundColor:colors.accent}]}>
                <Icon 
                    name={'phone'}
                    type={'feather'}
                    color={'#fff'}
                />
            </View>
            </TouchableOpacity>
        }

        <Text style={styles.text}>Your call in progress</Text>


        {/* Video Off Button */}
        <TouchableOpacity
            onPress={onVideo}
            activeOpacity={0.7}
        >
        <View style={[styles.iconView,{backgroundColor:'#ffffff33'}]}>
            <Icon 
                name={isVideoEnabled ? 'video' : 'video-off'}
                type={'feather'}
                color={'#fff'}
            />
        </View>
        </TouchableOpacity>
    </View>
  )
}

export default BottomView

const styles = StyleSheet.create({
    parent : {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:colors.green,
        position: "absolute",
        left: 0,
        bottom: 0,
        right: 0,
        paddingVertical:16,
        paddingHorizontal:32,
        justifyContent:'space-between'
    },
    iconView : {
        height:56,
        width:56,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:16
    },
    endView : {
        position:'absolute',
        left:'50%',right:'50%',bottom:56,
    },
    end : {
        height:64,
        width:64,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:colors.alert,
        borderRadius:32,
        // margin:8,
        // borderWidth:10,
        // borderColor:'#fff'
    },
    text : {
        fontSize:10,
        color:'#f0f0f0',
        fontFamily:fonts.notoSans600
    }
})