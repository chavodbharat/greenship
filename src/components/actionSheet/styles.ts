import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  modalContent: {
    justifyContent: 'flex-end',
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
  },
  actionSheetText: {
    fontSize: moderateScale(16),
    color: darkColors.actionSheetTextColor,
    fontFamily: fonts.MontserratMedium
  },
  actionSheetView: {
    backgroundColor: darkColors.white,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: darkColors.borderColor
  },
  cancelViewStyle: {
    borderBottomWidth: 0,
    backgroundColor: darkColors.white,
    marginTop: verticalScale(8),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    borderBottomLeftRadius: scale(10),
    borderBottomRightRadius: scale(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    borderColor: darkColors.borderColor
  }
});
