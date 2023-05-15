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
  flexDirectionRowView: {
    flexDirection: 'row'
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
    width: scale(50), 
    height: scale(50), 
    borderRadius: scale(25),
    borderWidth: 0.5,
    borderColor: darkColors.lightGreen
  },
  tabLabelStyle: {
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(14),
    marginTop: verticalScale(5)
  }
});
