import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: darkColors.gradientLightGray,
  },
  flexOneView: {
    flex: 1
  },
  flexZeroView: {
    flex: 0
  },
  rowView: {
    flexDirection: 'row'
  },
  user: {
    marginTop: verticalScale(12),
    alignSelf: 'center',
    borderRadius: scale(140),
  },
  userView: {
    height: scale(140),
    width: scale(140),
    borderRadius: scale(140),
    borderColor: darkColors.darkGreen,
    borderWidth: scale(0.8),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    color: 'black',
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratSemiBold,
    paddingTop: verticalScale(12),
    alignSelf: 'center',
    marginBottom: verticalScale(50),
  },

  wrapper: {
    flexDirection: 'row',
    backgroundColor: darkColors.darkGreen,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(12),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
    paddingVertical: scale(12),
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.MontserratSemiBold,
    color: 'white',
    fontSize: moderateScale(13),
    paddingLeft: scale(12),
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  version: {
    color: darkColors.darkGrey,
    paddingBottom: verticalScale(10),
    marginRight: scale(20),
    fontFamily: fonts.MontserratBold,
    fontSize: moderateScale(12),
  },
  englishLanIcon: {
    width: scale(30), 
    height: scale(30),  
    marginRight: scale(-15), 
    backgroundColor: 'white', 
    borderRadius: scale(15)
  },
  germanLanIcon: {
    width: scale(30), 
    height: scale(30), 
    zIndex: -1
  }
});
