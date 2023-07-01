import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowView: {
    flexDirection: 'row'
  },
  main: {
    flex: 1,
    backgroundColor: 'white',
  },
  flexOneView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  img: {
    height: scale(180),
    width: scale(180),
    alignSelf: 'center',
    marginVertical: verticalScale(50),
  },

  btnView: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(50),
  },

  signUpBtn: {
    backgroundColor: darkColors.darkGreen,
    paddingVertical: scale(10),
    borderRadius: scale(5),
    marginRight: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
  },
  loginBtn: {
    backgroundColor: darkColors.darkGreen,
    paddingVertical: scale(12),
    borderRadius: scale(5),
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: scale(20),
    width: scale(20),
    tintColor: darkColors.black,
  },
  btnLabel: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(12),
  },
  end: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  accordion: {
    backgroundColor: darkColors.darkGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: moderateScale(13),
    color: 'white',
    paddingVertical: verticalScale(14),
    fontFamily: fonts.MontserratSemiBold,
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(6),
    borderWidth: scale(1),
    borderRadius: scale(4),
    borderColor: darkColors.black,
  },
  socialBtnLabel: {
    color: darkColors.black,
    fontSize: moderateScale(13),
    fontFamily: fonts.MontserratSemiBold,
    paddingLeft: scale(12),
  },
  wrapper: {
    flex: 0.525,
  },
  appleButton: {
    borderWidth: scale(1),
    borderColor: 'black',
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
