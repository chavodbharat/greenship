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
    marginTop: verticalScale(100),
    marginBottom: verticalScale(50),
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
    borderRadius: scale(5),
    marginTop: verticalScale(12),
    marginHorizontal: scale(20),
  },

  btnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
  },
  linkBtn: {
    alignSelf: 'flex-end',
  },

  link: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'flex-end',
    paddingRight: scale(20),
    paddingTop: verticalScale(8),
  },
  noAccount: {
    color: darkColors.dontHaveColor,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'center',
    paddingTop: verticalScale(8),
  },
  signUp: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(13),
  },
  signupLink: {
    justifyContent: 'flex-end',
  },
});
