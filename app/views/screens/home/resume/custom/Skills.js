import {Formik, setIn} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import { AirbnbRating } from 'react-native-elements'
import {useDispatch, useSelector} from 'react-redux';
import {jobTypesJson} from '../../../../../json/jobTypesJson';
import {setProfileSkills} from '../../../../../redux/actions/profileActions';
// import { setExtraData } from '../../../../redux/actions/homeActions'
// import {
//   updateSkills,
//   setProfileSkills,
// } from '../../../../redux/actions/profileActions';
import {profileSkillsValidationSchema} from '../../../../../utils/formikValidations';
import {
  showAlert,
  showAlertMessage,
  showConfirmAlert,
} from '../../../../../utils/Message';
import {generateRandomString} from '../../../../../utils/Validations';
import {colors} from '../../../../../values/colors';
import {fonts} from '../../../../../values/fonts';
import ButtonView from '../../../../components/ButtonView';
import InputView from '../../../../components/InputView';
import PickerView from '../../../../components/PickerView';
import BaseView from '../../../../hoc/BaseView';
import SingleSelectModal from '../../../../modals/SingleSelectModal';
// import SingleSelectModal from '../../../../modals/SingleSelectModal';
// import AddEducation from './add/AddEducation'
// import EducationItem from './items/EducationItem'
import ProfileSkillItem from './items/ProfileSkillItem';
// import TitleRow from './items/TitleRow'

const Skills = props => {
  const baseViewRef = useRef(null);
  const singleSelectModal = useRef(null);

  const dispatch = useDispatch();

  const profileSkills = useSelector(state => state.profile.profileSkills);
  // const extraData = useSelector(state => state.home.extraData)
  const [skillName, setSkillName] = useState('');
  // const [rating, setRating] = useState(3)
  const [industry, setIndustry] = useState('');
  const [skillsList, setSkillsList] = useState([]);

  const [flag, setFlag] = useState(0);

  useEffect(() => {
    init();
    return () => {};
  }, [init]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const init = () => {
    debugger;
    if (profileSkills !== null) {
      const industry =
        profileSkills.skillSet.length > 0 ? profileSkills.skillSet[0] : '';
      setIndustry(industry);

      const list = [];
      profileSkills.primarySkills.forEach(it => {
        const data = {
          id: `skill_${generateRandomString(20)}`,
          skill: it,
        };
        list.push(data);
      });

      setSkillsList(list);
    }
  };

  const _renderItem = (item, index) => {
    return (
      <ProfileSkillItem
        item={item}
        index={index}
        onDelete={() => _onDeleteSkill(item)}
        flag={flag}
        onSkillPress={() => {
          props.route.params.onGoBack(item);
          props.navigation.goBack();
        }}
      />
    );
  };

  const _onDeleteSkill = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.skill}"?`,
      () => {
        if (baseViewRef !== null) {
          const list = skillsList;
          const filteredList = list.filter(it => it.id !== item.id);
          showAlert('success', `${item.skill} Deleted Successfully!`);
          setSkillsList(filteredList);
        }
      },
    );
  };

  const _onAddSkill = () => {
    debugger;
    const filteredList = skillsList.filter(
      it =>
        it.skill.replace(' ', '').toLowerCase() ===
        skillName.replace(' ', '').toLowerCase(),
    );
    console.log(
      '[Skills.js] Filtered List : ',
      skillsList,
      skillName,
      filteredList,
    );
    // alert('Hi')
    if (filteredList.length < 1) {
      const item = {
        id: `skill_${generateRandomString(20)}`,
        skill: skillName,
        // rating : rating
      };
      showAlert('success', `${item.skill} Added Successfully!`);
      const list = [...skillsList, item];
      setSkillsList(list);
      setSkillName('');
    } else {
      showAlert('error', 'Skill ALready Added!');
    }

    // setSkillName('');
  };

  const _onReset = () => {
    showConfirmAlert(
      'Reset',
      'All Skills and Industry will be reset.Are you sure?',
      () => {
        setSkillsList([]);
        setSkillName('');
        setIndustry('');
        // dispatch(setProfileSkills(null))
      },
    );
  };

  const _onSave = () => {
    if (skillsList.length < 1) {
      showAlert('error', 'No Skills Added!');
    } else if (industry === '') {
      showAlert('error', 'No Industry Selected!');
    } else {
      // const _skills = {};
      const skills = [];
      skillsList.forEach(it => {
        skills.push(it.skill);
      });

      const data = {
        skillSet: [industry],
        primarySkills: skills,
      };

      console.log('[Skills.js] Data: ', data);
      // baseViewRef.current.showLoader();
      // updateSkills(data)
      //     .then(response => {
      dispatch(setProfileSkills(data));
      showAlert('success', 'Skills Updated Successfully.');
      //         console.log('[Skills.js] On Add Skills: ',response)
      //         baseViewRef.current.hideLoader()
      // setTimeout(() => {
      //   baseViewRef.current.successModal.baseModal.showModal();
      //   baseViewRef.current.successModal.init(
      //     'Success!',
      //     'Skills Updated Successfully.',
      //   );
      // }, 500);
      //     })
      //     .catch(error => {
      //         baseViewRef.current.hideLoader()
      //         console.log('[Skills.js] On Add Skills Error: ',error)
      //     })

      // dispatch(setProfileSkills(data))

      // if(baseViewRef !== null){
      //     baseViewRef.current.showLoader();

      //     setTimeout(() => {
      //         baseViewRef.current.hideLoader();

      //         setTimeout(() => {
      //             baseViewRef.current.successModal.baseModal.showModal()
      //             baseViewRef.current.successModal.init('Success!','Skills Updated Successfully.')
      //         },500)
      //     }, 2000);

      // }
      props.navigation.goBack()
    }
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Skills"
      rightComponent={
        <TouchableOpacity style={{padding: 8}} onPress={() => _onReset()}>
          <Text
            style={{color: colors.primary, fontFamily: fonts.notoSansMedium}}>
            Reset
          </Text>
        </TouchableOpacity>
      }>
      <ScrollView contentContainerStyle={{paddingBottom: 40}} style={{flex: 1}}>
        <Formik
          initialValues={{
            skill: skillName,
          }}
          validationSchema={profileSkillsValidationSchema}
          onSubmit={() => _onAddSkill()}
          enableReinitialize>
          {({handleSubmit, values, errors, touched}) => (
            <View style={styles.parent}>
              <View style={styles.inputWrapper}>
                  <InputView
                    label={'Skill Name'}
                    placeholder={'Skill Name'}
                    value={skillName}
                    onChangeText={text => setSkillName(text)}
                    error={errors.skill}
                    touched={touched.skill}
                    parentStyle={{marginTop: 0,flex:1}}
                    required
                  />
               
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.addSkill}>+ Add Skill</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.row}>
                        <Text style={styles.heading}>Proficiency</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={rating}
                            size={15}
                            starContainerStyle={{backgroundColor:'#f5f5f5'}}
                            selectedColor={colors.primary}
                            onFinishRating={value => setRating(value)}
                            showRating={false}
                        />
                    </View> */}

    

              {skillsList.map((item, index) => _renderItem(item, index))}

              <PickerView
                label={'Industry'}
                value={industry !== '' ? industry : 'Select Industry'}
                onPress={() => {
                  if (singleSelectModal !== null) {
                    singleSelectModal.current.baseModal.showModal();
                    singleSelectModal.current.init(jobTypesJson);
                  }
                }}
                parentStyle={{marginTop: 32}}
                required
              />
            </View>
          )}
        </Formik>
      </ScrollView>

      <ButtonView
        title="Save"
        containerStyle={[
          styles.topMargin,
          {position: 'absolute', bottom: 24, left: 24, right: 24},
        ]}
        parentStyle={{backgroundColor: colors.accent}}
        onPress={() => _onSave()}
      />

      <SingleSelectModal
        ref={singleSelectModal}
        onSetItem={item => setIndustry(item.name)}
      />
    </BaseView>
  );
};

export default Skills;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
    paddingBottom: 4,
    color: '#888',
    // paddingTop:16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  addSkill: {
    fontSize: 16,
    fontFamily: fonts.notoSans600,
    paddingBottom: 4,
    color: colors.primary,
    marginTop: 4
  },
  inputWrapper:{
    flexDirection:"row",
    borderBottomWidth:0.5,
    borderColor:'gray'
  }
});
