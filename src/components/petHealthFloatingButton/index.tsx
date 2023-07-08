import React, {useEffect} from 'react';
import styles from './styles';
import {Image, Pressable, View} from 'react-native';
import AllImages from '../../utils/Constants/AllImages';
import LinearGradient from '../linearGradient';
import {darkColors} from '../../theme/colors';
import {navigate} from '../../routing/navigationRef';
import {VACCINATION_MENU_SCREEN} from '../../modules/pet/petPassport/vaccinationMenu';
import {PetHealthFloatingButtonTypePropsInterface} from './types';
import {MY_PET_LIST_SCREEN} from '../../modules/pet/myPetList';
import {PET_PASSPORT_MENU_SCREEN} from '../../modules/pet/petPassport/petPassportMenu';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {getSubscriptionDetails} from '../../redux/actions/homeAction';
import {BackgroundImage} from 'react-native-elements/dist/config';

const PetHealthFloatingButton = ({
  petObj,
  isPetHealthViewShow = false,
}: PetHealthFloatingButtonTypePropsInterface) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionDetails());
  }, []);
  const clickOnPetHealthIcon = () => {
    navigate(VACCINATION_MENU_SCREEN.name, {petObj});
  };

  const clickOnPetIcon = () => {
    navigate(MY_PET_LIST_SCREEN.name);
  };

  return (
    <>
      <View style={styles.petViewParentView}>
        <LinearGradient
          isHorizontal={false}
          childStyle={styles.gradientPetChildStyle}
          allColorsArray={[
            darkColors.listBackGradientTwo,
            darkColors.listBackGradientThree,
          ]}
          childrean={
            <Pressable onPress={clickOnPetIcon}>
              <Image style={styles.petIconStyle} source={AllImages.myPetIcon} />
            </Pressable>
          }
        />
      </View>
      {isPetHealthViewShow && (
        <View style={[styles.petViewParentView, {right: 0}]}>
          <LinearGradient
            isHorizontal={false}
            childStyle={styles.gradientHealthChildStyle}
            allColorsArray={[
              darkColors.petPassportGradientOne,
              darkColors.petPassportGradientThree,
            ]}
            childrean={
              <Pressable onPress={clickOnPetHealthIcon}>
                <Image
                  style={styles.healthIconStyle}
                  source={AllImages.petHealthIcon}
                />
              </Pressable>
            }
          />
        </View>
      )}
    </>
  );
};

export default PetHealthFloatingButton;
