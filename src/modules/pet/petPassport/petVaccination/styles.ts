import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  parentView: {
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
  linearGradientCustomStyle: {
    borderWidth: 1.3, 
    borderColor: darkColors.borderBlueColor, 
    borderRadius: 10,
    marginLeft: scale(5),
    marginRight: scale(5)
  },
  petPassportOptionView: {
    flex: 1,
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(8),
    alignItems: 'center'
  },
  dateSelectView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(8),
    alignItems: 'center'
  },
  petPassportIconStyle: {
    width: scale(50), 
    height: scale(50), 
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    tintColor: darkColors.petPassportIconColor
  },
  petListItemTextValueStyle: {
    fontSize: moderateScale(12),
    color: darkColors.petPassportTextColor, 
    fontFamily: fonts.MontserratBold,
    textAlign: 'center'
  },
  submitBtnStyle: {
    fontSize: moderateScale(13), 
    fontFamily: fonts.MontserratBold,
    color: darkColors.white
  },
  submitButonBackStyle: {
    marginTop: verticalScale(10), 
    marginBottom: verticalScale(15),
    marginLeft: scale(5),
    marginRight: scale(5), 
    padding: scale(10),
    borderRadius: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkColors.borderBlueColor
  },
  actionModalStyle: {
    marginTop: verticalScale(80),
    justifyContent: 'flex-end'
  },
  vaccinationImageStyle: {
    width: "100%", 
    height: scale(90), 
    borderRadius: scale(8)
  }
});
