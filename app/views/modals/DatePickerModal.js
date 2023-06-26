import moment from 'moment';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

class DatePickerModal extends Component {
  state = {
    isVisible: false,
  };

  showModal = () => {
    this.setState({
      isVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      isVisible: false,
    });
  };

  _handleConfirm = date => {
    var myDate = new Date(date);
    var result = myDate.getTime();
    this.props.setDate(moment(date).format('MM-DD-YYYY'),result);
    this.hideModal();
  };

  render() {
    const {isVisible} = this.state;

    return (
      this.props.disableFutureDates?
      <DateTimePickerModal
        isVisible={isVisible}
        maximumDate={new Date()}
        mode="date"
        onConfirm={this._handleConfirm}
        onCancel={() => this.hideModal()}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />:
      <DateTimePickerModal
        isVisible={isVisible}
        mode="date"
        onConfirm={this._handleConfirm}
        onCancel={() => this.hideModal()}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />

    );
  }
}

export default DatePickerModal;

const styles = StyleSheet.create({});
