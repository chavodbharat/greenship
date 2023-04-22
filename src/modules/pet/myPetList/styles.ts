import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../../theme/responsive';
import {darkColors} from '../../../theme/colors';
import {fonts} from '../../../theme/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  parentView: {
    backgroundColor: darkColors.background,
    flex: 1,
  },
  flexDirectionRowView: {
    flexDirection: 'row'
  },
  flexOne: {
    flex: 1
  },
  flexZero: {
    flex: 0
  },
  petViewParentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(8), 
    marginBottom: verticalScale(8)
  },
  petAddParentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: scale(10), 
    borderRadius: 5,
    padding: scale(10),
    borderWidth: 1,
    borderColor: darkColors.darkGreen 
  },
  petImageStyle: {
    width: scale(80), 
    height: scale(80), 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: darkColors.darkGreen,
  },
  petAddImageStyle: {
    width: scale(80), 
    height: scale(80), 
    marginRight: verticalScale(20),
    tintColor: darkColors.darkGreen,
  },
  petNameTextStyle: {
    fontSize: moderateScale(16),
    color: darkColors.black, 
    fontFamily: fonts.MontserratBold
  },
  petListItemTextLabelStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratRegular
  },
  petListItemTextValueStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratBold
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
  editDeleteParentView: {
    position: 'absolute', 
    alignSelf: 'flex-end', 
    top: 0, 
    bottom: 0, 
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
