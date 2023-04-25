import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(27),
    height: scale(52),
    width: scale(52),
    top: -verticalScale(30),
  },
  modalParentView: {
    flex: 1,
    backgroundColor: darkColors.white
  },
  selectedDateContainerStyle: {
    height: scale(35),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: darkColors.darkGreen
  },
  selectedDateStyle: { 
    fontFamily: fonts.MontserratBold,
    color: darkColors.white,
  },

});
