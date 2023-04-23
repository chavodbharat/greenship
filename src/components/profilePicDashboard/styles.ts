import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import {fonts} from '../../theme/fonts';

export default StyleSheet.create({
  main: {
    backgroundColor: darkColors.green,
    alignItems: 'center',
    borderRadius: scale(4),
    height: scale(130),
  },

  userName: {
    color: 'white',
    fontSize: moderateScale(20),
    fontFamily: fonts.MontserratSemiBold,
    paddingTop: verticalScale(8),
  },
  userRole: {
    color: 'white',
    fontSize: moderateScale(14),
    fontFamily: fonts.MontserratSemiBold,
    paddingTop: verticalScale(8),
  },
  userPicWrapper: {},
  imgWrapper: {
    flexDirection: 'row',
  },
  img: {
    height: scale(110),
    width: scale(110),
    borderRadius: scale(55),
    backgroundColor: 'gray',
    marginTop: verticalScale(-50),
    marginLeft: scale(115),
  },
  uploadWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pressableUpload: {
    height: scale(30),
    width: scale(30),
    marginRight: scale(20),
  },
  upload: {
    height: scale(30),
    width: scale(30),
    marginTop: verticalScale(-12),
    marginRight: scale(20),
  },
  upload1: {
    height: scale(30),
    width: scale(30),
    marginTop: verticalScale(30),
    marginLeft: scale(-40),
  },
  modalStyle: {
    height: 'auto',
  },
});
