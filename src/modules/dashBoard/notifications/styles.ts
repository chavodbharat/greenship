import {StyleSheet} from 'react-native';
import { darkColors } from '../../../theme/colors';
import { moderateScale, scale, verticalScale } from '../../../theme/responsive';
import { fonts } from '../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flexDirectionView: {
    flexDirection: 'row'
  },
  notificationParentView: {
    flexDirection: 'row', 
    backgroundColor: darkColors.white, 
    borderRadius: scale(5),
    borderWidth: 0.5, 
    borderColor: darkColors.darkGreen, 
    margin: scale(5), 
    padding: scale(10)
  },
  notificationFriendRequestView: {
    backgroundColor: darkColors.white, 
    borderRadius: scale(5),
    borderWidth: 0.5, 
    borderColor: darkColors.darkGreen, 
    margin: scale(5), 
    padding: scale(10)
  },
  notificationImageParentView: {
    flex: 0
  },
  notificationImageView: {
    width: scale(50), 
    height: scale(50), 
    borderRadius: scale(5),
    borderWidth: 0.2,
    borderColor: darkColors.darkGreen
  },
  notificationTitleParentView: {
    flex: 1,
    marginLeft: scale(10), 
    justifyContent: 'center'
  },
  noDataViewStyle: {
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: verticalScale(100),
    marginBottom: verticalScale(100)
  },
  tabLabelStyle: {
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5)
  },
  btnStyle: {
    backgroundColor: darkColors.communityGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
    paddingLeft: scale(15),
    paddingRight: scale(15),
    borderRadius: scale(5),
    marginLeft: scale(5)
  },
  notificationTitleStyle: {
    fontFamily: fonts.MontserratBold, 
    fontSize: moderateScale(14),
    color: darkColors.black
  },
  notificationDateStyle: {
    fontSize: moderateScale(12),
    fontFamily: fonts.MontserratRegular, 
    color: darkColors.darkGrey,
  },
  acceptRejectFontStyle: {
    fontSize: moderateScale(10), 
    color: darkColors.white,
    fontFamily: fonts.MontserratSemiBold
  },
  notificationActionParentView: {
    marginTop: scale(5), 
    flex: 1, 
    alignItems: 'center',
    flexDirection: 'row'
  }
});
