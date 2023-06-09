import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(5),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: darkColors.darkGreen,
    borderRadius: scale(5),
    marginVertical: verticalScale(8),
    marginBottom: verticalScale(10)
  },
  pic: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(5),
    backgroundColor: 'red',
    marginVertical: scale(5),
    marginHorizontal: scale(5),
    borderStartColor: 'gray',
  },
  name: {
    color: 'white',
    alignSelf: 'center',
    paddingLeft: scale(8),
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  boxView: {
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: darkColors.darkGreen,
    borderRadius: scale(5),
  },
  optionMainView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionView: {
    width: '50%',
    height: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtInput1: {
    marginHorizontal: scale(20),
    marginTop: scale(12),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    fontWeight: '600',
    backgroundColor: 'white',
  },
  dropDown: {
    width: '88%',
    backgroundColor: '#FFF',
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.darkGreen,
    alignSelf: 'center',
    marginTop: verticalScale(12),
    color: darkColors.darkGrey,
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
    color: 'black',
    fontWeight: '600',
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
  radiusTxtStyle: {
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(14),
    textAlign: 'center', 
    marginBottom: verticalScale(20)
  },
  searchBtnStyle: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(10),
    borderRadius: scale(5),
    marginHorizontal: scale(20),
    marginTop: verticalScale(40),
  },

  btnLabel: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
  },
  textInputCustomStyle: { 
    marginTop: verticalScale(10), 
    borderWidth: 1,
    padding: scale(13),
    borderRadius: scale(5),
    backgroundColor: darkColors.white,
    borderColor: darkColors.darkGreen,
    fontFamily: fonts.MontserratBold,
    width:'88%',
    alignSelf:'center',
  },
  flexOne: {
    flex: 1
  },
  flexZero: {
    flex: 0
  },
  dropDownIconStyle: {
    width: scale(15), 
    height: scale(15),
    tintColor: darkColors.communityGreenColor,
    alignSelf: 'center'
  },
  dropdownLabelStyle: {
    fontSize: moderateScale(14), 
    color: darkColors.dontHaveColor,
    fontFamily: fonts.MontserratMedium
  },
  actionModalStyle: {
    marginTop: verticalScale(80),
    justifyContent: 'flex-end'
  },
  error: {
    color: darkColors.emergencyGradientOne,
    marginHorizontal: scale(20),
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingTop: scale(4),
  },
});
