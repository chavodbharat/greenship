import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
  },

  img: {
    height: scale(150),
    width: scale(150),
    alignSelf: 'center',
    marginVertical: verticalScale(50),
  },

  btnView: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(50),
  },

  signUpBtn: {
    backgroundColor: darkColors.darkGreen,
    paddingVertical: scale(10),
    borderRadius: scale(20),
    marginRight: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  loginBtn: {
    backgroundColor: darkColors.darkGreen,
    paddingVertical: scale(12),
    borderRadius: scale(20),
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: scale(20),
    width: scale(20),
  },
  btnLabel: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(12),
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  accordion: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: moderateScale(13),
    color: 'white',
    paddingVertical: verticalScale(14),
    fontFamily: fonts.MontserratSemiBold,
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: darkColors.darkGreen,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(8),
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(6),
  },
  socialBtnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
    paddingLeft: scale(12),
  },
  wrapper: {
    flex: 0.5,
  },
});
