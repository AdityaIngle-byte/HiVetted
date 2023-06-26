import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileExperiences} from '../../../../../../redux/actions/profileActions';
import {profileExperienceValidationSchema} from '../../../../../../utils/formikValidations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
import PickerView from '../../../../../components/PickerView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
// import CheckBoxView from '../../../../../components/CheckBoxView';
import {profileStyles} from '../profileStyles';
// import DatePickerModal from '../../../../../modals/DatePickerModal';
import SingleSelectModal from '../../../../../modals/SingleSelectModal';
import {jobTypesJson} from '../../../../../../json/jobTypesJson';
import {CheckBox} from 'react-native-elements';
import DatePickerModal from '../../../../../modals/DatePickerModal';
import {showAlert} from '../../../../../../utils/Message';
import { validateDate } from './ValidateDate';
import { generateRandomString } from '../../../../../../utils/Validations';

const AddExperience = props => {
  const baseViewRef = useRef(null);
  const datePickerModal = useRef(null);
  const singleSelectModal = useRef(null);

  const dispatch = useDispatch();

  const profileExperiences = useSelector(
    state => state.profile.profileExperiences,
  );
  //   const extraData = useSelector(state => state.home.extraData);

  const [employerName, setEmployerName] = useState('ETeaminc');
  const [designation, setDesignation] = useState('Mobile Developer');
  const [durationFrom, setDurationFrom] = useState('02-09-2021');
  const [durationTo, setDurationTo] = useState('02-09-2021');
  const [durationFromTimeStamp, setDurationFromTimeStamp] = useState(null);
  const [durationToTimeStamp, setDurationToTimeStamp] = useState(null);
  const [industry, setIndustry] = useState('Information Technology');
  const [description, setDescription] = useState(
    "Looking to boost students’ satisfactions scores for ABC University. Bachelor's degree in communications.",
  );

  //   const [employerName, setEmployerName] = useState('');
  //   const [designation, setDesignation] = useState('');
  //   const [durationFrom, setDurationFrom] = useState('');
  //   const [durationTo, setDurationTo] = useState('');
  //   const [industry, setIndustry] = useState('');
  //   const [description, setDescription] = useState('');
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [flag, setFlag] = useState(0);

  const _setDate = (date,timestamp) => {
    if (flag === 1) {
      setDurationFrom(date);
      setDurationFromTimeStamp(timestamp);
    } else {
      setDurationTo(date);
      setDurationToTimeStamp(timestamp)
    }
  };

  const _onSave = () => {
    // alert('Save')
    console.log('[AddExperience.js] on update Experience called');
    if (baseViewRef !== null) {
      const invalidDate=validateDate(durationFromTimeStamp,durationToTimeStamp);
      
      var duplicate = false;
      if(invalidDate==true){showAlert('error','Invalid Date');return}

      profileExperiences.forEach((currentValue,index)=>{
        //  if(currentValue.graduatedYear==graduatedYear && currentValue.educationType == educationType && currentValue.educationProgram == educationProgram && currentValue.school ==school && currentValue.major ==school){
        //    alert("Everything saME");
        //  }
        if(currentValue.employerName==employerName && currentValue.jobTitle == designation && currentValue.startDate == durationFrom && currentValue.industry ==industry){
          duplicate = true;
        }
        })
        //   baseViewRef.current.showLoader();
        if(duplicate==true){
          showAlert('error', 'Entry '+employerName+ ' already exists');
          return;
        }else{
          const data = {
            employerName: employerName,
            jobTitle: designation,
            startDate: durationFrom,
            endDate: durationTo,
            description,
            industry,
            isSelect: isCurrentlyWorking,
            id: `profile_${generateRandomString(20)}`,
          };
          const list = [data, ...profileExperiences];
          //   updateWorkExperience(list)
          //     .then(response => {
          //       baseViewRef.current.hideLoader();
          dispatch(setProfileExperiences(list));
          showAlert('success', 'Experience Added!');
          console.log('[AddExperience.js] on update Experience: ', list);
        }
      
    }
  };

  const _onReset = () => {
    setEmployerName('');
    setDesignation('');
    setIndustry('');
    setDurationFrom('');
    setDurationTo('');
    setIsCurrentlyWorking(false);
    setDescription('');
  };

  return (
    <BaseView ref={baseViewRef} parentStyle={styles.parent}>
      <TitleRow
        title={'Add Experience'}
        disabled={0}
        hasIcon
        onTitlePress={() => setIsCollapsed(prevState => !prevState)}
        hasReset={!isCollapsed}
        onReset={() => _onReset()}
      />

      <Collapsible collapsed={isCollapsed}>
        <Formik
          initialValues={{
            employerName,
            designation,
          }}
          validationSchema={profileExperienceValidationSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <View style={styles.row}>
                <InputView
                  label="Employer Name"
                  placeholder="Employer Name"
                  parentStyle={styles.rightMargin}
                  value={employerName}
                  onChangeText={text => setEmployerName(text)}
                  // isRequired
                  error={errors.employerName}
                  touched={touched.employerName}
                />
                <InputView
                  label="Designation"
                  placeholder="Designation"
                  parentStyle={styles.leftMargin}
                  value={designation}
                  onChangeText={text => setDesignation(text)}
                  // isRequired
                  error={errors.designation}
                  touched={touched.designation}
                />
              </View>
              <PickerView
                label={'Industry'}
                value={industry !== '' ? industry : 'Select'}
                onPress={() => {
                  if (singleSelectModal !== null) {
                    singleSelectModal.current.baseModal.showModal();
                    singleSelectModal.current.init(jobTypesJson);
                  }
                }}
                parentStyle={styles.topMargin}
              />

              <View style={[styles.row, styles.topMargin]}>
                <PickerView
                  label={'Duration From'}
                  value={durationFrom === '' ? 'Select' : durationFrom}
                  parentStyle={styles.rightMargin}
                  pickerStyle={{height: 56}}
                  onPress={() => {
                    setFlag(1);
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                />
                <PickerView
                  label={'Duration To'}
                  value={durationTo === '' ? 'Select' : durationTo}
                  parentStyle={styles.leftMargin}
                  pickerStyle={{height: 56}}
                  onPress={() => {
                    setFlag(2);
                    if (datePickerModal !== null) {
                      datePickerModal.current.showModal();
                    }
                  }}
                  disabled={isCurrentlyWorking}
                />
              </View>

              <CheckBox
                title="Currently Employer"
                checked={isCurrentlyWorking}
                onPress={() => setIsCurrentlyWorking(prevState => !prevState)}
              />

              <InputView
                label="Description"
                placeholder="Write about your experience..."
                parentStyle={styles.topMargin}
                value={description}
                onChangeText={text => setDescription(text)}
                // textInputStyle={profileStyles.multiLineTextInputStyle}
                // viewStyle={profileStyles.multiLineTextInputStyle}
                // multiline
                // numOfLines={100}
              />

              <ButtonView
                title="Add Experience"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop: 24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>

      <DatePickerModal ref={datePickerModal} setDate={_setDate} disableFutureDates/>

      <SingleSelectModal
        ref={singleSelectModal}
        onSetItem={item => setIndustry(item.name)}
      />
    </BaseView>
  );
};

export default AddExperience;

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
