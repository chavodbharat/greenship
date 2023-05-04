import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  flexOne: {
    flex: 1
  },
  flexTwo: {
    flex: 1.5
  },
  flexZero: {
    flex: 0
  },
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  petViewParentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(8)
  },
  petImageStyle: {
    width: scale(90), 
    height: scale(100), 
    borderRadius: scale(5), 
  },
  missingStatusTextStyle: {
    fontSize: moderateScale(12),
    position:'absolute',
    textAlign: 'center',
    right: 0,
    left: 0,
    bottom: verticalScale(8),
    color: darkColors.toastBorderErrorColor, 
    fontFamily: fonts.MontserratSemiBold
  },
  petListItemTextLabelStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratRegular
  },
  petListItemTextValueStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratRegular
  },
  editDeleteParentView: {
    position: 'absolute', 
    alignSelf: 'flex-end', 
    top: verticalScale(15), 
    paddingLeft: scale(10),
    bottom: verticalScale(15), 
    justifyContent: 'center', 
    right: verticalScale(-10)
  },
  editDeleteChildView: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    flexDirection: 'row',
    backgroundColor: darkColors.petListEditDeleteBackColor, 
    padding: scale(10)
  },
  handImageStyle: {
    width: scale(18), 
    height: scale(18), 
    tintColor: darkColors.darkGrey
  },
  editDeleteIconView: {
    flex: 0,
    marginLeft: verticalScale(10),
    marginRight: verticalScale(10)
  }
});
