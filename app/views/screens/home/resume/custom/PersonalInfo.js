import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View,Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setProfilePersonalInfo} from '../../../../../redux/actions/profileActions';
import {profilePersonalInfoValidationSchema} from '../../../../../utils/formikValidations';
import {showAlert} from '../../../../../utils/Message';
// import {
//   setProfilePersonalInfo,
//   updateContactInfo,
// } from '../../../../../redux/actions/profileActions';
// import {profilePersonalInfoValidationSchema} from '../../../../utils/formikValidations';
import {acceptOnlyCharacters} from '../../../../../utils/Validations';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import AddAddressView from '../../../../components/AddAddressView';
// import AddAddressView from '../../../components/AddAddressView';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PhoneView from '../../../../components/PhoneView';
// import PhoneView from '../../../components/PhoneView';
import BaseView from '../../../../hoc/BaseView';
import AddAddress from '../../../../modals/AddAddress';
// import AddAddress from '../../common/AddAddress';

const PersonalInfo = props => {
  const baseViewRef = useRef(null);
  const addAddressModalRef = useRef(null);

  const dispatch = useDispatch();

  const profilePersonalInfo = useSelector(
    state => state.profile.profilePersonalInfo,
  );

  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [address, setAddress] = useState(null);
  const [primaryCountryCode, setPrimaryCountryCode] = useState(null);
  const [primaryPhone, setPrimaryPhone] = useState('');
  const [alternateCountryCode, setAlternateCountryCode] = useState(null);
  const [alternatePhone, setAlternatePhone] = useState('');
  const [email, setEmail] = useState('johndoe@gmail.com');
  const [designation, setDesignation] = useState('React Native Developer');
  const [isValid, setIsValid] = useState(null);
  const [flag, setFlag] = useState(0);

 
  useEffect(() => {
    // _setInitialData()

    _init();
    return () => {};
  }, []);

  const _init = () => {
    if (profilePersonalInfo !== null) {
      setFirstName(profilePersonalInfo.firstName);
      setLastName(profilePersonalInfo.lastName);
      setAddress(profilePersonalInfo.address);
      setEmail(profilePersonalInfo.email);
      setPrimaryCountryCode(profilePersonalInfo.primaryCountryCode);
      setPrimaryPhone(profilePersonalInfo.primaryPhone);
      setAlternateCountryCode(profilePersonalInfo.alternateCountryCode);
      setAlternatePhone(profilePersonalInfo.alternatePhone);
      setDesignation(profilePersonalInfo.designation);
    }
  };

  // const _setInitialData = () => {
  //     setFirstName('John')
  //     setLastName('Doe')
  //     setAddress({addressLine1 : '713 Clay Street',addressLine2: "Bush Street Tenderloin",county : 'San Francisco', city: "San Francisco", state: "California", postalCode: "94102", country: "United States"})
  //     setEmail('johmsmith@dow.com')
  // }

  const validatePhoneNumber=(isValid,flag)=>{
    setIsValid(isValid);
    setFlag(flag);
  }

  const _onSave = () => {
    debugger;
    if (baseViewRef !== null) {
      const data = {
        firstName,
        lastName,
        address,
        primaryCountryCode,
        primaryPhone,
        alternateCountryCode,
        alternatePhone,
        email,
        designation,
      };
      if(isValid==false){
        flag==1?showAlert('error','Invalid Primary Phone Number'): showAlert('error','Invalid  Alternate Phone Number');
        return;
      }
      console.log('[PersonalInfo.js] : ', data);
      dispatch(setProfilePersonalInfo(data));
      showAlert('success', 'Contact Info Updated Successfully!');
      props.navigation.goBack();
    }
  };

  const _onChooseLocationFromMap = () => {
      // debugger;
    props.navigation.navigate('SelectAddress', {
      onGoBack: _setAddress,
    });
  };

  const _setAddress = address => {
    // debugger;
    console.log('[ProfilePersonalInfo.js] on Set Address : ', address);
    setAddress(address);
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Contact Info">
      <Formik
        initialValues={{
          firstName: firstName,
          lastName: lastName,
          address: address,
          mobile: primaryPhone,
          email: email,
          designation : designation
        }}
        validationSchema={profilePersonalInfoValidationSchema}
        onSubmit={() => _onSave()}
        enableReinitialize>
        {({handleSubmit, errors, touched}) => (
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{paddingBottom: 96}}>
              <View style={styles.parent}>
                <View style={[styles.row, {marginTop: 0}]}>
                  <InputView
                    label={'First Name'}
                    placeholder={'First Name'}
                    value={firstName}
                    onChangeText={text =>
                      setFirstName(acceptOnlyCharacters(text))
                    }
                    error={errors.firstName}
                    touched={touched.firstName}
                    parentStyle={styles.rightMargin}
                    required
                  />
                  <InputView
                    label={'Last Name'}
                    placeholder={'Last Name'}
                    parentStyle={[styles.leftMargin]}
                    value={lastName}
                    onChangeText={text =>
                      setLastName(acceptOnlyCharacters(text))
                    }
                    error={errors.lastName}
                    touched={touched.lastName}
                    required
                  />
                </View>

                <PhoneView
                  countryCode={primaryCountryCode}
                  label={'Primary Phone'}
                  placeholder={'Primary Phone'}
                  setCountry={code => setPrimaryCountryCode(code)}
                  value={primaryPhone}
                  onChangeText={text => setPrimaryPhone(text)}
                  error={errors.mobile}
                  touched={touched.mobile}
                  required
                  setIsValid={isValid=>validatePhoneNumber(isValid,1)}
        
                />

                <PhoneView
                  countryCode={alternateCountryCode}
                  label={'Alternate Phone'}
                  placeholder={'Alternate Phone'}
                  setCountry={code => setAlternateCountryCode(code)}
                  value={alternatePhone}
                  onChangeText={text => setAlternatePhone(text)}
                  setIsValid={isValid=>validatePhoneNumber(isValid,2)}
                 
                />

                {/* <InputView
                  label={'Email'}
                  placeholder={'Email'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                  keyboardType="email-address"
                  error={errors.email}
                  touched={touched.email}
                  parentStyle={styles.topMargin}
                  // editable={false}
                /> */}

                <InputView
                  label={'Email'}
                  placeholder={'Email'}
                  value={email}
                  onChangeText={text => setEmail(text)}
                  error={errors.email}
                  touched={touched.email}
                  parentStyle={styles.topMargin}
                  required
                />

                <AddAddressView
                  address={address}
                  error={errors.address}
                  touched={touched.address}
                  onAddAddress={() => _onChooseLocationFromMap()}
                  onEdit={() => {
                    if (addAddressModalRef !== null) {
                      addAddressModalRef.current.baseModal.showModal();
                      addAddressModalRef.current.init(address);
                    }
                  }}
                />

                <InputView
                  label={'Designation'}
                  placeholder={'Designation'}
                  value={designation}
                  onChangeText={text => setDesignation(text)}
                  error={errors.designation}
                  touched={touched.designation}
                  parentStyle={styles.topMargin}
                  required
                />
              </View>
              <ButtonView
              title="Save"
              containerStyle={[
                styles.topMargin,
                {position: 'absolute', bottom: 20, left: 24, right: 24},
              ]}
              parentStyle={{backgroundColor: colors.accent}}
              onPress={() => handleSubmit()}
            />
            </ScrollView>
          </View>
        )}
      </Formik>

      <AddAddress
        ref={addAddressModalRef}
        onSavePress={address => setAddress(address)}
      />
    </BaseView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    marginTop: 16,
  },
  topMargin: {
    marginTop: 16,
  },
  rightMargin: {
    marginRight: 8,
    flex: 1,
  },
  leftMargin: {
    marginLeft: 8,
    flex: 1,
  },
  addAddressText: {
    fontSize: 16,
    fontFamily: fonts.notoSansMedium,
    color: colors.darkBlueColor,
    paddingLeft: 8,
  },
  addAddressView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    alignSelf: 'flex-end',
  },
  uploadImageView: {
    height: 164,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e7e7e7',
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.notoSansRegular,
    paddingBottom: 4,
    color: '#3C4043',
  },
  image: {
    height: 164,
    width: '100%',
    borderRadius: 4,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  imageView: {
    width: '30%',
    marginRight: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 4,
  },
});
