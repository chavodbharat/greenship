import React from 'react';
import styles from './styles';
import {Image, Pressable, View} from 'react-native';
import AllImages from '../../utils/Constants/AllImages';
import LinearGradient from '../linearGradient';
import { darkColors } from '../../theme/colors';
import { navigate } from '../../routing/navigationRef';
import { VACCINATION_MENU_SCREEN } from '../../modules/pet/petPassport/vaccinationMenu';
import { PetHealthFloatingButtonTypePropsInterface } from './types';

const PetHealthFloatingButton = ({petObj}: PetHealthFloatingButtonTypePropsInterface) => {

  const clickOnPetHealthIcon = () => {
    navigate(VACCINATION_MENU_SCREEN.name, {petObj})
  }
 
  return (
    <>
      <View style={styles.petViewParentView}>
        <LinearGradient
          isHorizontal={false}
          childStyle={styles.gradientPetChildStyle}
          allColorsArray={[darkColors.listBackGradientTwo, darkColors.listBackGradientThree]}
          childrean={
            <Image
              style={styles.petIconStyle}
              source={AllImages.myPetIcon}/>
          }
        />
      </View>  
      <View style={[styles.petViewParentView,{right: 0}]}>
        <LinearGradient
          isHorizontal={false}
          childStyle={styles.gradientHealthChildStyle}
          allColorsArray={[darkColors.petPassportGradientOne, darkColors.petPassportGradientThree]}
          childrean={
            <Pressable
              onPress={clickOnPetHealthIcon}>
              <Image
                style={styles.healthIconStyle}
                source={AllImages.petHealthIcon}/>
            </Pressable>
          }
        />
      </View>  
    </>
  );
};

export default PetHealthFloatingButton;
