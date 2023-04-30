import {Platform, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: scale(70),
    width: scale(250),
    alignSelf: 'center',
    marginTop: verticalScale(80),
    marginBottom: verticalScale(50),
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },

  desc: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingBottom: verticalScale(12),
    alignSelf: 'center',
    paddingLeft: scale(50),
    paddingRight: scale(45),
    textAlign: 'center',
  },
  txtInputWrapper: {
    borderWidth: scale(1),
    borderColor: darkColors.darkGreen,
    marginHorizontal: scale(50),
  },

  txtInput: {
    marginHorizontal: scale(40),
    marginVertical: scale(5),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    backgroundColor: 'white',
  },

  error: {
    color: 'red',
    marginHorizontal: scale(40),
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingVertical: scale(4),
  },

  btnView: {
    marginHorizontal: scale(40),
  },

  resetPasswordBtn: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderRadius: scale(5),
    marginTop: verticalScale(15),
  },

  btnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },
});
