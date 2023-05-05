import {StyleSheet} from 'react-native';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../../../theme/responsive';
import {darkColors} from '../../../../theme/colors';
import {fonts} from '../../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
    borderWidth: scale(1),
    borderColor: darkColors.dashboardEmergencyBG,
    width: '90%',
  },

  title: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(16),
  },
  crossIcon: {
    alignSelf: 'flex-end',
    padding: scale(12),
  },

  subTitle: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(16),
    paddingBottom: verticalScale(8),
  },
  dropDown: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.dashboardEmergencyBG,
    alignSelf: 'center',
    marginTop: verticalScale(12),
    color: darkColors.darkGrey,
  },
  dropDownBtnWrapper: {
    borderColor: darkColors.darkGreen,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
  },
  dropDownPlaceHolder: {
    fontSize: moderateScale(13),
    color: darkColors.darkGrey,
  },
  dropdown1RowStyle: {
    backgroundColor: 'white',
    borderBottomColor: darkColors.dashboardEmergencyBG,
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
  },
  dropdown1RowTxtStyle: {
    color: darkColors.darkGrey,
    fontFamily: fonts.MontserratRegular,
    fontSize: moderateScale(13),
  },
  submitBtn: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    marginVertical: verticalScale(12),
    borderRadius: scale(2),
    fontFamily: fonts.MontserratRegular,
  },
  btnLabel: {
    color: 'white',
    paddingHorizontal: scale(32),
    marginVertical: verticalScale(8),
  },
  error: {
    color: darkColors.dashboardEmergencyBG,
    fontSize: moderateScale(12),
    fontFamily: fonts.MontserratRegular,
    paddingTop: scale(4),
    alignSelf: 'flex-start',
    marginHorizontal: scale(18),
  },
});
