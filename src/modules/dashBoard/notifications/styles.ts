import {StyleSheet} from 'react-native';
import { darkColors } from '../../../theme/colors';
import { moderateScale, scale, verticalScale } from '../../../theme/responsive';
import { fonts } from '../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  notificationImageParentView: {
    flex: 0
  },
  notificationImageView: {
    width: scale(50), 
    height: scale(50), 
    borderRadius: scale(5),
    borderWidth: 0.5,
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
});
