import React from 'react';
import styles from './styles';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {darkColors} from '../../theme/colors';
import { DigitalerTierpassViewTypePropsInterface } from './types';
import { scale, verticalScale } from '../../theme/responsive';
import LinearGradient from '../linearGradient';
import { useTheme } from '../../providers/ThemeProvider';

const DigitalerTierpassView = ({petProfilePicRes}: DigitalerTierpassViewTypePropsInterface) => {
  
  const {colors} = useTheme();
  
  return (
    <View style={styles.flexOne}>
      <LinearGradient
        isHorizontal={false}
        childStyle={styles.gradientChildStyle}
        allColorsArray={[colors.listBackGradientTwo, colors.listBackGradientThree]}
        childrean={
          <View style={[styles.flexOne,{alignItems: 'center', paddingTop: verticalScale(10)}]}>
            <Text style={styles.digitalPassportLabel}>DIGITALER TIERPASS</Text>
            <Text style={styles.petPassportLabel}>PET PASSPORT</Text>
          </View>
        }
      />
      <Image
        style={styles.petProfilePicView}
        source={{uri: petProfilePicRes.path}}
        resizeMode="contain"/>
    </View> 
  );
};

export default DigitalerTierpassView;
