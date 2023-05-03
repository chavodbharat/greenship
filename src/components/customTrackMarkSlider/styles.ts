import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  activeMark: {
    backgroundColor: darkColors.darkGreen,
    borderRadius: scale(8),
    width: scale(16),
    height: scale(16)
  },
  inactiveMark: {
    backgroundColor: darkColors.petPassportTextColor,
    borderRadius: scale(8),
    width: scale(16),
    height: scale(16)
  },
  sliderContainer: {
    paddingVertical: verticalScale(16)
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIndicatorTitle: {
    width: scale(40),
    marginLeft: scale(-5),
    marginTop: verticalScale(20), 
    position: 'absolute',
    fontFamily: fonts.MontserratMedium
  },
  titleTextColor: {
    fontFamily: fonts.MontserratMedium,
    color: darkColors.petPassportTextColor
  },
  trackSliderParentView: {
    backgroundColor: darkColors.petPassportTextColor,
    marginLeft: scale(22), 
    marginRight: scale(22)
  }
});
