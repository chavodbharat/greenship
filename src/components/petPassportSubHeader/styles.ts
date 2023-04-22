import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

const styles =  StyleSheet.create({
  parentView: {
    flex: 0,
    flexDirection: 'row',
    paddingTop: verticalScale(8),
    paddingBottom: verticalScale(8),
    paddingLeft: scale(3),
    paddingRight: scale(3),
  },
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1
  },
  flexZero: {
    flex: 0
  },
  petImageIcon: {
    width: scale(40),
    height: scale(40),
    marginRight: scale(10),
    borderRadius: scale(5)
  },
  headerLabelStyle: {
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.white,
    fontSize: moderateScale(14)
  },
  gradientChildStyle: {
    flex: 0, 
    paddingLeft: scale(5),
    paddingRight: scale(5),
  }
});

export default styles;
