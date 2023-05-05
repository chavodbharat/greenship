import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

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
    justifyContent: 'center',
    borderWidth: scale(1),
    borderColor: darkColors.dashboardEmergencyBG,
    width: '90%',
    paddingHorizontal: scale(10),
    borderRadius: scale(4),
  },

  title: {
    color: darkColors.darkGrey,
    fontSize: moderateScale(16),
    alignSelf: 'center',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(40),
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

  submitBtn: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    marginVertical: verticalScale(12),
    borderRadius: scale(2),
    alignSelf: 'center',
    marginTop: verticalScale(60),
  },
  btnLabel: {
    color: 'white',
    paddingHorizontal: scale(32),
    marginVertical: verticalScale(8),
    fontFamily: fonts.MontserratRegular,
  },
});
