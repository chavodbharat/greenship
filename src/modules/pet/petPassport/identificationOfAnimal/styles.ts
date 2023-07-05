import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1
  },
  flexZero: {
    flex: 0
  },
  txtInput: {
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    backgroundColor: darkColors.white,
    marginTop: verticalScale(10)
  },
  error: {
    color: darkColors.emergencyGradientOne,
    marginHorizontal: scale(5),
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingTop: scale(4),
  },
  btnParentView: {
    backgroundColor: darkColors.listBackGradientThree,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
    borderRadius: scale(5),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  btnLabel: {
    color: darkColors.white,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
  },
  textInputCustomStyle: {
    marginTop: verticalScale(15),
    borderWidth: 1,
    padding: scale(13),
    borderRadius: scale(5),
    backgroundColor: darkColors.white,
    borderColor: darkColors.listBackGradientThree,
    fontFamily: fonts.MontserratBold
  },
  dropdownLabelStyle: {
    fontSize: moderateScale(14), 
    color: darkColors.dontHaveColor,
    fontFamily: fonts.MontserratMedium
  },
});
