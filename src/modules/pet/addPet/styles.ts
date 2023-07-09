import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../theme/responsive';
import { darkColors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
  parentView: {
    backgroundColor: darkColors.background,
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
  petViewParentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(8)
  },
  addPetView: {
    alignSelf: 'flex-start',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10)
  },
  textInputStyle: {
    marginBottom: verticalScale(5),
    fontFamily: fonts.MontserratBold
  },
  textInputCustomStyle: {
    marginBottom: verticalScale(5),
    marginTop: verticalScale(5),
    borderWidth: 1,
    padding: scale(13),
    borderRadius: scale(5),
    backgroundColor: darkColors.white,
    borderColor: darkColors.listBackGradientThree,
    fontFamily: fonts.MontserratBold
  },
  actionModalStyle: {
    marginTop: verticalScale(80),
    justifyContent: 'flex-end'
  },
  dropDownIconStyle: {
    width: scale(15),
    height: scale(15),
    tintColor: darkColors.listBackGradientThree,
    alignSelf: 'center'
  },
  dropdownLabelStyle: {
    fontSize: moderateScale(14),
    color: darkColors.dontHaveColor,
    fontFamily: fonts.MontserratMedium
  },
  loginFontStyle: {
    fontSize: moderateScale(13),
    color: darkColors.white,
    fontFamily: fonts.MontserratBold
  },
  digitalPassportLabel: {
    fontSize: moderateScale(18),
    color: darkColors.white,
    fontFamily: fonts.MontserratBold
  },
  petPassportLabel: {
    fontSize: moderateScale(14),
    color: darkColors.white,
    marginTop: verticalScale(5),
    fontFamily: fonts.MontserratMedium
  },
  allButonStyle: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
    borderRadius: scale(5),
    backgroundColor: darkColors.listBackGradientThree
  },
  gradientChildStyle: {
    flex: 0,
    height: scale(150),
    marginLeft: scale(-10),
    marginRight: scale(-10),
    marginTop: verticalScale(-20),
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  petProfilePicView: {
    borderWidth: 1,
    width: scale(130),
    height: scale(130),
    borderRadius: scale(65),
    borderColor: darkColors.listBackGradientThree,
    marginTop: verticalScale(-75),
    marginBottom: verticalScale(25),
    alignSelf: 'center',
    backgroundColor: darkColors.white
  },
  uploadWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: scale(-65)
  },
  pressableUpload: {
    height: scale(30),
    width: scale(30),
    marginTop: verticalScale(-50),
  },
  upload: {
    height: scale(30),
    width: scale(30),
  },
  petNameTextStyle: {
    fontSize: verticalScale(12),
    color: darkColors.dontHaveColor,
    fontFamily: fonts.MontserratBold
  },
  petTermsTextStyle: {
    fontSize: verticalScale(12),
    color: darkColors.black, 
    fontFamily: fonts.MontserratBold,
    textDecorationLine: 'underline',
    textDecorationColor: darkColors.black
  },
  checkBoxParentViewBack: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    alignItems: 'center',
    marginLeft: scale(-10)
  },
  petImageStyle: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 1,
    borderColor: darkColors.darkGreen,
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10)
  },
});
