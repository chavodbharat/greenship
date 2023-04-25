import React from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import LinearGradient from '../linearGradient';
import { darkColors } from '../../theme/colors';
import { PetPassportSubHeaderTypePropsInterface } from './types';

const PetPassportSubHeader = ({title, petImage}: PetPassportSubHeaderTypePropsInterface) => {
  
  return (
    <LinearGradient
      isHorizontal={false}
      childStyle={styles.gradientChildStyle}
      allColorsArray={[darkColors.listBackGradientOne, darkColors.listBackGradientThree]}
      childrean={
        <View style={[styles.parentView]}>
          <View style={styles.flexZero}>
            <Image
              style={styles.petImageIcon}
              source={{uri: petImage}} />
          </View>
          <View style={[styles.flexOne, { justifyContent: 'center' }]}>
            <Text
              style={styles.headerLabelStyle}>
              {title}
            </Text>
          </View>
        </View>
      }
    />
  );
};

export default PetPassportSubHeader;
