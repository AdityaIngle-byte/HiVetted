import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {setExtraData} from '../../../../redux/actions/homeActions';
import {setProfileCertificates} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddCertificate from './add/AddCertificate';
import CertificateItem from './items/CertificateItem';
import TitleRow from './items/TitleRow';
import { colors } from '../../../../../values/colors';
import { fonts } from '../../../../../values/fonts';
import { IconButton, MD3Colors } from 'react-native-paper';


const Certificates = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileCertificates = useSelector(
    state => state.profile.profileCertificates,
  );
  const extraData = useSelector(state => state.home.extraData);

  const _renderItem = (item, index) => {
    return (
      // <CertificateItem
      //   item={item}
      //   index={index}
      //   onDelete={() => _onDelete(item)}
      // />
      <View style={styles.parent_inner}>
        {/* <View style={styles.row}>
          <Text style={styles.titleText}>{item.certificationName}</Text>
          <TouchableOpacity onPress={_onDelete} style={{paddingLeft: 8}}>
            <Icon name="trash-2" type="feather" size={20} color={'#97A3AD'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.text2}>
          Issued By: <Text style={styles.titleText}>{item.issuedby}</Text>
        </Text>
        <Text style={styles.text2}>
          From
          <Text style={styles.titleText}> {item.issueDate} </Text>
          to
          <Text style={styles.titleText}> {item.expiryDate} </Text>
        </Text> */}
        <View style={styles.row}>
          <Text>{item.certificationName}</Text>
          <IconButton
            icon="trash-can-outline"
            iconColor={'#97A3AD'}
            size={20}
            onPress={()=>_onDelete(item)}
          />
        </View>
        <Text style={styles.text2}>
          Issued By: <Text style={styles.titleText}>{item.issuedby}</Text>
        </Text>
        <Text style={styles.text2}>
          From
          <Text style={styles.titleText}> {item.issueDate} </Text>
          to
          <Text style={styles.titleText}> {item.expiryDate} </Text>
        </Text>
      </View>
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.certificationName}"?`,
      () => {
        if (baseViewRef !== null) {
          const list = profileCertificates;
          const filteredList = list.filter(
            it => it.id !== item.id
          );
          dispatch(setProfileCertificates(filteredList));
          showAlert('success', 'Deleted Successfully!');
          //   baseViewRef.current.showLoader();
          //   updateCertificates(filteredList)
          //     .then(response => {
          //       dispatch(setProfileCertificates(filteredList));
          //       dispatch(setExtraData(!extraData));
          //       console.log('[Certificate.js] On Delete Certificate: ', response);
          //       baseViewRef.current.hideLoader();
          //       showAlert('success', 'Deleted Successfully!');
          //     })
          //     .catch(error => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[Certificate.js] On Add Certificate Error: ', error);
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
      title="Certificates">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddCertificate />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Certificates'} />
            {profileCertificates.map((it, index) => _renderItem(it, index))}

            {profileCertificates.length < 1 && (
              <NoDataView
                msg={'No Certificate Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default Certificates;

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
    justifyContent: 'space-between',
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
