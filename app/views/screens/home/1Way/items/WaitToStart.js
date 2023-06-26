import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../../../../assets/images'
import BaseView from '../../../../hoc/BaseView'
import { fonts } from '../../../../../values/fonts'
import { colors } from '../../../../../values/colors'
import CountDown from 'react-native-countdown-component'
import ButtonView from '../../../../components/ButtonView'

const WaitToStart = props => {

    const [isTimerStopped, setIsTimerStopped] = useState(true)

    return (
        <BaseView>
        <View style={styles.parent}>
        <Image 
            style={styles.logo}
            source={images.high5Icon}
            resizeMode='contain'
        />
        <Text style={styles.text1}>Your 1-Way Interview starts in</Text>
        <View style={styles.timeView}>
            <CountDown 
                until={3}
                onFinish={props.onTimerFinish}
                size={32}
                timeToShow={['S']}
                timeLabels={{'s' : ''}}
                digitStyle={{backgroundColor:'transparent'}}
                digitTxtStyle={{color:'#fff',fontFamily:fonts.notoSans700}}
                // onPress={() => alert('hello')}
                running={isTimerStopped}
            />
        </View>
        </View>
        <ButtonView 
            title={'Cancel'}
            containerStyle={{margin:24}}
            onPress={props.onCancel}
        />
        </BaseView>
    )
}

export default WaitToStart

const styles = StyleSheet.create({
    parent: {
        flex:1,
        alignItems:'center',
        // justifyContent: 'center',
        paddingTop:72
    },
    logo : {
        height:120,
        width:120,
        marginBottom:48
    },
    text1 : {
        fontFamily:fonts.notoSans600
    },
    timeView : {
        height:96,
        width:96,
        backgroundColor:colors.accent,
        borderRadius:60,
        marginTop:12,
        alignItems:'center',
        justifyContent: 'center',
    }
})