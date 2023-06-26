import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CountriesWithCode from '../modals/CountriesWithCode';
import PickerView from './PickerView';
import {AsYouType} from 'libphonenumber-js';
import InputView from './InputView';

const PhoneView = props => {
  const {
    countryCode,
    label,
    value,
    onChangeText,
    error,
    touched,
    editable,
    setCountry,
    required,
    setIsValid
  } = props;
  const countriesRef = useRef(null);

  // const _code = countryCode !== null ? countryCode : null;

  // console.log('[PhoneNumberView.js]: ',countryCode)

  const [code, setCode] = useState(null);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (countryCode !== null) {
      setCode(countryCode);
    }
  });

  const _onChangeText = text => {
    debugger;
    const asYouType = new AsYouType(code.code);
    const formattedNumber = asYouType.input(text);
    const isValid = asYouType.isValid();
    // console.log('[PhoneNumberView.js] onChangeText :', formattedNumber,isValid)

    setPhone(formattedNumber);
    onChangeText(formattedNumber);
    setIsValid(isValid);
  };

  const _onSetCountryCode = data => {
    console.log('[PhoneView.js] Country Code:', data);
    setCode(data);
    setCountry(data);
    // setTimeout(() => {
    //     if(phone.length > 5){
    //         _onChangeText(phone)
    //     }
    // }, 1000);
  };

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        {/* ${code.flag}  */}
        <PickerView
          label={'Country'}
          value={code === null ? 'Select' : `${code.dial_code}`}
          parentStyle={{marginRight: 8}}
          pickerStyle={{height: 48, width: 108,flex:1}}
          onPress={() => countriesRef.current.baseModal.showModal()}
        />
        <InputView
          // {...props}
          parentStyle={{flex: 1, marginLeft: 8, marginTop:0}}
          label={props.label}
          onChangeText={text => _onChangeText(text)}
          placeholder={'1234567890'}
          value={value}
          editable={code === null ? false : true}
          error={error}
          touched={touched}
          maxLength={15}
          keyboardType={'phone-pad'}
          required={required}
        />
      </View>

      <CountriesWithCode ref={countriesRef} onItemPress={_onSetCountryCode} />
    </View>
  );
};

export default PhoneView;

const styles = StyleSheet.create({
  parent: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
  },
});
