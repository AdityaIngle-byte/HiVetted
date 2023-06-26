import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BaseView from '../../../../hoc/BaseView'
import { fonts } from '../../../../../values/fonts';
import { colors } from '../../../../../values/colors';
import { RNCamera } from 'react-native-camera';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import CountDown from 'react-native-countdown-component';


const OneWayQuestionItem = props => {

    const {item,isUpdated,duration} = props;

    const baseViewRef = useRef(null)
    const cameraRef = useRef(null);

    const [isFirstTime, setIsFirstTime] = useState(true)
    const [initialStart, setInitialStart] = useState(false)
    const [isRecording, setIsRecording] = useState(isUpdated && false)


    console.log('[OneWayQuestionItem.js] Init : ',isUpdated,duration)

    // const [recordedData, setRecordedData] = useState(null)


   useEffect(() => {
    console.log('[OneWayQuestionItem.js] useEffect : ',isUpdated)
    if(!isFirstTime){
        useEffectCallback()
    }
   }, [isRecording])


    const useEffectCallback = () => {
        if(cameraRef !== null){
            if(isRecording){
                _startRecordVideo()
            }else {
                console.log('[OneWayQuestionItem.js] Video Recording Stop')
                _stopRecordVideo()
            } 
        }
    }


    const _onRecord = () => {
        // console.log('[OneWayQuestionItem.js] Record Called')
        setInitialStart(true)
        setIsFirstTime(false)
        setIsRecording(prevState => !prevState)
        
    }


    const _startRecordVideo = async() => {
        console.log('[OneWayQuestionItem.js] starting Video: ',cameraRef)
        if (cameraRef !== null) {
            try {
              const promise = cameraRef.current.recordAsync();
              if (promise) {
                const data = await promise;
                _updateItem(data);
              }
            } catch (e) {
              console.error(e);
            }
          }
    }

   const  _stopRecordVideo = () => {
        console.log('[OneWayQuestionItem.js] Stopping Video: ',cameraRef)
        if(cameraRef !== null){
            cameraRef.current.stopRecording()
        }
    }


    const _updateItem = data => {
        console.log('[OneWayQuestionItem.js] takeVideo', data);
        // setRecordedData(data)
        props.setRecordedData(data)
    }




    return (
        <BaseView
            ref={baseViewRef}
        >
        <View style={styles.parent}>
            <Text style={styles.title}>{item.title}</Text>
            <RNCamera 
                ref={cameraRef}
                style={styles.cameraView}
                type={RNCamera.Constants.Type.front}
            >

                {
                    !initialStart
                    &&
                    <View style={styles.initialStart}>
                        <Text>Recording will be start automatically after</Text>
                        <CountDown 
                            until={3}
                            onFinish={() => _onRecord()}
                            size={48}
                            timeToShow={['S']}
                            timeLabels={{'s' : 'Seconds'}}
                            digitStyle={{backgroundColor:'transparent'}}
                            digitTxtStyle={{color:colors.accent,fontFamily:fonts.notoSans700}}
                            showSeparator
                            separatorStyle={{color:colors.accent}}
                        />                        
                    </View>
                }

                <TouchableOpacity 
                    style={styles.recordView}
                    activeOpacity={0.7}
                    onPress={() => _onRecord()}
                >
                {
                    isRecording
                    ?
                    <CountdownCircleTimer
                        isPlaying={isRecording}
                        duration={duration}
                        colors={[colors.accent]}
                        size={56}
                        strokeWidth={12}
                        trailColor={colors.primary}
                        onComplete={() => _onRecord()}
                    >
                        {({ remainingTime }) => <Text style={styles.time}>{remainingTime}</Text>}
                    </CountdownCircleTimer>
                    :
                    <View style={styles.recordBtn}> 
                        <View style={styles.recordSubBtn}/>
                    </View>
                }
                </TouchableOpacity>
                
            </RNCamera>

        </View>
        </BaseView>
    )
}

export default OneWayQuestionItem

const styles = StyleSheet.create({
    parent : {
        flex:1,
    },
    title : {
        fontSize:16,
        fontFamily:fonts.notoSans400_2,
        color:colors.primary,
        paddingHorizontal:16
    },
    cameraView : {
        flex:1,
        // marginHorizontal:16,
        marginTop:16,
        // borderRadius:8,
        // overflow:'hidden'
    },
    recordView : {
        position: 'absolute',
        bottom:16,
        alignSelf:'center'
    },
    recordBtn : {
        height:56,
        width:56,
        backgroundColor:colors.accent,
        borderRadius:28,
        alignItems:'center',
        justifyContent:'center',
    },
    recordSubBtn : {
        height:16,
        width:16,
        borderRadius:8,
        backgroundColor:'#fff'
    },
    time : {
        fontSize:18,
        color:'#fff',
        fontFamily:fonts.notoSans600
    },
    initialStart : {
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
    }
})