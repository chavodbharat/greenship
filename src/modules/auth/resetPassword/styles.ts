import {Platform, StyleSheet} from 'react-native';
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
    marginTop: verticalScale(150),
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
    paddingVertical:
      Platform.OS === 'ios' ? verticalScale(15) : verticalScale(5),
    paddingLeft: scale(12),
    color: 'black',
    flexDirection: 'row',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },

  error: {
    color: 'red',
    marginHorizontal: scale(50),
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingVertical: scale(4),
  },

  btnView: {
    marginHorizontal: scale(50),
  },

  resetPasswordBtn: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderRadius: scale(4),
    marginTop: verticalScale(12),
  },

  btnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },
});
