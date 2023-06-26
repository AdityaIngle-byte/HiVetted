import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileLanguages} from '../../../../../../redux/actions/profileActions';
// import {setExtraData} from '../../../../../redux/actions/homeActions';
import {resumeLanguageValidationSchema} from '../../../../../../utils/formikValidations';
// import {generateRandomString} from '../../../../../utils/Validations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
// import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
// import DatePickerModal from '../../../../modals/DatePickerModal';
// import CheckBoxView from '../../../../components/CheckBoxView';
import {showAlert} from '../../../../../../utils/Message';
import {CheckBox} from 'react-native-elements';
import { generateRandomString } from '../../../../../../utils/Validations';

const AddLanguage = props => {
  const baseViewRef = useRef(null);
  const datePickerModal = useRef(null);

  const dispatch = useDispatch();

  const profileLanguages = useSelector(state => state.profile.profileLanguages);
  const extraData = useSelector(state => state.home.extraData);

  const [language, setLanguage] = useState('');
  const [canRead, setCanRead] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const [canWrite, setCanWrite] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const _onSave = () => {
    var duplicate = false;
    if (!canRead && !canSpeak && !canWrite) {
      showAlert('error', 'Please Select Minimum one Language option');
    } else {
      if (baseViewRef !== null) {
        // baseViewRef.current.showLoader();
        profileLanguages.forEach((currentValue,index)=>{
          //  if(currentValue.graduatedYear==graduatedYear && currentValue.educationType == educationType && currentValue.educationProgram == educationProgram && currentValue.school ==school && currentValue.major ==school){
          //    alert("Everything saME");
          //  }
          if(currentValue.languagename==language ){
            duplicate = true;
          }
          })
          //   baseViewRef.current.showLoader();
          if(duplicate==true){
            showAlert('error', 'Entry '+language+ ' already exists');
            return;
          }else{
            const data = {
              languagename: language,
              read: canRead ? 'Yes' : 'No',
              speak: canSpeak ? 'Yes' : 'No',
              write: canWrite ? 'Yes' : 'No',
              id: `language_${generateRandomString(20)}`,
            };
            const list = [data, ...profileLanguages];
    
            // updateLanguages(list)
            //   .then(response => {
            //     baseViewRef.current.hideLoader();
            //     console.log('[AddLanguage.js] Response: ', response);
            dispatch(setProfileLanguages(list));
            showAlert('success', 'Language Added!');
          }
       
        //     setTimeout(() => {
        //       baseViewRef.current.successModal.baseModal.showModal();
        //       baseViewRef.current.successModal.init(
        //         'Language Added!',
        //         language,
        //       );
        //     }, 500);
        //     _onReset();
        //   })
        //   .catch(error => {
        //     baseViewRef.current.hideLoader();
        //     console.log('[AddLanguage.js] Error: ', error);
        //   });

        //
        // dispatch(setProfileLanguages(list))
        // dispatch(setExtraData(!extraData))
      }
    }
  };

  const _onReset = () => {
    setLanguage('');
    setCanRead(false);
    setCanSpeak(false);
    setCanWrite(false);
  };

  return (
    <BaseView ref={baseViewRef} parentStyle={styles.parent}>
      <TitleRow
        title={`Add Language`}
        disabled={0}
        hasIcon
        onTitlePress={() => setIsCollapsed(prevState => !prevState)}
        hasReset={!isCollapsed}
        onReset={() => _onReset()}
      />

      <Collapsible collapsed={isCollapsed}>
        <Formik
          initialValues={{
            language: language,
          }}
          validationSchema={resumeLanguageValidationSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <InputView
                label={'Language'}
                placeholder={'English, Spanish etc'}
                parentStyle={styles.topMargin}
                value={language}
                onChangeText={text => setLanguage(text)}
                // isRequired
                error={errors.language}
                touched={touched.language}
                textInputViewStyle={{backgroundColor: '#fff', borderRadius: 8}}
                required
              />

              <View style={{}}>
                <CheckBox
                  title="Read"
                  checked={canRead}
                  onPress={() => setCanRead(prevState => !prevState)}
                />
                <CheckBox
                  title="Speak"
                  checked={canSpeak}
                  onPress={() => setCanSpeak(prevState => !prevState)}
                />
                <CheckBox
                  title="Write"
                  checked={canWrite}
                  onPress={() => setCanWrite(prevState => !prevState)}
                />
              </View>

              <ButtonView
                title="Add Language"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop: 24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>
    </BaseView>
  );
};

export default AddLanguage;

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
    marginTop: 0,
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
