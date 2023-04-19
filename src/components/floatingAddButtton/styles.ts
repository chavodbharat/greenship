import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';

export default StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(27),
    height: scale(52),
    width: scale(52),
    top: -verticalScale(30),
  },
});
