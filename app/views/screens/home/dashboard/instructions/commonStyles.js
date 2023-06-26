import {StyleSheet} from 'react-native';
import {colors} from '../../../../../values/colors';
import {IS_TABLET, SCREEN_WIDTH} from '../../../../../values/dimens';
import {fonts} from '../../../../../values/fonts';

export const commonStyles = StyleSheet.create({
  parent: {},
  heading: {
    fontSize: IS_TABLET ? 32 : 16,
    color: colors.primary,
    fontFamily: fonts.notoSans700,
    paddingHorizontal: IS_TABLET ? 32 : 16,
  },
  description: {
    fontSize: IS_TABLET ? 20 : 14,
    color: colors.primary,
    fontFamily: fonts.notoSans400_2,
    paddingHorizontal: IS_TABLET ? 32 : 16,
    marginVertical: 16,
  },
  description2: {
    fontSize: IS_TABLET ? 20 : 14,
    color: colors.accent,
    fontFamily: fonts.notoSans700,
    paddingHorizontal: IS_TABLET ? 32 : 16,
    textAlign: 'center',
    // marginVertical: 16,
  },
  bar: {
    height: IS_TABLET ? 12 : 6,
    width: SCREEN_WIDTH / 2,
    backgroundColor: colors.accent,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginBottom: 16,
    marginTop: 16,
  },
  image: {
    height: IS_TABLET ? SCREEN_WIDTH * (75 / 100) : SCREEN_WIDTH - 32,
    width: IS_TABLET ? SCREEN_WIDTH * (75 / 100) : SCREEN_WIDTH - 32,
    alignSelf: 'center',
  },
});
