import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Icon, Image} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {showAlert} from '../../../../../utils/Message';
// import {workExperienceJson} from '../../../../json/workExperience';
import {setProfileStory} from '../../../../../redux/actions/profileActions';
// import {profilePersonalInfoValidationSchema} from '../../../../utils/formikValidations';
// import {acceptOnlyCharacters} from '../../../../utils/Validations';
import {colors} from '../../../../../values/colors';
// import {fonts} from '../../../../values/fonts';
// import AddAddressView from '../../../components/AddAddressView';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
// import PhoneView from '../../../components/PhoneView';
// import PickerView from '../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
// import ImagePickerModal from '../../../modals/ImagePickerModal';
// import SingleSelectModal from '../../../modals/SingleSelectModal';
// import AddAddress from '../../common/AddAddress';
import {profileStyles} from './profileStyles';

const ProfileStory = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  //   const profileStory = useSelector(state => state.profile.profileStory);

  const [story, setStory] = useState('');

  useEffect(() => {
    _setInitialData();

    // _init();
    return () => {};
  }, []);

  //   const _init = () => {
  //     if (profileStory !== '') {
  //       setStory(profileStory);
  //     }
  //   };

  const _setInitialData = () => {
    setStory(
      'Sr. Mobile Application Developer with above 8 years of experience in the Manufacturing domain as Software Developer with 5+ years on Designing and Development of Android & iOS Applications for Smartphone and tablet and around 3+ years on Java-based applications. Very good understanding of Android Back-end and UI guidelines. Expertise in developing apps using SQLite, Java, XML, Google Maps API and GPS Location Data.',
    );
  };

  const _onSave = () => {
    // if (baseViewRef !== null) {
    //   baseViewRef.current.showLoader();
    //   updateStoryInfo(story)
    //     .then(response => {
    //       baseViewRef.current.hideLoader();
    dispatch(setProfileStory(story));
    showAlert('success', 'Story Updated Successfully!');
    props.navigation.goBack();
    //       setTimeout(() => {
    //         baseViewRef.current.successModal.baseModal.showModal();
    //         baseViewRef.current.successModal.init(
    //           'Success!',
    //           `Story Updated Successfully!`,
    //         );
    //       }, 500);
    //     })
    //     .catch(error => {
    //       baseViewRef.current.hideLoader();
    //     });
    // }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Story Info">
      <View style={{flex: 1, marginTop: 16, marginHorizontal: 16}}>
        <InputView
          label="My Story (Summary)"
          placeholder="write your story here..."
          parentStyle={{marginTop:0}}
          viewStyle={[profileStyles.multiLineTextInputStyle, {height: 360}]}
          textInputStyle={[
            profileStyles.multiLineTextInputStyle,
            {height: 360},
          ]}
          multiline
          blurOnSubmit
          value={story}
          onChangeText={text => setStory(text)}
        />
      </View>
      <ButtonView
          title="Save"
          containerStyle={[
            styles.topMargin,
            {position: 'absolute', bottom: 24, left: 24, right: 24},
          ]}
          parentStyle={{backgroundColor: colors.accent}}
          onPress={() => _onSave()}
      />
    </BaseView>
  );
};

export default ProfileStory;

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 16,
  },
});
