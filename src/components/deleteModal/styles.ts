import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
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
    flex: 0,
    padding: scale(20),
    margin: scale(10),
    borderRadius: scale(10),
    borderWidth: 0.5,
    borderColor: darkColors.listBackGradientThree,
    backgroundColor: darkColors.white
  },
  deleteLabelText: { 
    fontFamily: fonts.MontserratSemiBold,
    color: darkColors.black,
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(15)
  },
  deleteBtnBackView: {
    flex: 1,
    backgroundColor: darkColors.listBackGradientThree,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scale(8),
    borderRadius: scale(20),
    marginTop: verticalScale(12),
    marginHorizontal: scale(10),
  },
  btnLabel: {
    color: darkColors.white,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratBold,
  },
});
