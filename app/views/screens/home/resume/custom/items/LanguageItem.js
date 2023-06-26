import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox, Icon} from 'react-native-elements';
import {colors} from '../../../../../../values/colors';
import {fonts} from '../../../../../../values/fonts';

const LanguageItem = props => {
  const {item, index} = props;

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <Text style={styles.titleText}>{item.languagename}</Text>
        <TouchableOpacity onPress={props.onDelete} style={{padding: 8}}>
          <Icon name="trash-2" type="feather" size={20} color={'#97A3AD'} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {item.read === 'Yes' && (
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Read</Text>
          </View>
        )}
        {item.speak === 'Yes' && (
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Speak</Text>
          </View>
        )}
        {item.write === 'Yes' && (
          <View style={styles.itemView}>
            <Text style={styles.itemText}>Write</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LanguageItem;

const styles = StyleSheet.create({
  parent: {
    marginTop: 12,
    // marginHorizontal:0,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  itemView: {
    height: 32,
    paddingHorizontal: 12,
    // borderWidth:1,
    backgroundColor: '#E4ECF7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
    borderRadius: 4,
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 12,
    fontFamily: fonts.notoSans600,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent:'space-between',
  },
  titleText: {
    fontFamily: fonts.notoSans600,
    fontSize: 14,
    color: colors.primary,
    flex: 1,
  },
});
