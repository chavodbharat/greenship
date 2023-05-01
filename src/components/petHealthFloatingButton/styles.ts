import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from '../../theme/responsive';
import {darkColors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';

export default StyleSheet.create({
  petViewParentView: {
    position: 'absolute', 
    justifyContent: 'center',
    top: Dimensions.get('window').width/1.2, 
    bottom: Dimensions.get('window').width/1.2,
  },
  gradientPetChildStyle: {
    flex: 0, 
    height: scale(60),
    justifyContent: 'center',
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  gradientHealthChildStyle: {
    flex: 0, 
    height: scale(60),
    justifyContent: 'center',
    marginRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: darkColors.petPassportGradientOne
  },
  healthChildView: {
    backgroundColor: darkColors.gradientLightGray, 
    padding: scale(10), 
    borderTopLeftRadius: scale(5),
    borderBottomLeftRadius: scale(5)
  },
  petIconStyle: {
    width: scale(28), 
    height: scale(42)
  },
  healthIconStyle: {
    width: scale(42), 
    height: scale(42)
  }
});
