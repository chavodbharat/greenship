import { StyleSheet } from 'react-native';
import { scale, verticalScale } from '../../theme/responsive';

export const Styles = StyleSheet.create({
  linearGradientBack: {
    flex: 1,
    paddingLeft: scale(8),
    paddingRight: scale(8),
    marginLeft: scale(10),
    marginRight: scale(10),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    borderRadius: scale(5)
  }
});
