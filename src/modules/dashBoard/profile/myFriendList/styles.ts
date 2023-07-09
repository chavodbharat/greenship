import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1,
    backgroundColor:'white',
  },
  flexOnePointFive: {
    flex: 1.5
  },
  flexZero: {
    flex: 0
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
    fontSize: moderateScale(16)
  },
  groupeFriendsIconStyle: {
    width: scale(60), 
    height: scale(60), 
    borderRadius: scale(5),
    borderWidth: 0.5,
    borderColor: darkColors.lightGreen
  }
});
