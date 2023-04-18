import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../theme/responsive';

export default StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d7a91',
    borderRadius: scale(27),
    height: scale(52),
    width: scale(52),
    top: -verticalScale(30),
  },
});
