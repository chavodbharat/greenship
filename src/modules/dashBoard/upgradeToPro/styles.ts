import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  img: {
    height: scale(70),
    width: scale(250),
    alignSelf: 'center',
    marginVertical: verticalScale(20),
  },
  title: {
    color: 'black',
    fontSize: moderateScale(16),
    fontFamily: fonts.MontserratBold,
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: scale(40),
  },
  benefitsWrapper: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
  },
  rowWrapper: {
    flexDirection: 'row',
  },
  value: {
    color: 'black',
    alignSelf: 'center',
    paddingLeft: scale(12),
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratRegular,
  },
  boxWrapper: {
    flexDirection: 'row',
    marginTop: verticalScale(20),
    marginHorizontal: scale(60),
  },
  box: {
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(40),
    marginRight: scale(20),
    borderRadius: scale(12),
  },
  btn: {
    backgroundColor: darkColors.darkGreen,
    alignSelf: 'center',
    marginTop: scale(40),
    borderRadius: scale(12),
  },
  btnLabel: {
    color: 'white',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(40),
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
  },

  heading: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(20),
    color: 'black',
    marginVertical: verticalScale(20),
    marginHorizontal: scale(20),
  },
  question: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
    color: 'black',
    marginVertical: verticalScale(8),
    marginHorizontal: scale(20),
  },
  value1: {
    color: 'black',
    alignSelf: 'center',
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratRegular,
    marginHorizontal: scale(20),
  },
  value2: {
    color: 'black',
    alignSelf: 'center',
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratRegular,
    marginHorizontal: scale(20),
    marginBottom: scale(20),
  },
  question1: {
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(16),
    color: 'black',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(12),
    marginHorizontal: scale(20),
  },
  rowWrapper1: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: verticalScale(40),
  },
  link: {
    color: darkColors.darkGreen,
    textDecorationColor: darkColors.darkGreen,
    textDecorationLine: 'underline',
  },
});
