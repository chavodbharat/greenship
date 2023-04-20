import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../../components/header';
import { useTheme } from '../../../../providers/ThemeProvider';
import LinearGradient from '../../../../components/linearGradient';
import Spinner from '../.././../../components/spinner';
import { scale } from '../../../../theme/responsive';
import { MenuOptions } from './types';
import { getPetVaccineMenuList } from '../../../../redux/actions/petAction';

export const PET_PASSPORT_MENU_SCREEN = {
  name: 'PetPassportMenu',
};

const PetPassportMenu = ({route}: any) => {
  const dispatch = useDispatch();
  const { formId } = route.params;
  
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
      'form_id': formId
    }
    dispatch(
      getPetVaccineMenuList(body,(res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, loader: false, petPassportOptionsData:  data}));
        } else {
          setState(prev => ({...prev, loader: false, petPassportOptionsData: []}));
        }
      }),
    );
  };

  const onPetPassportMenuItemPress = (data: MenuOptions) => {
    //navigate(PET_PASSPORT_RABIES_VACCINATION_SCREEN.name, {vaccineObj: data, petObj});
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
      <Header/>
      <View style={[styles.container, {margin: scale(5)}]}>
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
