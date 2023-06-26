import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import { setExtraData } from '../../../../redux/actions/homeActions'
import {setProfileCustomSections} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddCustomSection from './add/AddCustomSection';
import CustomSectionItem from './items/CustomSectionItem';
import TitleRow from './items/TitleRow';

const CustomSections = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileCustomSections = useSelector(
    state => state.profile.profileCustomSections,
  );
  // const extraData = useSelector(state => state.home.extraData)

  const _renderItem = (item, index) => {
    return (
      <CustomSectionItem
        item={item}
        index={index}
        onDelete={() => _onDelete(item)}
      />
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.title}"?`,
      () => {
        if (baseViewRef !== null) {
          // baseViewRef.current.showLoader();
          const list = profileCustomSections;
          const filteredList = list.filter(it => it.title !== item.title);
          // updateCustomSections(filteredList)
          //     .then(response => {
          //         baseViewRef.current.hideLoader()
          //         console.log('[CustomSection.js] Response: ',response)
          dispatch(setProfileCustomSections(filteredList));
          //         dispatch(setExtraData(!extraData))
          showAlert('success', 'Deleted Successfully!');
          //     })
          //     .catch(error => {
          //         baseViewRef.current.hideLoader()
          //         console.log('[CustomSection.js] Error: ',error)
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
      title="Custom Sections">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddCustomSection />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Custom Sections'} />
            {profileCustomSections.map((it, index) => _renderItem(it, index))}
            {profileCustomSections.length < 1 && (
              <NoDataView
                msg={'No Custom Section Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default CustomSections;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
