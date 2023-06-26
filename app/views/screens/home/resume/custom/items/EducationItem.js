import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../../../../../values/colors';
import {fonts} from '../../../../../../values/fonts';

const EducationItem = props => {
  const {item, index} = props;

  return (
    <View style={styles.parent}>
      <View style={styles.row}>
        <Text style={styles.titleText}>
          {item.educationProgram} - {item.graduatedYear}
        </Text>
        <TouchableOpacity onPress={props.onDelete} style={{paddingLeft: 8}}>
          <Icon name="trash-2" type="feather" size={20} color={'#97A3AD'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.text2}>
        {item.educationType} | {item.school}
      </Text>
      <Text style={[styles.text2, {color: colors.defaultTextColor}]}>
        {item.major}
      </Text>
      {/* <Text style={styles.text2}>Passed with 
                <Text style={styles.titleText}> {item.marks}% </Text> 
                on 
                <Text style={styles.titleText}> {item.endDate} </Text>
            </Text> */}
    </View>
  );
};

export default EducationItem;

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
  // trashIcon : {
  //     height:24,
  //     width:24,
  //     borderRadius:12,
  //     alignItems:'center',
  //     justifyContent:'center',
  //     backgroundColor:'#fff'
  // },
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
