import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
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
import PetHealthFloatingButton from '../../../../components/petHealthFloatingButton';
import { IDENTIFICATION_OF_ANIMAL_SCREEN } from '../identificationOfAnimal';
import { ISSUE_OF_IDENTITY_CARD_SCREEN } from '../issueOfIdentityCard';
import { SEARCH_FILTER_SCREEN } from '../../../searchFilters/searchFilter';

export const PET_PASSPORT_MENU_SCREEN = {
  name: 'PetPassportMenu',
};

const PetPassportMenu = ({route}: any) => {
  const dispatch = useDispatch();
  const { petObj } = route.params;

  console.log("PetObj", petObj)
  
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
          setState(prev => ({...prev, loader: false, petPassportOptionsData: data.slice(0, 2)}));
        } else {
          setState(prev => ({...prev, loader: false, petPassportOptionsData: []}));
        }
      }),
    );
  };

  const onPetPassportMenuItemPress = (data: MenuOptions, position: number) => {
    if(position == 0) {
      navigate(IDENTIFICATION_OF_ANIMAL_SCREEN.name, {vaccineObj: data, petObj});
    } else if(position == 1) {
      navigate(ISSUE_OF_IDENTITY_CARD_SCREEN.name, {vaccineObj: data, petObj});
    } else {
      navigate(PET_VACCINATION_SCREEN.name, {vaccineObj: data, petObj});
    }
  }

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
  }

  const renderPetBasicDetails = () => {
    return (
      <View style={[styles.flexZero,{marginTop: verticalScale(10), 
        marginBottom: verticalScale(20)}]}>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Art</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_art}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Race</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_race}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Gender</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_gender}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Country</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_country}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Date of Birth</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_birth_date}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Postalcode</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_zipcode}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Size</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_size}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Weight</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_weight}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Color</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_color}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Pet Age</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_age}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Is Pet Missing</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_vermisst}</Text>
          </View>
        </View>
        <View style={[styles.flexDirectionRowView,{margin: scale(6)}]}>
          <View style={styles.flexOne}>
            <Text style={[styles.petDetailsLabelStyle,{marginTop: 0}]}>Family Tree</Text>
          </View>
          <View style={styles.flexOnePointFive}>
            <Text style={styles.petDetailsValueStyle}>{petObj?.pet_stammbaum}</Text>
          </View>
        </View>
      </View>
    )
  }

  const renderItem = ({item, index}: any) => {
    return (
      <LinearGradient
        isHorizontal={false}
        childStyle={styles.linearGradientCustomStyle}
        childrean={
          <Pressable
            onPress={() => onPetPassportMenuItemPress(item, index)}>
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
      <Spinner visible={state?.loader} color={colors.listBackGradientThree}/>
      <Header
        statusBarColor={colors.listBackGradientThree}
        onFilterPress={onFilterPress} />
      <PetPassportSubHeader
        title={petObj.pet_name}
        petImage={typeof petObj.pet_image === "string" ? petObj.pet_image : petObj.pet_image.pet_image_url}
      />  
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.container, {marginLeft: scale(5), marginRight: scale(5),
          marginTop: verticalScale(3)}]}>
          {renderPetBasicDetails()} 
          <FlatList
            style={{marginBottom: scale(20)}}
            data={state.petPassportOptionsData}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View> 
      </ScrollView>
      <PetHealthFloatingButton />
    </SafeAreaView>
  );
};

export default PetPassportMenu;
