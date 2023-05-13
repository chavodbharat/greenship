import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {colors, darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heading: {
    color: 'black',
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'center',
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(20),
    textAlign: 'center',
  },
  crossIcon: {
    alignSelf: 'flex-end',
    padding: scale(12),
  },
  container: {
    backgroundColor: 'white',
    marginHorizontal: scale(20),
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: verticalScale(20),
  },
  icon: {
    height: scale(50),
    width: scale(50),
  },
  label: {
    color: 'gray',
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'center',
    marginTop: verticalScale(8),
    marginBottom: verticalScale(20),
  },
  yesBtn: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    borderRadius: scale(4),
    marginHorizontal: scale(20),
  },
  yes: {
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(6),
    color: 'white',
  },
  noBtn: {
    borderWidth: scale(1),
    borderColor: 'gray',
    borderRadius: scale(4),
  },
  no: {
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(6),
  },
  desc: {
    alignSelf: 'center',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: 'gray',
    paddingBottom: verticalScale(28),
  },
});
