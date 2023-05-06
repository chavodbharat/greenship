import React, { useEffect, useState } from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import { deletePet, getPetListData } from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import { useIsFocused } from '@react-navigation/native';
import { store } from '../../../store/configureStore';
import { types } from '../../../redux/ActionTypes';
import PetHealthFloatingButton from '../../../components/petHealthFloatingButton';
import PetListView from '../../../components/petListView';
import { setActiveSubModule } from '../../../redux/actions/authAction';
import { navigate } from '../../../routing/navigationRef';

export const MY_PET_LIST_SCREEN = {
  name: 'MyPetList',
};

const MyPetList = ({route}) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const isFocused = useIsFocused();
  const [state, setState] = useState({
    loader: false,
    isAdditionalMenuShow: false,
    menuOpenPosition: -1,
    petListData: [],
    formId: "",
    isModalVisible: false,
  });

  const profilePic = route?.params?.userPic;

  useEffect(() => {
    callPetListFn();
  }, [isFocused]);
  
  const callPetListFn = () => {
    setState(prev => ({...prev, loader: true}));

    // console.log("currentLatitude", currentLatitude);
    // console.log("currentLongitude", currentLongitude);
    // console.log("currentAddress", currentAddress);

    //Manage Floating button
    dispatch(setActiveSubModule(null))

    dispatch(
      getPetListData((res: any) => {
        if(res) {
          const { data } = res;
          store.dispatch({
            type: types.UPDATE_NEW_FORM_ID,
            payload: data.new_form_id,
          });
          setState(prev => ({...prev, loader: false, petListData:  data.pets_list.reverse(), 
            formId: data.new_form_id}));
        } else {
          setState(prev => ({...prev, loader: false, petListData: []}));
        }
      }),
    );
  };

  const callDeletePetFn = (petId: string) => {
    setState(prev => ({...prev, loader: true, isModalVisible: false}));
    dispatch(
      deletePet({petId}, (res: any) => {
        if(res) {
          callPetListFn();
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  };

  const onFilterPress = () => {
    navigate("SearchFilter", {userPic: profilePic})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree}/>
      <Header
        statusBarColor={colors.listBackGradientThree}
        onFilterPress={onFilterPress}/>
      <PetListView 
        petListData={state.petListData}
        onDeletePress={(currentPetId) => callDeletePetFn(currentPetId)}
        isModalVisible={state.isModalVisible}
        onDeleteModalShowOrHide={(status) => setState(prev => ({...prev, isModalVisible: status}))}/>
    </SafeAreaView>
  );
};

export default MyPetList;
