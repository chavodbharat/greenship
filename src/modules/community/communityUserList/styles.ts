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
  memberViewParentView: {
    flex: 1,
    flexDirection: 'row',
    marginTop: verticalScale(5), 
    marginBottom: verticalScale(5)
  },
  memberAddParentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: scale(10), 
    borderRadius: scale(5),
    padding: scale(10),
  },
  memberImageStyle: {
    width: scale(100), 
    height: scale(100), 
    borderRadius: scale(5),
  },
  mainView: {
    flex: 1,
    paddingLeft: scale(5),
    paddingRight: scale(5),
    marginLeft: scale(10),
    marginRight: scale(10),
    marginTop: verticalScale(5),
    marginBottom: verticalScale(5),
    borderRadius: scale(5),
  },
  memberAddImageStyle: {
    width: scale(80), 
    height: scale(80), 
    marginRight: verticalScale(20),
    tintColor: darkColors.darkGreen,
  },
  memberNameTextStyle: {
    fontSize: moderateScale(16),
    color: darkColors.black, 
    fontFamily: fonts.MontserratBold
  },
  memberListItemTextLabelStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratRegular
  },
  memberListItemTextValueStyle: {
    fontSize: moderateScale(16),
    color: darkColors.white, 
    fontFamily: fonts.MontserratBold
  },
  memberListItemDesTextValueStyle: {
    fontSize: moderateScale(14),
    color: darkColors.white, 
    fontFamily: fonts.MontserratRegular,
    marginTop:scale(5)
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
    backgroundColor: darkColors.memberListEditDeleteBackColor, 
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
  },
  header: {
    flexDirection: 'row',
    backgroundColor: darkColors.darkGreen,
    borderRadius: scale(5),
    marginVertical: verticalScale(8),
    marginHorizontal: scale(10)
  },
  pic: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(5),
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
  listTitle:{
    marginTop:scale(10),
    marginBottom:scale(5)
  },
  listTitleText:{
    color: darkColors.black,
    paddingLeft: scale(10),
    fontFamily: fonts.MontserratSemiBold,
    fontSize: moderateScale(16),
  }
});
