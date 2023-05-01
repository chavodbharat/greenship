import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../../components/header';
import LinearGradient from '../../../../components/linearGradient';
import Spinner from '../.././../../components/spinner';
import { scale, verticalScale } from '../../../../theme/responsive';
import { MenuOptions } from './types';
import { getPetVaccineMenuList } from '../../../../redux/actions/petAction';
import PetPassportSubHeader from '../../../../components/petPassportSubHeader';
import { navigate } from '../../../../routing/navigationRef';
import { PET_VACCINATION_SCREEN } from '../petVaccination';
import { useTheme } from '../../../../providers/ThemeProvider';
import { ADD_PET_SCREEN } from '../../addPet';

export const PET_PASSPORT_MENU_SCREEN = {
  name: 'PetPassportMenu',
};

const PetPassportMenu = ({route}: any) => {
  const dispatch = useDispatch();
  const { petObj } = route.params;
  
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    petPassportOptionsData: []
  });

  useEffect(() => {
    callPetPassportMenuListFn();
  }, []);
  
  const callPetPassportMenuListFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      'form_id': petObj.form_id
    }
    dispatch(
      getPetVaccineMenuList(body,(res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, loader: false, petPassportOptionsData:  data.splice(0, 2)}));
        } else {
          setState(prev => ({...prev, loader: false, petPassportOptionsData: []}));
        }
      }),
    );
  };

  const onPetPassportMenuItemPress = (data: MenuOptions) => {
   // navigate(PET_VACCINATION_SCREEN.name, {vaccineObj: data, petObj});
    navigate(ADD_PET_SCREEN.name, {formId: petObj.form_id, petId: petObj.pet_id, 
      isViewOnly: true, isEditMode: false})
  }

  const renderItem = ({item, index}: any) => {
    return (
      <LinearGradient
        isHorizontal={false}
        childStyle={styles.linearGradientCustomStyle}
        childrean={
          <Pressable
            onPress={() => onPetPassportMenuItemPress(item)}>
            <View style={styles.petPassportOptionView}>
              <Image
                style={[styles.petPassportIconStyle]}
                source={{uri: item.icon}}/>
              <Text style={styles.petListItemTextValueStyle}>{item.label}</Text>
            </View>
          </Pressable>
        }
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state.loader} />
      <Header
        statusBarColor={colors.listBackGradientThree}/>
      <PetPassportSubHeader
        title={petObj.pet_name}
        petImage={petObj.pet_image}
      />  
      <View style={[styles.container, {marginLeft: scale(5), marginRight: scale(5),
        marginTop: verticalScale(3)}]}>
        <FlatList
          data={state.petPassportOptionsData}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View> 
     
    </SafeAreaView>
  );
};

export default PetPassportMenu;
