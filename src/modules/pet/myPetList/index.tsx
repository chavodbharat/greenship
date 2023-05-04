import React, { useEffect, useState } from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import { deletePet, getPetListData } from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import { useIsFocused } from '@react-navigation/native';
import { store } from '../../../store/configureStore';
import { types } from '../../../redux/ActionTypes';
import PetHealthFloatingButton from '../../../components/petHealthFloatingButton';
import PetListView from '../../../components/petListView';

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

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree}/>
      <Header
        statusBarColor={colors.listBackGradientThree}/>
      <PetListView 
        petListData={state.petListData}
        onDeletePress={(currentPetId) => callDeletePetFn(currentPetId)}
        isModalVisible={state.isModalVisible}
        onDeleteModalShowOrHide={(status) => setState(prev => ({...prev, isModalVisible: status}))}/>
      <PetHealthFloatingButton />
    </SafeAreaView>
  );
};

export default MyPetList;
