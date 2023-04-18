import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },

  mapBox: {
    height: scale(250),
  },
  mapStyle: {width: '100%', height: '100%'},
  markerImg: {
    height: scale(80),
    width: scale(80),
  },
  itemWrapper: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    marginHorizontal: scale(12),
    marginVertical: verticalScale(12),
    borderRadius: scale(12),
    flexDirection: 'row',
  },
  img: {
    height: scale(100),
    width: scale(90),
    backgroundColor: 'gray',
    borderRadius: scale(10),
    marginLeft: scale(8),
    marginVertical: scale(8),
  },
  labelWrapper: {
    flex: 0.6,
    paddingTop: verticalScale(12),
    paddingHorizontal: scale(12),
    alignSelf: 'flex-start',
  },
  valueWrapper: {
    flex: 0.5,
    paddingTop: verticalScale(12),
    paddingRight: scale(5),
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: moderateScale(15),
    color: 'white',
    fontFamily: fonts.MontserratRegular,
  },
});
