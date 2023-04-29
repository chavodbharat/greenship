import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  box: {
    width: '90%',
    backgroundColor: '#FFF',
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.darkGreen,
    alignSelf: 'center',
    color: darkColors.darkGrey,
    marginTop: verticalScale(-5),
    flexDirection: 'row',
  },
  date: {
    color: 'black',
    paddingVertical: verticalScale(12),
    paddingLeft: scale(16),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },
  label: {
    color: 'black',
    paddingVertical: verticalScale(12),
    paddingLeft: scale(16),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: scale(8),
  },
});
