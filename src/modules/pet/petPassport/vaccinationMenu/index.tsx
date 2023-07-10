import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Header from '../../../../components/header';
import LinearGradient from '../../../../components/linearGradient';
import Spinner from '../../../../components/spinner';
import {scale, verticalScale} from '../../../../theme/responsive';
import {MenuOptions} from './types';
import {getPetVaccineMenuList} from '../../../../redux/actions/petAction';
import PetPassportSubHeader from '../../../../components/petPassportSubHeader';
import {navigate} from '../../../../routing/navigationRef';
import {PET_VACCINATION_SCREEN} from '../petVaccination';
import {useTheme} from '../../../../providers/ThemeProvider';
import PetHealthFloatingButton from '../../../../components/petHealthFloatingButton';
import {SEARCH_FILTER_SCREEN} from '../../../searchFilters/searchFilter';
import { useIsFocused } from '@react-navigation/native';
import { setActiveSubModule } from '../../../../redux/actions/authAction';

export const VACCINATION_MENU_SCREEN = {
  name: 'VaccinationMenu',
};

const VaccinationMenu = ({route}: any) => {
  const isFocused = useIsFocused();
  const {subscriptionDetails} = useSelector(
    state => ({
      subscriptionDetails: state.auth?.subscriptionDetails,
    }),
    shallowEqual,
  );
  const dispatch = useDispatch();
  const {petObj} = route.params;

  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    petPassportOptionsData: [],
  });

  useEffect(() => {
    callPetPassportMenuListFn();
  }, []);

  useEffect(() => {
    dispatch(setActiveSubModule(null));
  }, [isFocused]);

  const callPetPassportMenuListFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      form_id: petObj.form_id,
    };
    dispatch(
      getPetVaccineMenuList(body, (res: any) => {
        if (res) {
          const {data} = res;
          setState(prev => ({
            ...prev,
            loader: false,
            petPassportOptionsData: data.slice(2, data.length),
          }));
        } else {
          setState(prev => ({
            ...prev,
            loader: false,
            petPassportOptionsData: [],
          }));
        }
      }),
    );
  };

  const onPetPassportMenuItemPress = (data: MenuOptions) => {
    if (subscriptionDetails?.sub_status === 0) {
      navigate(PET_VACCINATION_SCREEN.name, {vaccineObj: data, petObj});
    } else {
      navigate('UpgradeToPro');
    }
  };

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
  };

  const renderItem = ({item, index}: any) => {
    return (
      <LinearGradient
        isHorizontal={false}
        childStyle={styles.linearGradientCustomStyle}
        childrean={
          <Pressable onPress={() => onPetPassportMenuItemPress(item)}>
            <View style={styles.petPassportOptionView}>
              <Image
                style={[styles.petPassportIconStyle]}
                source={{uri: item.icon}}
              />
              <Text style={styles.petListItemTextValueStyle}>{item.label}</Text>
            </View>
          </Pressable>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree} />
      <Header
        statusBarColor={colors.listBackGradientThree}
        onFilterPress={onFilterPress}
      />
      <PetPassportSubHeader
        title={petObj.pet_name}
        petImage={
          typeof petObj.pet_image === 'string'
            ? petObj.pet_image
            : petObj.pet_image.pet_image_url
        }
      />
      <View
        style={[
          styles.container,
          {
            marginLeft: scale(5),
            marginRight: scale(5),
            marginTop: verticalScale(3),
          },
        ]}>
        <FlatList
          data={state.petPassportOptionsData}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
      <PetHealthFloatingButton />
    </SafeAreaView>
  );
};

export default VaccinationMenu;
