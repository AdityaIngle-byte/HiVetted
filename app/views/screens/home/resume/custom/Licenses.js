import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import { setExtraData } from '../../../../../redux/actions/homeActions'
import {setProfileLicenses} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
// import AddExperience from './add/AddExperience'
import AddLicense from './add/AddLicense';
// import ExperienceItem from './items/ExperienceItem'
import LicenseItem from './items/LicenseItem';
import TitleRow from './items/TitleRow';
import { fonts } from '../../../../../values/fonts';
import { colors } from '../../../../../values/colors';
import { IconButton, MD3Colors } from 'react-native-paper';


const Licenses = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileLicenses = useSelector(state => state.profile.profileLicenses);
  const extraData = useSelector(state => state.home.extraData);

  const _renderItem = (item, index) => {
    return (
      // <LicenseItem item={item} index={index} onDelete={() => _onDelete(item)} />
      <View style={styles.parent_inner}>
        <View style={styles.row}>
          <Text style={styles.titleText}>{item.licenseName}</Text>
          <IconButton
            icon="trash-can-outline"
            iconColor={'#97A3AD'}
            size={20}
            onPress={()=>_onDelete(item)}
          />
        </View>
        <Text style={styles.text2}>
          {item.license} - ({item.state})
        </Text>
        <Text style={styles.text2}>
          Valid From
          <Text style={styles.titleText}> {item.startDate} - </Text>
          To
          <Text style={styles.titleText}> {item.expiryDate} </Text>
        </Text>
      </View>
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.licenseName}"?`,
      () => {
        if (baseViewRef !== null) {
        //   baseViewRef.current.showLoader();

          const list = profileLicenses;
          const filteredList = list.filter(
            it => it.id !== item.id
          );
          //   updateLicenses(filteredList)
          //     .then(response => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[AddLicense.js] Response: ', response);
          dispatch(setProfileLicenses(filteredList));
          //       dispatch(setExtraData(!extraData));
          showAlert('success', 'Deleted Successfully!');
          //     })
          //     .catch(error => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[AddLicense.js] Error: ', error);
          //     });
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
      title="Licenses">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddLicense />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Licenses'} />
            {profileLicenses.map((it, index) => _renderItem(it, index))}
            {profileLicenses.length < 1 && (
              <NoDataView
                msg={'No License Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default Licenses;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  parent_inner: {
    backgroundColor: '#fff',
    // marginRight:8,
    marginTop: 12,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontFamily: fonts.notoSans800,
    fontSize: 16,
    color: colors.primary,
    flex: 1,
  },
  text2: {
    fontFamily: fonts.notoSans400_2,
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
});
