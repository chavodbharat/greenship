import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  flexOnePointFive: {
    flex: 1.5
  },
  linearGradientCustomStyle: {
    borderWidth: 1.3, 
    borderColor: darkColors.borderBlueColor, 
    borderRadius: 10,
    marginLeft: scale(5),
    marginRight: scale(5)
  },
  petPassportOptionView: {
    flex: 1,
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center'
  },
  petPassportIconStyle: {
    width: scale(40), 
    height: scale(40), 
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    tintColor: darkColors.petPassportIconColor
  },
  petListItemTextValueStyle: {
    fontSize: moderateScale(12),
    color: darkColors.petPassportTextColor, 
    fontFamily: fonts.MontserratBold,
    textAlign: 'center'
  },
  petDetailsLabelStyle: {
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5)
  },
  petDetailsValueStyle: {
    fontFamily: fonts.MontserratRegular,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14)
  },
});
