import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  txtInput: {
    marginHorizontal: scale(20),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    backgroundColor: 'white',
  },
  txtInput1: {
    marginHorizontal: scale(20),
    marginTop: scale(12),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    backgroundColor: 'white',
  },
  img: {
    height: scale(70),
    width: scale(250),
    alignSelf: 'center',
    marginVertical: verticalScale(50),
  },

  error: {
    color: 'red',
    marginHorizontal: scale(20),
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingTop: scale(4),
  },

  loginBtn: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
    borderRadius: scale(20),
    marginTop: verticalScale(22),
    marginHorizontal: scale(20),
  },

  btnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },

  noAccount: {
    color: darkColors.dontHaveColor,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'center',
    paddingTop: verticalScale(8),
    marginBottom: verticalScale(50),
  },
  signUp: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(13),
  },
  signupLink: {
    justifyContent: 'flex-end',
  },
  dropDown: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.darkGreen,
    alignSelf: 'center',
    marginTop: verticalScale(12),
    color: darkColors.darkGrey,
  },
  emailInfo: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(5),
  },
  dropDownBtnWrapper: {
    borderColor: darkColors.darkGreen,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
  },
  dropDownPlaceHolder: {
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },
  dropdown1RowStyle: {
    backgroundColor: 'white',
    borderBottomColor: darkColors.darkGreen,
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
  },
  dropdown1RowTxtStyle: {
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
  },
  row: {
    flexDirection: 'row',
  },
  info1: {
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(16),
    paddingTop: verticalScale(10),
    width: scale(290),
    marginLeft: scale(-10),
  },
  info2: {
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(11),
    paddingTop: verticalScale(10),
    marginLeft: scale(45),
    marginRight: scale(20),
  },
});
