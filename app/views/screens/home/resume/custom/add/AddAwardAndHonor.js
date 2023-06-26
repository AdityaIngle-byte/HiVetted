import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileAwardsAndHonors} from '../../../../../../redux/actions/profileActions';
// import {setExtraData} from '../../../../../redux/actions/homeActions';
import {profileAwardsAndHonorSchema} from '../../../../../../utils/formikValidations';
// import {generateRandomString} from '../../../../../utils/Validations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
import PickerView from '../../../../../components/PickerView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import DatePickerModal from '../../../../../modals/DatePickerModal';
import {showAlert} from '../../../../../../utils/Message';
import { generateRandomString } from '../../../../../../utils/Validations';

const AddAwardAndHonor = props => {
  const baseViewRef = useRef(null);
  const datePickerModal = useRef(null);

  const dispatch = useDispatch();

  const profileAwardsAndHonorsList = useSelector(
    state => state.profile.profileAwardsAndHonorsList,
  );
  //   const extraData = useSelector(state => state.home.extraData);

  const [awardOrHonorName, setAwardOrHonorName] = useState('Saab Developer');
  const [issuedBy, setIssuedBy] = useState('ETeaminc');
  const [issueDate, setIssueDate] = useState('02-09-2021');

  //   const [awardOrHonorName, setAwardOrHonorName] = useState('');
  //   const [issuedBy, setIssuedBy] = useState('');
  //   const [issueDate, setIssueDate] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);

  const _onSave = () => {
    var duplicate = false;
    if (baseViewRef !== null) {
      //   baseViewRef.current.showLoader();
      profileAwardsAndHonorsList.forEach((currentValue,index)=>{
        //  if(currentValue.graduatedYear==graduatedYear && currentValue.educationType == educationType && currentValue.educationProgram == educationProgram && currentValue.school ==school && currentValue.major ==school){
        //    alert("Everything saME");
        //  }
        if(currentValue.awardname==awardOrHonorName && currentValue.IssuedBy == issuedBy && currentValue.issueddate == issueDate){
          duplicate = true;
        }
        })
        //   baseViewRef.current.showLoader();
        if(duplicate==true){
          showAlert('error', 'Entry '+awardOrHonorName+' already exists');
          return;
        }else{
          const data = {
            awardname: awardOrHonorName,
            IssuedBy: issuedBy,
            issueddate: issueDate,
            id: `Awards_${generateRandomString(20)}`,
          };
          const list = [data, ...profileAwardsAndHonorsList];
          //   updateAwardsAndHonors(list)
          //     .then(response => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[AddAwardAndHonor.js] Response: ', response);
          dispatch(setProfileAwardsAndHonors(list));
          showAlert('success', 'Award Added!');
        }
      
      //       // dispatch(setExtraData(!extraData))
      //       setTimeout(() => {
      //         baseViewRef.current.successModal.baseModal.showModal();
      //         baseViewRef.current.successModal.init(
      //           'Award Added!',
      //           `${awardOrHonorName} issued by ${issuedBy}`,
      //         );
      //       }, 500);
      //       _onReset();
      //     })
      //     .catch(error => {
      //       baseViewRef.current.hideLoader();
      //       console.log('[AddAwardAndHonor.js] Error: ', error);
      //     });
    }
  };

  const _onReset = () => {
    setAwardOrHonorName('');
    setIssuedBy('');
    setIssueDate('');
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
            awardOrHonorName,
            issuedBy,
            issueDate,
          }}
          validationSchema={profileAwardsAndHonorSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <InputView
                label="Award or Honor Name"
                placeholder="Award or Honor Name"
                value={awardOrHonorName}
                onChangeText={text => setAwardOrHonorName(text)}
                error={errors.awardOrHonorName}
                touched={touched.awardOrHonorName}
              />

              <View style={[styles.row, styles.topMargin]}>
                <InputView
                  label="Issued By"
                  placeholder="Issued By"
                  parentStyle={[styles.rightMargin, {marginTop: 0}]}
                  value={issuedBy}
                  onChangeText={text => setIssuedBy(text)}
                  // isRequired
                  error={errors.issuedBy}
                  touched={touched.issuedBy}
                />
                <PickerView
                  label={'Issue Date'}
                  value={issueDate === '' ? 'Issue Date' : issueDate}
                  parentStyle={styles.leftMargin}
                  //   pickerStyle={{height: 56}}
                  onPress={() => {
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                  error={errors.issueDate}
                  touched={touched.issueDate}
                />
              </View>

              <ButtonView
                title="Add Award/Honor"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop: 24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>

      <DatePickerModal
        ref={datePickerModal}
        setDate={date => setIssueDate(date)}
        disableFutureDates
      />
    </BaseView>
  );
};

export default AddAwardAndHonor;

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
