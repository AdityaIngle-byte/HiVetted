import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View,useColorScheme} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileSocialMedia} from '../../../../../redux/actions/profileActions';
import {socialMediaValidationSchema} from '../../../../../utils/formikValidations';
import {showAlert} from '../../../../../utils/Message';
import {colors} from '../../../../../values/colors';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import BaseView from '../../../../hoc/BaseView';

const SocialMedia = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileSocialMedia = useSelector(
    state => state.profile.profileSocialMedia,
  );

  // const [linkedIn, setLinkedIn] = useState('');
  // const [website, setWebsite] = useState('');

  const [linkedIn, setLinkedIn] = useState('www.linkedin.com');
  const [website, setWebsite] = useState('www.sunny.com');

  useEffect(() => {
    // _setInitialData()

    _init();
    return () => {};
  }, []);

  const _init = () => {

    if (profileSocialMedia !== null) {
      setLinkedIn(profileSocialMedia.linkedIn);
      setWebsite(profileSocialMedia.website);
    }
  };

  // const _setInitialData = () => {

  //     setLinkedIn('johndoe@linkedIn')
  //     setWebsite('http://www.johndoe.com')
  // }

  const _onSave = () => {
    //
    // props.navigation.goBack()
    // baseViewRef.current.showLoader();
    // updateSocialMedia(linkedIn, website)
    //   .then(response => {
    //     baseViewRef.current.hideLoader();
    //     console.log('[SocialMedia.js] On Update Social Media : ', response);
    const data = {
      linkedIn,
      website,
    };
    dispatch(setProfileSocialMedia(data));
    showAlert('success', 'Data Updated.');
    //     setTimeout(() => {
    //       baseViewRef.current.successModal.baseModal.showModal();
    //       baseViewRef.current.successModal.init('Success!', `Data Updated.`);
    //     }, 500);
    //   })
    //   .catch(error => {
    //     baseViewRef.current.hideLoader();
    //     console.log('[SocialMedia.js] On Update Social Media Error: ', error);
    //   });
    props.navigation.goBack()
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Social Info">
      <Formik
        initialValues={{
          linkedIn: linkedIn,
          website: website,
        }}
        validationSchema={socialMediaValidationSchema}
        onSubmit={() => _onSave()}
        enableReinitialize>
        {({handleSubmit, errors, touched}) => (
          <View style={{flex: 1, marginHorizontal: 16}}>
            <InputView
              label={'Social Media Profile Link'}
              placeholder={'Social Id'}
              value={linkedIn}
              onChangeText={text => setLinkedIn(text)}
              style={styles.topMargin}
              error={errors.linkedIn}
              touched={touched.linkedIn}
            />
            <InputView
              label={'Website'}
              placeholder={'Website'}
              value={website}
              onChangeText={text => setWebsite(text)}
              style={styles.topMargin}
              error={errors.website}
              touched={errors.website}
            />
            <ButtonView
              title="Save"
              containerStyle={[
                styles.topMargin,
                {position: 'absolute', bottom: 24, left: 24, right: 24},
              ]}
              parentStyle={{backgroundColor: colors.accent}}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default SocialMedia;

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 16,
    color:"black"
  },
});
