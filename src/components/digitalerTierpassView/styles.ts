import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  flexOne: {
    flex: 1
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
  petProfilePicView: {
    borderWidth: 1, 
    width: scale(130), 
    height: scale(130), 
    borderRadius: scale(65), 
    borderColor: darkColors.listBackGradientThree, 
    marginTop: verticalScale(-75),
    marginBottom: verticalScale(25), 
    alignSelf: 'center', 
    backgroundColor: darkColors.white
  },
});
