import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileCertificates} from '../../../../../../redux/actions/profileActions';
// import {setExtraData} from '../../../../../redux/actions/homeActions';
import {profileCertificateValidationSchema} from '../../../../../../utils/formikValidations';
import {generateRandomString} from '../../../../../../utils/Validations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
import PickerView from '../../../../../components/PickerView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import DatePickerModal from '../../../../../modals/DatePickerModal';
import {showAlert} from '../../../../../../utils/Message';
import { validateDate } from './ValidateDate';

const AddCertificate = props => {

  const baseViewRef = useRef(null);
  const datePickerModal = useRef(null);

  const dispatch = useDispatch();

  const profileCertificates = useSelector(
    state => state.profile.profileCertificates,
  );
  //   const extraData = useSelector(state => state.home.extraData);

  const [certificateName, setCertificateName] = useState('Azure')
  const [certificateNumber, setCertificateNumber] = useState('AZU1231')
  const [issuedBy, setIssuedBy] = useState('Google')
  const [issueDate, setIssueDate] = useState('01-03-2020')
  const [expiryDate, setExpiryDate] = useState('01-03-2020')
  const [durationFromTimeStamp, setDurationFromTimeStamp] = useState(null);
  const [durationToTimeStamp, setDurationToTimeStamp] = useState(null);

//   const [certificateName, setCertificateName] = useState('');
//   const [certificateNumber, setCertificateNumber] = useState('');
//   const [issuedBy, setIssuedBy] = useState('');
//   const [issueDate, setIssueDate] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [flag, setFlag] = useState(0);

  const _setDate = (date,timestamp) => {
    if (flag === 2) {
      setExpiryDate(date);
      setDurationToTimeStamp(timestamp);
    } else {
      setIssueDate(date);
      setDurationFromTimeStamp(timestamp);
    }
  };

  const _onSave = () => {
    var duplicate = false;
    if (baseViewRef !== null) {
      //   baseViewRef.current.showLoader();
      const invalidDate=validateDate(durationFromTimeStamp,durationToTimeStamp);
      if(invalidDate==true){showAlert('error','Invalid Date');return}
      profileCertificates.forEach((currentValue,index)=>{
        //  if(currentValue.graduatedYear==graduatedYear && currentValue.educationType == educationType && currentValue.educationProgram == educationProgram && currentValue.school ==school && currentValue.major ==school){
        //    alert("Everything saME");
        //  }
        if(currentValue.certificationName==certificateName && currentValue.certificateName == certificateNumber && currentValue.issuedby == issuedBy && currentValue.issueDate ==issueDate){
          duplicate = true;
        }
        })
        //   baseViewRef.current.showLoader();
        if(duplicate==true){
          showAlert('error', 'Entry '+certificateName+ ' already exists');
          return;
        }else{
          const data = {
            certificationName: certificateName,
            certificateName: certificateNumber,
            issuedby: issuedBy,
            expiryDate: expiryDate,
            issueDate: issueDate,
            id: `certificate_${generateRandomString(20)}`,
          };
    
          const list = [data, ...profileCertificates];
          console.log(list);
         
          dispatch(setProfileCertificates(list));
          showAlert('success', 'Certificate Added!');
        }
    }
  };

  const _onReset = () => {
    setCertificateName('');
    setCertificateNumber('');
    setIssuedBy('');
    setIssueDate('');
    setExpiryDate('');
  };

  return (
    <BaseView ref={baseViewRef} parentStyle={styles.parent}>
      <TitleRow
        title={`Add Certificate`}
        disabled={0}
        hasIcon
        onTitlePress={() => setIsCollapsed(prevState => !prevState)}
        hasReset={!isCollapsed}
        onReset={() => _onReset()}
      />

      <Collapsible collapsed={isCollapsed}>
        <Formik
          initialValues={{
            certificateName,
            certificateNumber,
            issuedBy,
            issueDate,
            expiryDate,
          }}
          validationSchema={profileCertificateValidationSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <View style={styles.row}>
                <InputView
                  label="Certificate Name"
                  placeholder="Certificate Name"
                  parentStyle={styles.rightMargin}
                  value={certificateName}
                  onChangeText={text => setCertificateName(text)}
                  // isRequired
                  error={errors.certificateName}
                  touched={touched.certificateName}
                />
                <InputView
                  label="Certificate no."
                  placeholder="Certificate no."
                  parentStyle={styles.leftMargin}
                  value={certificateNumber}
                  onChangeText={text => setCertificateNumber(text)}
                  // isRequired
                  error={errors.certificateNumber}
                  touched={touched.certificateNumber}
                />
              </View>
              <InputView
                label="Issued By"
                placeholder="Issued By"
                parentStyle={styles.topMargin}
                value={issuedBy}
                onChangeText={text => setIssuedBy(text)}
                // isRequired
                error={errors.issuedBy}
                touched={touched.issuedBy}
              />

              <View style={[styles.row, styles.topMargin]}>
                <PickerView
                  label={'Issue Date'}
                  value={issueDate === '' ? 'Issue Date' : issueDate}
                  parentStyle={styles.rightMargin}
                  pickerStyle={{height: 56}}
                  onPress={() => {
                    setFlag(1);
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                  error={errors.issueDate}
                  touched={touched.issueDate}
                />
                <PickerView
                  label={'Expiry Date'}
                  value={expiryDate === '' ? 'Expiry Date' : expiryDate}
                  parentStyle={styles.leftMargin}
                  pickerStyle={{height: 56}}
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
                title="Add Certificate"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop:24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>

      <DatePickerModal ref={datePickerModal} setDate={_setDate} />
    </BaseView>
  );
};

export default AddCertificate;

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
