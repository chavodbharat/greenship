import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: scale(12),
    paddingTop: verticalScale(5),
  },
  header: {
    flexDirection: 'row',
    backgroundColor: darkColors.darkGreen,
    borderRadius: scale(8),
    marginVertical: verticalScale(8),
  },
  pic: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(8),
    backgroundColor: 'red',
    marginVertical: scale(5),
    marginHorizontal: scale(5),
    borderStartColor: 'gray',
  },
  name: {
    color: 'white',
    alignSelf: 'center',
    paddingLeft: scale(8),
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(14),
  },
  boxWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  box: {
    height: scale(120),
    width: scale(160),
    borderRadius: scale(8),
    borderWidth: scale(1),
    marginBottom: scale(12),
    borderColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: scale(50),
    width: scale(50),
  },
  label: {
    fontSize: moderateScale(14),
    color: 'black',
    fontFamily: fonts.MontserratSemiBold,
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
