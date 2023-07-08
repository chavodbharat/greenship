import { Platform, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../../../theme/responsive';
import { darkColors, lightColors } from '../../../theme/colors';
import { fonts } from '../../../theme/fonts';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: darkColors.dashboardEmergencyBG,
  },
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

  header: {
    backgroundColor: 'white',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    flexDirection: 'row',
  },
  mapBox: {
    height: scale(250),
    backgroundColor: 'white',
  },
  mapStyle: { width: '100%', height: '100%' },
  markerImg: {
    height: scale(55),
    width: scale(55),
    borderRadius: scale(30),
  },
  itemWrapper: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    marginHorizontal: scale(12),
    marginVertical: verticalScale(8),
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
    paddingBottom: scale(8),
  },
  listWrapper: {
    paddingBottom: scale(32),
  },
  callOutWrapper: {
    backgroundColor: darkColors.dashboardEmergencyBG,
    minHeight: scale(60),
    minWidth: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutTitle: {
    color: 'white',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10),
  },

  searchBar: {
    borderColor: darkColors.dashboardEmergencyBG,
    borderWidth: scale(1),
    flexDirection: 'row',
    width: '80%',
    marginHorizontal: scale(8),
    alignItems: 'center',
    paddingLeft: scale(8),
  },
  address: {
    color: 'gray',
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    flex: 1,
    backgroundColor: 'white',
    padding: Platform.OS === 'android' ? 0 : 0,
  },
  crossIcon: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  list: {
    position: 'absolute',
    zIndex: 100,
    width: '63%',
    marginTop: verticalScale(90),
    marginLeft: scale(45),
  },
  item: {
    backgroundColor: 'white',
    paddingTop: verticalScale(8),
  },
  separator: {
    height: scale(0.8),
    backgroundColor: darkColors.dashboardEmergencyBG,
    marginVertical: scale(8),
  },
  name: {
    paddingLeft: scale(8),
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratRegular,
    color: 'black',
  },
});
