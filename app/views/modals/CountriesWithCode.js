import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {countries} from '../../json/countries';
import ButtonView from '../components/ButtonView';
import InputView from '../components/InputView';
import BaseBottomSheet from '../hoc/BaseBottomSheet';
import SingleSelectItem from '../items/SingleSelectItem';

class CountriesWithCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isVisible : false,
      searchText: '',
      countriesList: [],
    };

    this.searchedList = [];
  }

  componentDidMount = () => {
    this._init();
  };

  _init = () => {
    this.setState({
      countriesList: countries,
    });
    this.searchedList = countries;
  };

  // setModal = (flag) => {
  //     this.setState({
  //         isVisible : flag
  //     })
  // }

  renderItem = ({item, index}) => {
    return (
      <SingleSelectItem
        title={`${item.flag} (${item.dial_code}) ${item.name} (${item.code})`}
        onPress={() => {
          this.props.onItemPress(item);
          // this.setModal(false)
          this.baseModal.hideModal();
        }}
      />
    );
  };

  _onSearchText = text => {
    this.setState({searchText: text});
    if (this.searchedList !== undefined) {
      const newData = this.searchedList.filter(item => {
        if (Object.entries(item).length != 0 && item !== null) {
          const itemData = `${item.name.toUpperCase()} ${item.dial_code.toUpperCase()} ${item.code.toUpperCase()}`;
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      if (text != null) {
        this.setState({
          countriesList: newData,
        });
      } else if (text == '') {
        this.setState({
          countriesList: [],
        });
      }
    }
  };

  render() {
    const {isVisible, searchText, countriesList} = this.state;

    return (
      <BaseBottomSheet
        // isVisible={this.state.isVisible}
        ref={ref => (this.baseModal = ref)}>
        <View style={styles.parent}>
          <InputView
            // hasLabel={false}
            parentStyle={{marginTop:0}}
            placeholder={'Search country here...'}
            value={searchText}
            onChangeText={text => this._onSearchText(text)}
          />
          <FlatList data={countriesList} renderItem={this.renderItem} />
          <ButtonView
            title="Cancel"
            onPress={() => {
              // this.setModal(false)
              this.baseModal.hideModal();
            }}
          />
        </View>
      </BaseBottomSheet>
    );
  }
}

export default CountriesWithCode;

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
    height: 560,
    borderRadius: 8,
    // paddingTop:8
    // marginHorizontal:20,
    paddingBottom: 8,
    // paddingHorizontal:16,
    // paddingTop:16
  },
});

const experiences = [
  'Junior:0-3 years',
  'Mid:4-7 years',
  'Senior:8-10 years',
  'Guru:Subject Matter Expert',
];
