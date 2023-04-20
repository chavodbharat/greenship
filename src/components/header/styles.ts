import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { useTheme } from '../../providers/ThemeProvider';

const styles =  StyleSheet.create({
  headerParentView: {
    flexDirection: 'row',
    padding: scale(10),
  },
  flexOneView: {
    flex: 1
  },
  flexZeroView: {
    flex: 0
  },
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  headerImageStyle: {
    width: scale(20), 
    height: scale(20),
    marginLeft: scale(10),
    marginRight: scale(5),
    tintColor: darkColors.listBackGradientOne
  },
  leftImageStyle: {
    width: scale(25), 
    height: scale(25),
    marginTop: -scale(3),
    tintColor: darkColors.listBackGradientOne
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(27),
    height: scale(52),
    width: scale(52),
    top: -verticalScale(30),
  },
});

export default styles;
