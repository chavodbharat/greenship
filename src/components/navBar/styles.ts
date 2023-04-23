import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../theme/responsive';

export default StyleSheet.create({
  main: {
    marginTop: verticalScale(7),
    paddingLeft: scale(6),
    backgroundColor: 'white',
  },

  back: {
    height: scale(20),
    width: scale(20),
  },
  backBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
  },
});
