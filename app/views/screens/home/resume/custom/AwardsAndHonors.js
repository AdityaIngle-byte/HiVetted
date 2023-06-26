import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {setExtraData} from '../../../../redux/actions/homeActions';
import {setProfileAwardsAndHonors} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddAwardAndHonor from './add/AddAwardAndHonor';
// import AddExperience from './add/AddExperience';
import AwardAndHonorItem from './items/AwardAndHonorItem';
// import ExperienceItem from './items/ExperienceItem';
import TitleRow from './items/TitleRow';

const AwardsAndHonors = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileAwardsAndHonorsList = useSelector(
    state => state.profile.profileAwardsAndHonorsList,
  );
  //   const extraData = useSelector(state => state.home.extraData);

  const _renderItem = (item, index) => {
    return (
      <AwardAndHonorItem
        item={item}
        index={index}
        onDelete={() => _onDelete(item)}
      />
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.awardname}"?`,
      () => {
        if (baseViewRef !== null) {
          const list = profileAwardsAndHonorsList;
          const filteredList = list.filter(
             it => it.id !== item.id
          );
          // baseViewRef.current.showLoader();
          // updateAwardsAndHonors(filteredList)
          //     .then(response => {
          //         baseViewRef.current.hideLoader()
          //         console.log('[AwardAndHonor.js] Response: ',response)
          dispatch(setProfileAwardsAndHonors(filteredList));
          //         dispatch(setExtraData(!extraData))
          showAlert('success', 'Deleted Successfully!');
          //     })
          //     .catch(error => {
          //         baseViewRef.current.hideLoader()
          //         console.log('[AwardAndHonor.js] Error: ',error)
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
      title="Awards & Honors">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddAwardAndHonor />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Awards & Honors'} />
            {profileAwardsAndHonorsList.map((it, index) =>
              _renderItem(it, index),
            )}
            {profileAwardsAndHonorsList.length < 1 && (
              <NoDataView
                msg={'No Award or Honor Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default AwardsAndHonors;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
