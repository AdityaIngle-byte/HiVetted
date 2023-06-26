import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../values/colors';
import {fonts} from '../../values/fonts';
import InputView from './InputView';

const AddAddressView = props => {
  const {onAddAddress, address, error, touched} = props;

  // console.log('[AddAddressView.js]: ',address)

  return (
    <View>
      <TouchableOpacity onPress={onAddAddress}>
        <View style={styles.addAddressView}>
          <Icon
            name="map-search"
            type="material-community"
            size={20}
            color={colors.darkBlueColor}
          />
          <Text style={styles.addAddressText}>
            {address === null ? 'Add' : 'Update'} Location
          </Text>
        </View>
      </TouchableOpacity>
      {error && touched && (
        <Text style={styles.error}>{error}</Text>
      )}

      {address !== undefined && address !== null && (
        <View>
          <InputView
            hasLabel
            label={'Address'}
            parentStyle={{marginTop: 16}}
            textInputStyle={{height: 144,}}
            viewStyle={{height:144}}
            multiline
            value={
              address !== undefined && address !== null
                ? `${address.addressLine1}\nCity : ${address.city}\nState : ${address.state}\nPostal Code : ${address.postalCode}\nCountry : ${address.country},`
                : ''
            }
            editable={false}
          />

          <TouchableOpacity style={styles.iconPosition} onPress={props.onEdit}>
            <View style={styles.iconView}>
              <Icon name="edit-3" type="feather" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddAddressView;

const styles = StyleSheet.create({
  addAddressView: {
    height: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    borderRadius: 8,
    borderColor: '#C4c4c4',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  addAddressText: {
    fontSize: 14,
    fontFamily: fonts.notoSans600,
    paddingLeft: 8,
    color: colors.darkBlueColor,
  },
  iconView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#888',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPosition: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  error: {
    fontSize: 12,
    fontFamily: fonts.notoSans400_2,
    color: '#f33',
  },
});
