import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { colors } from '../../../values/colors'
import ButtonView from '../../components/ButtonView'
import InputView2 from '../../components/InputView2'
import ForgotPassword from '../../modals/ForgotPasswordModal'
import { Formik } from 'formik'
import { loginValidationSchema } from '../../../utils/formikValidations'
import { images } from '../../../assets/images'
import BaseView from '../../hoc/BaseView'
import { Icon } from 'react-native-elements'
import LoginViewSelect from './items/LoginViewSelect'
import { fonts } from '../../../values/fonts'
import { forgotPassword, loginUser } from '../../../redux/actions/customerLoginActions'
import { clearRememberMe, getRememberMe, setRememberMe } from '../../../utils/UserPrefs'
import { IS_TABLET } from '../../../values/dimens'
import { setUserPrefs } from '../../../redux/actions/customerLoginActions'
import { getUserPref } from '../../../utils/UserPrefs'
import { useDispatch } from 'react-redux';

export default function Login(props) {

    const baseViewRef = useRef(null)
    console.log(props);
    const forgotPasswordModalRef = useRef(null)
    const dispatch = useDispatch();

    // https://high5devwebapp-react.azurewebsites.net/high5Hire
    const [email, setEmail] = useState('')  // hsmith999@yopmail.com   davidwarner@yopmail.com JhonJeffry@yopmail.com
    const [password, setPassword] = useState('')   // password : 'Test@123',           //'Test@123',
    const [showPassword, setShowPassword] = useState(false);
    const [isInternetConnected, setIsInternetConnected] = useState(false);
    const [viewType, setViewType] = useState(0)
    const [rememberMe, setIsRememberMe] = useState(false)


    useEffect(() => {
        _init();
        return () => {

        };
    }, [setEmail, setPassword, setIsRememberMe])


    const _navigateTo = () => {
        setTimeout(async () => {
            const userData = await getUserPref()
            if (userData !== null) {
                const userPrefs = JSON.parse(userData)
                dispatch(setUserPrefs(userPrefs))
                props.navigation.replace('DrawerRoute')
            }
        }, 100)
    }

    const _init = async () => {
        const rememberMeData = await getRememberMe();
        console.log('[Login.js] init : ', rememberMeData)
        if (rememberMeData !== null) {
            const jsonData = JSON.parse(rememberMeData);
            setEmail(jsonData.email)
            setPassword(jsonData.password)
            setIsRememberMe(true)
        }
        _navigateTo();
    }


    const _onLogin = () => {
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            loginUser(email, password)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] Login Response : ', response)
                    // _onRememberMe();
                    props.navigation.replace('DrawerRoute')
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] Login Error : ', error)
                })
        }
    }

    const _onForgotPassword = email => {
        console.log('[Login.js] Forgot Password : ', email)
        if (baseViewRef !== null) {
            baseViewRef.current.showLoader();
            forgotPassword(email)
                .then(response => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] ForgotPassword Response : ', response)
                })
                .catch(error => {
                    baseViewRef.current.hideLoader();
                    console.log('[Login.js] ForgotPassword Error : ', error)
                })
        }
    }

    const _onRememberMe = () => {
        // console.log('[Login.js] Remember me:',rememberMe)
        if (rememberMe) {
            const data = {
                'email': email,
                'password': password
            }

            setRememberMe(JSON.stringify(data))
        } else {
            clearRememberMe()
        }
    }

    return (
        <BaseView
            ref={baseViewRef}
        >
            <ScrollView
                style={{ flex: 1, backgroundColor: '#fff' }}
            >
                <View style={styles.parent}>
                    <Image
                        source={images.cornerImage}
                        style={styles.cornerImage}
                        resizeMode='stretch'
                    />
                    <View style={styles.topView}>
                        <Image
                            source={images.high5Logo}
                            style={styles.logoImage}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.loginView}>
                        <LoginViewSelect
                            onUpdateIndex={index => setViewType(index)}
                        />

                        {
                            viewType === 0
                            &&
                            <View>
                                <Formik
                                    initialValues={{
                                        email: email,
                                        password: password
                                    }}
                                    validationSchema={loginValidationSchema}
                                    onSubmit={() => _onLogin()}
                                    enableReinitialize
                                >
                                    {
                                        ({ handleSubmit, errors, touched }) => (

                                            <ScrollView style={{ marginTop: 16 }}>

                                                {/* <Text style={[styles.loginText,{marginTop:0}]}>Log in to your account</Text> */}
                                                <InputView2
                                                    label='Email Address'
                                                    value={email}
                                                    onChangeText={text => setEmail(text)}
                                                    keyboardType='email-address'
                                                    placeholder='Email Address'
                                                    parentStyle={{ marginTop: 8 }}
                                                    // isRequired
                                                    error={errors.email}
                                                    touched={touched.email}
                                                // hasIcon
                                                />
                                                <InputView2
                                                    label='Password'
                                                    value={password}
                                                    onChangeText={text => setPassword(text)}
                                                    // secureTextEntry
                                                    placeholder='*********'
                                                    parentStyle={{ marginTop: 20 }}
                                                    secureTextEntry={showPassword ? false : true}
                                                    hasIcon
                                                    maxLength={24}
                                                    iconName={showPassword ? 'eye' : 'eye-with-line'}
                                                    iconType={'entypo'}
                                                    onIconPress={() => setShowPassword(prevState => !prevState)}
                                                    // isRequired
                                                    error={errors.password}
                                                    touched={touched.password}
                                                />
                                                <View style={styles.row2}>
                                                    <TouchableOpacity
                                                        style={{}}
                                                        onPress={() => setIsRememberMe(prevState => !prevState)}
                                                    >
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Icon
                                                                name={rememberMe ? 'check-square' : 'square'}
                                                                type='feather'
                                                                color={rememberMe ? colors.accent : colors.primary}
                                                                size={18}
                                                                containerStyle={{ marginRight: 8 }}
                                                            />
                                                            <Text style={[styles.forgotPassword, { color: rememberMe ? colors.accent : colors.primary }]}>Remember me</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{}}
                                                        onPress={() => {
                                                            if (forgotPasswordModalRef !== null) {
                                                                forgotPasswordModalRef.current.baseModal.showModal()
                                                            }
                                                        }}
                                                    >
                                                        <Text style={styles.forgotPassword}>Forgot?</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <ButtonView
                                                    title='Login'
                                                    onPress={() => handleSubmit()}
                                                />
                                                <View style={[styles.row_or, { marginTop: 35 }]}>
                                                    <View style={styles.bar_or} />
                                                    <Text style={styles.description2_or}>OR</Text>
                                                    <View style={styles.bar_or} />
                                                </View>
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                    <Text style={{ fontWeight: "bold" }}>Do you have an assessment invite? <Text onPress={() => props.navigation.replace('MainRoutes')} style={{ color: colors.accent }}>Click here.</Text></Text>
                                                </View>
                                            </ScrollView>

                                        )
                                    }
                                </Formik>
                            </View>
                        }

                        {
                            viewType === 1
                            &&
                            <InterviewCode
                                {...props}
                            />
                        }

                    </View>


                    {/* </BaseView> */}

                    <ForgotPassword
                        ref={forgotPasswordModalRef}
                        setEmail={_onForgotPassword}
                    />
                </View>
            </ScrollView>
            {/* {
            viewType === 0
            &&
            <BottomView 
                text1={"Don't have an account? "}
                button1='Register'
                onButtonPress={() => props.navigation.navigate('SignUp')}
            />
        } */}
        </BaseView>
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    topView: {
        height: 240,
        // flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    description2: {
        fontSize: 14,
        color: colors.accent,
        fontFamily: fonts.notoSans700,
        paddingHorizontal: 16,
        textAlign: 'center',
        // marginVertical: 16,
    },
    logoImage: {
        height: 80,
        width: 200
    },
    cornerImage: {
        position: 'absolute',
        height: 320,
        width: 360,
        top: 0, right: 0,
        // bottom:0
    },
    bar: {
        width: '40%',
        height: 1,
        backgroundColor: colors.gray,
    },
    bar_or: {
        width: '25%',
        height: 1,
        backgroundColor: 'black',
    },
    description2_or: {
        fontSize: IS_TABLET ? 20 : 14,
        color: 'black',
        fontFamily: fonts.notoSans700,
        paddingHorizontal: IS_TABLET ? 32 : 16,
        textAlign: 'center',
        // marginVertical: 16,
    },
    loginView: {
        flex: 1,
        backgroundColor: '#fff',
        // height:'100%',
        borderTopRightRadius: 24,
        borderTopLeftRadius: 24,
        paddingHorizontal: 20,
        // paddingTop:16
    },
    loginText: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 8,
        fontFamily: fonts.notoSansBold,
        fontWeight: '900',
        color: '#000'
    },
    forgotPassword: {
        fontFamily: fonts.notoSansBold,
        fontSize: 14,
        color: colors.primary
    },
    interview: {
        fontFamily: fonts.notoSansBold,
        fontSize: 14,
        color: colors.accent,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        // marginTop:16
    },
    socialView: {
        height: 48,
        width: 84,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 36,
        // marginBottom:16
    },
    divider: {
        height: 2,
        backgroundColor: '#e0e0e0',
        flex: 1
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginBottom: 30
    },
    row_or: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,
        marginTop: 24,
    },
    linkedIN_logo: {
        height: 30,
        width: 80,
        borderColor: colors.linkedInColor
    },
    linkedInbutton: {
        backgroundColor: colors.linkedInColor,
        marginHorizontal: 5,
        borderColor: colors.linkedInColor,
        borderRadius: 6
    },
    linkedInText: {
        color: '#fff'
    },
    row3: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 14,
    },

});