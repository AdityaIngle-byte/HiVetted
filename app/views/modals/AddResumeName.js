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

class AddResumeName extends Component {
  state = {
    name: '',
  };

  _onSave = () => {
    this.props.onSave(this.state.name);
    this.baseModal.hideModal();
    this.setState({
      name: '',
    });
  };

  render() {
    const {name} = this.state;

    return (
      <BaseModal ref={ref => (this.baseModal = ref)}>
        <HeaderModal
          title={'Add Resume Name'}
          onBackPress={() => this.baseModal.hideModal()}
          parent={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <View style={styles.parent}>
          <InputView
            label="Name"
            placeholder={'Add Resume Name'}
            value={name}
            onChangeText={text => this.setState({name: text})}
            parentStyle={{marginTop: 16}}
          />
          <ButtonView
            title={'Save'}
            onPress={() => this._onSave()}
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
});

export default AddResumeName;
