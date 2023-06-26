import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AirbnbRating, Icon} from 'react-native-elements';
import {colors} from '../../../../../../values/colors';
import {fonts} from '../../../../../../values/fonts';

const CustomSectionItem = props => {
  const {item, index} = props;

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <Text style={styles.titleText}>{item.title}</Text>
        <TouchableOpacity onPress={props.onDelete} style={{paddingLeft: 8}}>
          <Icon name="trash-2" type="feather" size={20} color={'#97A3AD'} />
        </TouchableOpacity>
      </View>
      {item.subHeading !== '' && (
        <Text style={styles.text2}>{item.subheading}</Text>
      )}
      <Text style={styles.text2}>{item.sampledesc}</Text>
    </View>
  );
};

export default CustomSectionItem;

const styles = StyleSheet.create({
  parent: {
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
