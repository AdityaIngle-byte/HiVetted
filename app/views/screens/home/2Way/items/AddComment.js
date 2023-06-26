import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Overlay } from 'react-native-elements'
import HeaderModal from '../../../../components/HeaderModal'
import { fonts } from '../../../../../values/fonts'
import { colors } from '../../../../../values/colors'
import ButtonView from '../../../../components/ButtonView'
import { showAlert } from '../../../../../utils/Message'
import { Formik } from 'formik'
import { addCommentSchema } from '../../../../../utils/formikValidations'

const AddComment = props => {

    const {isVisible,onClose} = props;

    const [comment, setComment] = useState('')


    const _onAddComment = () => {
        props.setComment(comment);
        onClose()        
        setComment('')
    }


    return (
        <Overlay
            isVisible={isVisible}
            onBackdropPress={onClose}
            overlayStyle={{width:'90%'}}
        >
        <View style={styles.parent}>
            <HeaderModal 
                title={'Add Comment'}
                onBackPress={onClose}
            />

            <Formik
                initialValues={{
                    comment : comment
                }}
                validationSchema={addCommentSchema}
                onSubmit={() => _onAddComment()}
                enableReinitialize
                style={{flex:1}}
            >
                {({handleSubmit,errors,touched}) => (
                    <View>
                    <TextInput 
                        value={comment}
                        onChangeText={text => setComment(text)}
                        style={styles.textInput}
                        placeholder={'add comment or skill'}
                    />

                    {
                        touched.comment
                        &&
                        <Text style={styles.error}>{errors.comment}</Text>
                    }

                    <ButtonView 
                        title={'Add'}
                        containerStyle={{marginHorizontal:16,marginTop:16}}
                        onPress={() => handleSubmit()}
                    />
                    </View>
                )}
            </Formik>
        </View>
        </Overlay>
    )
}

export default AddComment

const styles = StyleSheet.create({
    parent : {
        backgroundColor: '#fff',
        width:'100%'
    },
    textInput : {
        fontSize:14,
        fontFamily:fonts.notoSans600,
        color:colors.defaultTextColor,
        borderWidth:1,
        borderColor:'#e0e0e0',
        paddingHorizontal:16,
        paddingVertical:12,
        borderRadius:8,
        // marginVertical:16,
        marginHorizontal:16,
        marginTop:16
    },
    error : {
        fontSize:10,
        fontFamily:fonts.notoSans400_2,
        color:colors.alert,
        marginLeft:16,
    }
})