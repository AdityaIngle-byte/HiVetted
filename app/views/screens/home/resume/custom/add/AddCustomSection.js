import {Formik} from 'formik';
import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {useDispatch, useSelector} from 'react-redux';
import {setProfileCustomSections} from '../../../../../../redux/actions/profileActions';
import {profileCustomSectionValidationSchema} from '../../../../../../utils/formikValidations';
import {showAlert} from '../../../../../../utils/Message';
// import { setExtraData } from '../../../../../redux/actions/homeActions';
// import { generateRandomString } from '../../../../../utils/Validations';
import ButtonView from '../../../../../components/ButtonView';
import InputView from '../../../../../components/InputView';
import BaseView from '../../../../../hoc/BaseView';
import TitleRow from '../items/TitleRow';
import {profileStyles} from '../profileStyles';

const AddCustomSection = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileCustomSections = useSelector(
    state => state.profile.profileCustomSections,
  );
  const extraData = useSelector(state => state.home.extraData);

  const [heading, setHeading] = useState('Publication');
  const [subHeading, setSubHeading] = useState('My Publications')
  const [description, setDescription] = useState(`1. Leadbetter, C. and Locklin, G. "5G as Disruptive Technology." Journal of Applied Technology 86.5 (2015): 118-25.\n2. Farazi, L. and Marden, K. "Turbulence and Viscosity Models in Engineering." AIAA Journal 86.5 (2017): 95-107.\n3. Diversi, K. and Johnson, S. "Textual and visual programming environments and the end user." International Symposium on End User Development 7898 (2014): 22-29.`)

//   const [heading, setHeading] = useState('');
//   const [subHeading, setSubHeading] = useState('');
//   const [description, setDescription] = useState('');

  const [isCollapsed, setIsCollapsed] = useState(false);

  const _onSave = () => {
    if (baseViewRef !== null) {
      // baseViewRef.current.showLoader()

      const data = {
        // 'id' : generateRandomString(3),
        title: heading,
        subheading: subHeading,
        sampledesc: description,
      };

      const list = [data, ...profileCustomSections];

      // updateCustomSections(list)
      //     .then(response => {
      //         baseViewRef.current.hideLoader()
      //         console.log('[AddCustomSection.js] Response: ',response)
      dispatch(setProfileCustomSections(list));
      showAlert('success', 'Section Added!');
      //         setTimeout(() =>{
      //             baseViewRef.current.successModal.baseModal.showModal()
      //             baseViewRef.current.successModal.init('Section Added!',heading)
      //         },500)
      //         _onReset()
      //     })
      //     .catch(error => {
      //         baseViewRef.current.hideLoader()
      //         console.log('[AddCustomSection.js] Error: ',error)
      //     })
      //
      // dispatch(setProfileCustomSections(list))
      // dispatch(setExtraData(!extraData))
      // _onReset()
      // baseViewRef.current.hideLoader()
      // setTimeout(() =>{
      //     baseViewRef.current.successModal.baseModal.showModal()
      //     baseViewRef.current.successModal.init('Section Added!',heading)
      // },500)
    }
  };

  const _onReset = () => {
    setHeading('');
    setSubHeading('');
    setDescription('');
  };

  return (
    <BaseView ref={baseViewRef} parentStyle={styles.parent}>
      <TitleRow
        title={`Add Custom Section`}
        disabled={0}
        hasIcon
        onTitlePress={() => setIsCollapsed(prevState => !prevState)}
        hasReset={!isCollapsed}
        onReset={() => _onReset()}
      />

      <Collapsible collapsed={isCollapsed}>
        <Formik
          initialValues={{
            heading: heading,
            description: description,
          }}
          validationSchema={profileCustomSectionValidationSchema}
          onSubmit={() => _onSave()}
          enableReinitialize>
          {({handleSubmit, errors, touched}) => (
            <View>
              <InputView
                label={'Section Title'}
                placeholder={'Section Title (Mandatory)'}
                style={[styles.topMargin]}
                value={heading}
                onChangeText={text => setHeading(text)}
                error={errors.heading}
                touched={touched.heading}
              />
              <InputView
                label={'Sub Heading'}
                placeholder={'Sub Heading'}
                style={styles.topMargin}
                value={subHeading}
                onChangeText={text => setSubHeading(text)}
              />
              <InputView
                label="Description"
                placeholder="write your description here..."
                viewStyle={{height: 172}}
                parentStyle={{marginTop: 16}}
                textInputStyle={profileStyles.multiLineTextInputStyle}
                multiline
                value={description}
                onChangeText={text => setDescription(text)}
                error={errors.description}
                touched={touched.description}
              />

              <ButtonView
                title="Add Custom Section"
                onPress={() => handleSubmit()}
                containerStyle={{marginTop:24}}
              />
            </View>
          )}
        </Formik>
      </Collapsible>
    </BaseView>
  );
};

export default AddCustomSection;

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
});
