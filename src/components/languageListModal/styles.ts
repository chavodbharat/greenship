import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  parentView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-end', 
    marginRight: 0, 
    marginTop: verticalScale(45)
  },
  modalParentView: {
    flex: 0,
    padding: scale(8),
    margin: scale(10),
    borderRadius: scale(5),
    borderWidth: 0.5,
    borderColor: darkColors.listBackGradientThree,
    backgroundColor: darkColors.lightGreen
  },
  appSubtitleLabelText: { 
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.white,
    fontSize: moderateScale(14),
    textAlign: 'center',
    marginLeft: scale(20),
    marginRight: scale(20),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5)
  },
  dividerStyle: {
    backgroundColor: darkColors.white, 
    height: 0.3,
    marginTop: verticalScale(5), 
    marginBottom: verticalScale(5), 
    marginLeft: scale(-8), 
    marginRight: scale(-8)
  }
});
