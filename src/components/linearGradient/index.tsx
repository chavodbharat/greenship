import React, {ReactElement, useState} from 'react';
import { LinearGradientTypePropsInterface } from './types';
import LinearGradient from 'react-native-linear-gradient';
import { Styles } from './styles';
import { useTheme } from '../../providers/ThemeProvider';
import { darkColors } from '../../theme/colors';

const LinearGradientView = ({childrean, isHorizontal = true, childStyle, allColorsArray,
  isBorderWidthApply = false}: LinearGradientTypePropsInterface) => {
  const { colors } = useTheme();

  return (
    (isHorizontal ?
      <LinearGradient 
        start={{x: 0, y: 0}} 
        end={{x: 1, y: 0}} 
        colors={allColorsArray ? allColorsArray : [colors.listBackGradientOne, colors.listBackGradientTwo, colors.listBackGradientThree]} 
        style={[Styles.linearGradientBack, isBorderWidthApply && { borderWidth: 1,
          borderColor: darkColors.lightGreen}]}>
        {childrean}
      </LinearGradient>
      :
      <LinearGradient 
        colors={allColorsArray ?  allColorsArray : [colors.petPassportGradientOne, colors.petPassportGradientTwo, colors.petPassportGradientThree]} 
        style={[Styles.linearGradientBack, childStyle]}>
        {childrean}
      </LinearGradient> 
    )
  );
};

export default LinearGradientView;