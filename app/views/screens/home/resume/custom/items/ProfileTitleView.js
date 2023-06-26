// import React from 'react'
// import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { Icon } from 'react-native-elements'
// import { images } from '../../../../../assets/images';
// import { colors } from '../../../../../values/colors';
// import { fonts } from '../../../../../values/fonts';

// const ProfileTitleView = props => {

//     const {hasIcon,hasCheckIcon,checked,onCheckPress,iconName,iconType,iconColor,title,onPress,children,arrowColor} = props;

//     return (
//         <View style={[styles.parent,props.parentStyle]}>
//             <TouchableOpacity
//                 onPress={onPress}
//             >
//             <View style={styles.row}>
//                 {
//                     hasIcon
//                     &&
//                     <Icon
//                         name={iconName}
//                         type={iconType}
//                         color={iconColor ? iconColor : colors.accent}
//                     />
//                 }
//                 {
//                     hasCheckIcon
//                     &&
//                     <TouchableOpacity onPress={onCheckPress}>
//                         <Image
//                             source={checked ? images.check : images.unchecked}
//                             style={styles.image}
//                         />
//                     </TouchableOpacity>
//                 }
//                 <Text style={styles.title}>{title}</Text>
//                 <Icon
//                     name={'arrow-forward-ios'}
//                     type={'material'}
//                     color={arrowColor ? arrowColor : '#999999'}
//                     size={18}
//                 />
//             </View>
//             </TouchableOpacity>
//             {children}
//         </View>
//     )
// }

// export default ProfileTitleView

// const styles = StyleSheet.create({
//     parent : {
//         backgroundColor: '#fff',
//         marginHorizontal:16,
//         marginTop:16,
//         paddingHorizontal:16,
//         paddingVertical:16,
//         borderRadius:8,
//     },
//     row : {
//         flexDirection:'row',
//         alignItems:'center',
//     },
//     title : {
//         fontSize:16,
//         fontFamily:fonts.notoSansRegular,
//         color:colors.accent,
//         paddingLeft:12,
//         flex:1
//     },
//     image : {
//         height:16,
//         width:24
//     }
// })
