import {StyleSheet} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../theme/responsive';
import {fonts} from '../../../../theme/fonts';
import {darkColors} from '../../../../theme/colors';

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
  form: {
    paddingTop: verticalScale(16),
  },

  txtInput: {
    marginHorizontal: scale(20),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: darkColors.darkGrey,
    backgroundColor: 'white',
    marginTop: verticalScale(10),
  },
  submitBtn: {
    backgroundColor: darkColors.darkGreen,
    width: scale(150),
    alignSelf: 'center',
    borderRadius: scale(20),
    marginTop: scale(20),
    marginBottom: verticalScale(50),
  },
  btnLabel: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(13),
    paddingVertical: verticalScale(12),
    alignSelf: 'center',
  },
  errorMsg: {
    color: 'red',
    fontSize: moderateScale(11),
    fontFamily: fonts.MontserratRegular,
    paddingLeft: scale(20),
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
    color: 'black',
  },
  dropdown1RowStyle: {
    backgroundColor: 'white',
    borderBottomColor: darkColors.darkGreen,
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
  },
  dropdown1RowTxtStyle: {
    color: 'black',
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
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
  dropDown1Inner: {
    width: '102%',
    backgroundColor: '#FFF',
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.darkGreen,
    alignSelf: 'center',
    color: darkColors.darkGrey,
    height: scale(45),
  },
  dropDown1Outer: {
    borderRadius: scale(4),
    borderColor: darkColors.darkGreen,
    color: darkColors.darkGrey,
    height: scale(45),
    paddingLeft: scale(20),
    borderTopWidth: scale(1),
  },

  styleIndicator: {
    color: darkColors.green,
    marginLeft: scale(40),
    marginRight: scale(-10),
    fontSize: scale(32),
    marginTop: scale(-5),
  },
  styleMainWrapper: {
    marginTop: verticalScale(10),
    marginHorizontal: scale(20),
  },
  styleItemsContainer: {
    marginTop: scale(10),
  },
  radioView: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(10),
    borderWidth: scale(2),
    borderColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
  },
  label: {
    color: 'black',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingRight: scale(5),
  },
  radioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(20),
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: scale(20),
  },
  checkBoxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label1: {
    color: 'black',
    paddingVertical: verticalScale(12),
    paddingLeft: scale(16),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    marginTop: verticalScale(10),
  },
  checkbox: {
    backgroundColor: 'white',
    borderWidth: 0,
    marginTop: verticalScale(-10),
  },
});
