import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors, lightColors} from '../../theme/colors';
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
    height: scale(80),
    width: scale(250),
    alignSelf: 'center',
    marginTop: verticalScale(200),
    marginBottom: verticalScale(100),
  },

  btnView: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
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
    backgroundColor: lightColors.green,
    paddingVertical: scale(10),
    borderRadius: scale(20),
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    color: 'white',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(12),
  },
});
