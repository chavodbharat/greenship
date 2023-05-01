import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  activeMark: {
    backgroundColor: 'red',
    borderRadius: scale(8),
    width: scale(16),
    height: scale(16)
  },
  inactiveMark: {
    backgroundColor: 'grey',
    borderRadius: scale(8),
    width: scale(16),
    height: scale(16)
  },
  sliderContainer: {
    paddingVertical: verticalScale(16),
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIndicatorTitle: {
    marginTop: verticalScale(20), 
    position: 'absolute'
  }
});
