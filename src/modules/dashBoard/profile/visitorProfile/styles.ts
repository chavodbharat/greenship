import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1
  },
  flexOnePointFive: {
    flex: 1.5
  },
  flexZero: {
    flex: 0
  },
  digitalPassportLabel: {
    fontSize: moderateScale(18), 
    color: darkColors.white,
    fontFamily: fonts.MontserratBold
  },
  petPassportLabel: {
    fontSize: moderateScale(14), 
    color: darkColors.white,
    marginTop: verticalScale(5),
    fontFamily: fonts.MontserratMedium
  },
  gradientChildStyle: {
    flex: 0, 
    height: scale(150),
    marginLeft: scale(-10),
    marginRight: scale(-10),
    marginTop: verticalScale(-20),
    paddingLeft: scale(5),
    paddingRight: scale(5),
  },
  petProfilePicView: {
    borderWidth: 1, 
    width: scale(130), 
    height: scale(130), 
    borderRadius: scale(65), 
    borderColor: darkColors.listBackGradientThree, 
    marginTop: verticalScale(-75),
    marginBottom: verticalScale(15), 
    alignSelf: 'center', 
    backgroundColor: darkColors.white
  },
  btnStyle: {
    flex: 1,
    backgroundColor: darkColors.communityGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(12),
    paddingLeft: scale(25),
    paddingRight: scale(25),
    borderRadius: scale(5),
    marginLeft: scale(5),
    marginRight: scale(5),
    marginBottom: scale(5),
  },
  customTextInputStyle: {
    color: darkColors.petPassportTextColor, 
    borderWidth: 0.5,
    paddingLeft: scale(10),
    borderRadius: scale(10),
    fontSize: moderateScale(14),
    borderColor: '#CFDBE5'
  },
  btnFontStyle: {
    fontSize: moderateScale(14), 
    color: darkColors.white,
    fontFamily: fonts.MontserratSemiBold
  },
  tabMenuGradientChildView: {
    flex: 0,
    marginLeft: scale(-25), 
    marginRight: scale(-25), 
    marginTop: verticalScale(10),
    padding: scale(10)
  },
  tabIconStyle: {
    width: scale(37), 
    height: scale(27)
  },
  tabLabelStyle: {
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5)
  },
  ownerValueStyle: {
    fontFamily: fonts.MontserratRegular,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14)
  },
  noDataViewStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: verticalScale(100),
    marginBottom: verticalScale(100)
  },
  groupNameTextStyle: {
    fontFamily: fonts.MontserratBold,
    color: darkColors.black,
    fontSize: moderateScale(14)
  },
  groupeFriendsIconStyle: {
    width: scale(50), 
    height: scale(50), 
    borderRadius: scale(5),
    borderWidth: 0.5,
    borderColor: darkColors.lightGreen
  }
});
