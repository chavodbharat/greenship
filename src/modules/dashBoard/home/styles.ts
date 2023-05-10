import {StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  main: {
    marginTop: verticalScale(50),
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
  logo: {
    height: scale(110),
    width: scale(110),
    borderRadius: scale(55),
  },
  upload: {
    height: scale(33),
    width: scale(33),
    position: 'absolute',
    right: scale(120),
    bottom: scale(-5),
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: scale(35),
    marginTop: verticalScale(50),
  },
  box: {
    height: scale(120),
    width: scale(120),
    marginRight: scale(16),
    borderRadius: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: 'black',
    alignSelf: 'center',
    marginVertical: verticalScale(10),
    marginLeft: scale(-10),
    fontFamily: fonts.MontserratBold,
  },
  tileImg: {
    height: scale(85),
    width: scale(85),
  },
});
