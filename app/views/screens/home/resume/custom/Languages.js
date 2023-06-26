import React, {useRef} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
// import {setExtraData} from '../../../../redux/actions/homeActions';
import {setProfileLanguages} from '../../../../../redux/actions/profileActions';
import {showAlert, showConfirmAlert} from '../../../../../utils/Message';
import NoDataView from '../../../../components/NoDataView';
import BaseView from '../../../../hoc/BaseView';
import AddLanguage from './add/AddLanguage';
import LanguageItem from './items/LanguageItem';
import TitleRow from './items/TitleRow';

const Languages = props => {
  const baseViewRef = useRef(null);

  const dispatch = useDispatch();

  const profileLanguages = useSelector(state => state.profile.profileLanguages);
  //   const extraData = useSelector(state => state.home.extraData);

  const _renderItem = (item, index) => {
    return (
      <LanguageItem
        item={item}
        index={index}
        onDelete={() => _onDelete(item)}
      />
    );
  };

  const _onDelete = item => {
    showConfirmAlert(
      'Delete',
      `Are you sure you want to delete "${item.languagename}"?`,
      () => {
        if (baseViewRef !== null) {
          //   baseViewRef.current.showLoader();
          const list = profileLanguages;
          const filteredList = list.filter(
            it => it.id !== item.id
          );
          console.log('[Languages.js] Delete: ', filteredList);

          //   updateLanguages(filteredList)
          //     .then(response => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[Language.js] Response: ', response);
          //   dispatch(setProfileLanguages(list));
          dispatch(setProfileLanguages(filteredList));
          showAlert('success', 'Deleted Successfully!');
          //       dispatch(setExtraData(!extraData));
          //     })
          //     .catch(error => {
          //       baseViewRef.current.hideLoader();
          //       console.log('[Language.js] Error: ', error);
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
      title="Languages">
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={styles.parent}>
          <AddLanguage />
          <View style={{flex: 1, paddingHorizontal: 16, marginTop: 16}}>
            <TitleRow title={'My Languages'} />
            {profileLanguages.map((it, index) => _renderItem(it, index))}
            {profileLanguages.length < 1 && (
              <NoDataView
                msg={'No Language Added yet!'}
                parentStyle={{marginTop: 48}}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

export default Languages;

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});
