import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileLicenses} from '../../../../../../redux/actions/profileActions';
import {profileLicenseValidationSchema} from '../../../../../../utils/formikValidations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
import PickerView from '../../../../../components/PickerView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import DatePickerModal from '../../../../../modals/DatePickerModal';
import {showAlert} from '../../../../../../utils/Message';
import { validateDate } from './ValidateDate';
import { generateRandomString } from '../../../../../../utils/Validations';

const AddLicense = props => {
  const baseViewRef = useRef(null);
  const datePickerModal = useRef(null);

  const dispatch = useDispatch();

  const profileLicenses = useSelector(state => state.profile.profileLicenses);
  const extraData = useSelector(state => state.home.extraData);

  const [licenseName, setLicenseName] = useState('Office 365');
  const [licenseNumber, setLicenseNumber] = useState('#1211211');
  const [state, setState] = useState('NewYork');
  const [startDate, setStartDate] = useState('09-14-2021');
  const [expiryDate, setExpiryDate] = useState('09-14-2021');
  const [durationFromTimeStamp, setDurationFromTimeStamp] = useState(null);
  const [durationToTimeStamp, setDurationToTimeStamp] = useState(null);

//   const [licenseName, setLicenseName] = useState('');
//   const [licenseNumber, setLicenseNumber] = useState('');
//   const [state, setState] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [flag, setFlag] = useState(0);

  const _setDate = (date,timestamp) => {
    if (flag === 1) {
      setStartDate(date);
      setDurationFromTimeStamp(timestamp);
    } else {
      setExpiryDate(date);
      setDurationToTimeStamp(timestamp);
    }
  };

  const _onSave = () => {
    var duplicate = false;
    if (baseViewRef !== null) {
      //   baseViewRef.current.showLoader();
      const invalidDate=validateDate(durationFromTimeStamp,durationToTimeStamp);
      if(invalidDate==true){showAlert('error','Invalid Date');return}
      profileLicenses.forEach((currentValue,index)=>{
        //  if(currentValue.graduatedYear==graduatedYear && currentValue.educationType == educationType && currentValue.educationProgram == educationProgram && currentValue.school ==school && currentValue.major ==school){
        //    alert("Everything saME");
        //  }
        if(currentValue.licenseName==licenseName && currentValue.license == licenseNumber && currentValue.state == state && currentValue.startDate ==startDate && currentValue.expiryDate==expiryDate){
          duplicate = true;
        }
        })
        //   baseViewRef.current.showLoader();
        if(duplicate==true){
          showAlert('error', 'Entry '+licenseName+ ' already exists');
          return;
        }else{
          const data = {
            licenseName,
            license: licenseNumber,
            state,
            startDate,
            expiryDate,
            id: `license_${generateRandomString(20)}`,
          };
    
          const list = [data, ...profileLicenses];
    
          //   updateLicenses(list)
          //     .then(response => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[AddLicense.js] Response: ', response);
          dispatch(setProfileLicenses(list));
          showAlert('success', 'License Added!');
        }
     
      //       setTimeout(() => {
      //         baseViewRef.current.successModal.baseModal.showModal();
      //         baseViewRef.current.successModal.init(
      //           'License Added!',
      //           licenseName,
      //         );
      //       }, 500);
      //       _onReset();
      //     })
      //     .catch(error => {
      //       baseViewRef.current.hideLoader();
      //       console.log('[AddLicense.js] Error: ', error);
      //     });

      //
      //
      // dispatch(setExtraData(!extraData))
    }
  };

  const _onReset = () => {
    setLicenseName('');
    setLicenseNumber('');
    setState('');
    setStartDate('');
    setExpiryDate('');
  };

  return (
    <BaseView ref={baseViewRef} parentStyle={styles.parent}>
      <TitleRow
        title={`Add License`}
        disabled={0}
        hasIcon
        onTitlePress={() => setIsCollapsed(prevState => !prevState)}
        hasReset={!isCollapsed}
        onReset={() => _onReset()}
      />

      <Collapsible collapsed={isCollapsed}>
        <Formik
          initialValues={{
            licenseName,
            licenseNumber,
            state,
            startDate,
            expiryDate,
          }}
          validationSchema={profileLicenseValidationSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <InputView
                label="License Name"
                placeholder="License Name"
                value={licenseName}
                onChangeText={text => setLicenseName(text)}
                // isRequired
                error={errors.licenseName}
                touched={touched.licenseName}
              />
              <View style={[styles.row]}>
                <InputView
                  label="License Number"
                  placeholder="License Number"
                  parentStyle={styles.rightMargin}
                  value={licenseNumber}
                  onChangeText={text => setLicenseNumber(text)}
                  // isRequired
                  error={errors.licenseNumber}
                  touched={touched.licenseNumber}
                />
                <InputView
                  label="State"
                  placeholder="State"
                  parentStyle={styles.leftMargin}
                  value={state}
                  onChangeText={text => setState(text)}
                  // isRequired
                  error={errors.state}
                  touched={touched.state}
                />
              </View>

              <View style={[styles.row, styles.topMargin]}>
                <PickerView
                  label={'Start Date'}
                  value={startDate === '' ? 'Start Date' : startDate}
                  parentStyle={styles.rightMargin}
                  //   pickerStyle={{height: 56}}
                  onPress={() => {
                    setFlag(1);
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                  error={errors.startDate}
                  touched={touched.startDate}
                />
                <PickerView
                  label={'Expiry Date'}
                  value={expiryDate === '' ? 'Expiry Date' : expiryDate}
                  parentStyle={styles.leftMargin}
                  //   pickerStyle={{height: 56}}
                  onPress={() => {
                    setFlag(2);
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                  error={errors.expiryDate}
                  touched={touched.expiryDate}
                />
              </View>

              <ButtonView
                title="Add License"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop: 24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>

      <DatePickerModal ref={datePickerModal} setDate={_setDate} />
    </BaseView>
  );
};

export default AddLicense;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topMargin: {
    marginTop: 16,
  },
  leftMargin: {
    marginLeft: 8,
    flex: 1,
  },
  rightMargin: {
    marginRight: 8,
    flex: 1,
  },
});
