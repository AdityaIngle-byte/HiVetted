import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import { setExtraData } from '../../../../../redux/actions/homeActions'
import {setProfileExperiences} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddExperience from './add/AddExperience';
import ExperienceItem from './items/ExperienceItem';
import TitleRow from './items/TitleRow';

const WorkExperience = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileExperiences = useSelector(
    state => state.profile.profileExperiences,
  );
  //   const extraData = useSelector(state => state.home.extraData);

  const _renderItem = (item, index) => {
    return (
      <ExperienceItem
        item={item}
        index={index}
        onDelete={() => _onDelete(item)}
      />
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.employerName}"?`,
      () => {
        if (baseViewRef !== null) {
          // baseViewRef.current.showLoader()
          const list = profileExperiences;
          const filteredList = list.filter(
            it => it.id !== item.id
          );
          // updateWorkExperience(filteredList)
          //     .then(response => {
          //         baseViewRef.current.hideLoader()
          dispatch(setProfileExperiences(filteredList));
          showAlert('success', 'Deleted Successfully!');
          //         dispatch(setExtraData(!extraData))
          //         console.log('[Experience.js] on update Experience: ',response);
          //         showAlert('success','Deleted Successfully!')
          //     })
          //     .catch(error => {
          //         baseViewRef.current.hideLoader()
          //         console.log('[Experience.js]  Experience Error: ',error);
          //     })
        }
      },
    );
  };

  return (
    <BaseView
      ref={baseViewRef}
      hasStatusBar
      hasHeader
      hasBack
      onBackPress={() => props.navigation.goBack()}
      title="Work Experience">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddExperience />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Work Experience'} />
            {profileExperiences.map((it, index) => _renderItem(it, index))}
            {profileExperiences.length < 1 && (
              <NoDataView
                msg={'No Experience Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default WorkExperience;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
