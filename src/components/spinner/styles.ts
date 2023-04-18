import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

const transparent = 'transparent';
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  container: {
    backgroundColor: transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    left: scale(20),
    position: 'absolute',
    right: scale(20),
    top: verticalScale(300),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  wrapper: {
    backgroundColor: 'white',
    height: scale(150),
    width: '80%',
  },
  textContent: {
    fontSize: moderateScale(20),
    color: darkColors.darkGreen,
    paddingVertical: scale(30),
    paddingLeft: scale(12),
    fontFamily: fonts.MontserratRegular,
  },
});

export default styles;
