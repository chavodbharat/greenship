import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../theme/responsive';
import {fonts} from '../theme/fonts';
import {darkColors} from '../theme/colors';

export default StyleSheet.create({
  tabBarStyle: {
    paddingTop: verticalScale(5),
  },
  drawerLabelStyle: {
    fontFamily: fonts.MontserratBold,
    color: darkColors.petPassportTextColor,
    fontSize: moderateScale(16),
  },
  drawerParentView: {
    padding: scale(20),
    backgroundColor: darkColors.gradientLightGray,
    paddingTop: verticalScale(50),
  },
});
