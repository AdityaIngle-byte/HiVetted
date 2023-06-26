import React, {useRef,useEffect,useState} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {setExtraData} from '../../../../../redux/actions/homeActions';
import {setProfileEducation} from '../../../../../redux/actions/profileActions';
import {
  showAlert,
  showAlertMessage,
  showConfirmAlert,
} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddEducation from './add/AddEducation';
import EducationItem from './items/EducationItem';
import TitleRow from './items/TitleRow';
import { acceptOnlyCharacters } from '../../../../../utils/Validations';
// import {generateRandomString} from '../../../../../utils/Validations';

const Education = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();
  const [profileList, setProfileList] = useState([]);

  const profileEducation = useSelector(state => state.profile.profileEducation);
  const extraData = useSelector(state => state.home.extraData);
  const [localProfileEducation,setLocalProfileEducation] = useState([]);
  // useEffect(() => {
  //   init();
  //   return () => {};
  // }, [init]);



  const _renderItem = (item, index) => {
    return (
      <EducationItem
        item={item}
        index={index}
        onDelete={() => _onDelete(item)}
      />
    );
  };
  
    const _onDelete = item => {
      showConfirmAlert(
        'Delete',
        `Are you sure you want to delete "${item.educationProgram}"?`,
        () => {
          if (baseViewRef !== null) {
            const filteredList = profileEducation.filter(it => it.id !== item.id);
            dispatch(setProfileEducation(filteredList));
            showAlert('success', `${item.educationProgram} Deleted Successfully!`);
          }
        },
      );
    }

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Education">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddEducation />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Education'} />
            {profileEducation.map((it, index) => _renderItem(it, index))}
            {profileEducation.length < 1 && (
              <NoDataView
                msg={'No Education Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default Education;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
