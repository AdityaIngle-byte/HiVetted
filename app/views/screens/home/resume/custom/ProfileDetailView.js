import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {fonts} from '../../../../../values/fonts';

const ProfileDetailView = props => {
  const {data} = props;

  console.log('[ProfileDetailView.js] Data : ', data);

  const list = data?.length > 2 ? data?.slice(0, 2) : data;
  const length = data?.length > 2 ? data?.length - 2 : data.length;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={[styles.parent, {paddingTop: data?.length > 0 ? 12 : 0}]}>
        {data?.length > 0 &&
          list.map((item, index) => props.renderItem(item, index))}
        {data?.length > 2 && (
          <TouchableOpacity onPress={props.onMorePress}>
            <View style={styles.itemView}>
              <Text style={styles.itemText}>+ {length}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileDetailView;

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    paddingTop: 12,
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
    fontFamily: fonts.notoSansMedium,
  },
});

export const renderItemView = (title, index) => {
  // console.log('[ProfileDetailView.js] renderItem : ', title);
  return (
    <View style={styles.itemView}>
      <Text style={styles.itemText}>{title}</Text>
    </View>
  );
};
