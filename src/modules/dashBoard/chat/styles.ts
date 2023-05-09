import {StyleSheet} from 'react-native';
import { darkColors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';
import { moderateScale, scale, verticalScale } from '../../../theme/responsive';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: darkColors.white
  },
  flexOneView: {
    flex: 1
  },
  flexZeroView: {
    flex: 0
  },
  userNameHeaderTextStyle: {
    color: darkColors.darkGreen, 
    textAlign: 'center', 
    fontFamily: fonts.MontserratExtraBold,
    fontSize: moderateScale(16)
  },
  userOnlineOfflineStatusStyle: {
    color: darkColors.darkGreen, 
    textAlign: 'center', 
    fontFamily: fonts.MontserratMedium,
    fontSize: moderateScale(14)
  },
  imageLeftArrowParentView: {
    position: 'absolute', 
    padding: scale(10),
    top: verticalScale(3),
  },
  imageLeftArrowStyle: {
    width: scale(25), 
    height: scale(25), 
    tintColor: darkColors.darkGreen
  },
  sendBtnStyle: {
    backgroundColor: darkColors.communityGreenColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(5),
    paddingLeft: scale(25),
    paddingRight: scale(25),
    borderRadius: scale(5),
    margin: scale(10),
    height: scale(30),
  },
  customTextInputStyle: {
    color: darkColors.petPassportTextColor, 
    borderWidth: 0.5,
    paddingLeft: scale(10),
    borderRadius: scale(10),
    fontSize: moderateScale(14),
    borderColor: '#CFDBE5'
  },
  sendFontStyle: {
    fontSize: moderateScale(12), 
    color: darkColors.white,
    fontFamily: fonts.MontserratSemiBold
  },
  leftSideViewContainer: {
    flex: 0,
    backgroundColor: darkColors.white, 
    borderTopLeftRadius: 0,
    borderTopRightRadius: scale(10), 
    borderBottomLeftRadius: scale(10), 
    borderBottomRightRadius: scale(10), 
  },
  rightSideViewContainer: {
    flex: 0,
    backgroundColor: darkColors.communityGreenColor, 
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: 0,  
    borderBottomLeftRadius: scale(10), 
    borderBottomRightRadius: scale(10), 
  },
  leftSideTextStyle: {
    color: darkColors.subTitleColor, 
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratMedium
  },
  rightSideTextStyle: {
    color: darkColors.white, 
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratMedium
  }
});
