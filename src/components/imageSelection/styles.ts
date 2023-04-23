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
    color: darkColors.darkGreen,
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratSemiBold,
    alignSelf: 'center',
    marginBottom: verticalScale(20),
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
    justifyContent: 'space-around',
    alignItems: 'center',
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
});
