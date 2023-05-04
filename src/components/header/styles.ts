import {Platform, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { useTheme } from '../../providers/ThemeProvider';
import { fonts } from '../../theme/fonts';

const styles =  StyleSheet.create({
  headerParentView: {
    flexDirection: 'row',
    padding: scale(10),
    justifyContent: 'center',
    alignItems: 'center'
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
  searchBar: {
    borderColor: darkColors.dashboardEmergencyBG,
    borderWidth: scale(1),
    flexDirection: 'row',
    marginHorizontal: scale(8),
    alignItems: 'center',
    paddingLeft: scale(8),
    borderRadius: scale(5)
  },
  address: {
    color: 'gray',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    flex: 1,
    padding: Platform.OS === 'android' ? 0 : 0,
  },
});

export default styles;
