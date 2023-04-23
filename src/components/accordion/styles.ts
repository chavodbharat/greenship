import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  accordionBox: {
    borderWidth: scale(1),
    borderColor: darkColors.darkGreen,
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(4),
    marginBottom: verticalScale(8),
    justifyContent: 'space-between',
  },

  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  accordionTitle: {
    fontSize: moderateScale(14),
    color: 'black',
    fontFamily: fonts.MontserratSemiBold,
  },
});
