import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  acceptOnlyCharacters,
  generateRandomString,
} from '../../utils/Validations';
import ButtonView from '../components/ButtonView';
import HeaderModal from '../components/HeaderModal';
import InputView from '../components/InputView';
import BaseModal from '../hoc/BaseModal';

class AddAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      county: '',
      postalCode: '',
    };
  }

  init = address => {
    // const {address} = this.props.route.params
    console.log('[AddAddress.js] Init : ', address);

    this.setState({
      addressLine1:
        address.addressLine1 !== undefined ? address.addressLine1 : '',
      addressLine2:
        address.addressLine2 !== undefined ? address.addressLine2 : '',
      city: address.city,
      state: address.state,
      country: address.country,
      county: address.county,
      postalCode: address.postalCode,
    });
  };

  _onSaveAddress = () => {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      county,
      postalCode,
    } = this.state;

    const address = {
      id: `address_${generateRandomString(10)}`,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      county,
      postalCode,
    };

    this.props.onSavePress(address);
    this.baseModal.hideModal();
  };

  render() {
    const {
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      county,
      postalCode,
    } = this.state;

    return (
      <BaseModal ref={ref => (this.baseModal = ref)}>
        <HeaderModal
          title={'Add Address'}
          onBackPress={() => this.baseModal.hideModal()}
          parent={{backgroundColor:'#fff',borderTopLeftRadius:16,borderTopRightRadius:16}}
        />
        <View style={styles.parent}>

        
          <InputView
            label="Address Line 1"
            placeholder={'House no., street name,'}
            value={addressLine1}
            onChangeText={text => this.setState({addressLine1: text})}
            parentStyle={{marginTop: 16}}
          />
          <View style={styles.row}>
            <InputView
              label="City"
              placeholder={'City'}
              value={city}
              onChangeText={text =>
                this.setState({city: acceptOnlyCharacters(text)})
              }
              parentStyle={styles.rightMargin}
            />
            <InputView
              label="State"
              placeholder={'State'}
              value={state}
              onChangeText={text =>
                this.setState({state: acceptOnlyCharacters(text)})
              }
              parentStyle={styles.leftMargin}
            />
          </View>
          {/* <View style={styles.row}>
                    <InputView 
                            label='Address Line 2'
                            placeholder={'Address Line 2'}
                            value={addressLine2}
                            onChangeText={text => this.setState({addressLine2 : text})}
                            style={styles.rightMargin}
                        /> *
                        <InputView 
                            label='County/District'
                            placeholder={'county/district'}
                            value={county}
                            onChangeText={text => this.setState({county : acceptOnlyCharacters(text)})}
                            style={styles.rightMargin}
                        />
                        <InputView 
                            label='State'
                            placeholder={'State'}
                            value={state}
                            onChangeText={text => this.setState({state : acceptOnlyCharacters(text)})}
                            style={styles.leftMargin}
                        />
                    </View> */}
          <View style={styles.row}>
            <InputView
              label="Country"
              placeholder={'Country'}
              value={country}
              onChangeText={text =>
                this.setState({country: acceptOnlyCharacters(text)})
              }
              parentStyle={styles.rightMargin}
            />
            <InputView
              label="Postal Code"
              placeholder={'Postal Code'}
              value={postalCode}
              onChangeText={text => this.setState({postalCode: text})}
              parentStyle={styles.leftMargin}
              maxLength={6}
              keyboardType={'number-pad'}
            />
          </View>

          <ButtonView
            title={'Save Address'}
            onPress={() => this._onSaveAddress()}
            containerStyle={{marginTop: 24}}
          />
        </View>
      </BaseModal>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    // flex:1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingBottom: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  rightMargin: {
    flex: 1,
    marginRight: 8,
    marginTop:0
  },
  leftMargin: {
    flex: 1,
    marginLeft: 8,
    marginTop:0
  },
});

export default AddAddress;
