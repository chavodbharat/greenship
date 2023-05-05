import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  seekBar: {
    height: scale(6),
    backgroundColor: 'black',
    borderRadius: scale(8),
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginTop: verticalScale(-5),
  },
  dot: {
    height: scale(18),
    width: scale(18),
    borderRadius: scale(15),
  },
  radiusLabel: {
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
    fontFamily: fonts.MontserratRegular,
    color: 'gray',
    marginLeft: scale(-15),
  },
});
