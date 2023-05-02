import React, {useState,useEffect} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../../../theme/colors';
import { useTheme } from '../../../providers/ThemeProvider';
import {goBack} from '../../../routing/navigationRef';
import {scale} from '../../../theme/responsive';
import {shallowEqual, useSelector,useDispatch} from 'react-redux';
import {TextInput} from 'react-native-paper';
import { allGenderStaticData } from '../../../utils/Constants/AllConstance';
import { getPetArtList } from '../../../redux/actions/petAction';
import AllImages from '../../../utils/Constants/AllImages';
import ActionSheet from '../../../components/actionSheet';
import ActionSheetModal from 'react-native-modal';
import CustomTrackMarkSlider from '../../../components/customTrackMarkSlider';

const genderType = ['Men', 'Women', 'Other'];

const SearchMember = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const profilePic = route?.params?.userPic;
  const [option,setOption] = useState(route.params?.option)
  const [ isViewOnly,setIsViewOnly] = useState(false)
  const [state, setState] = useState({
    name: '',
    genderError: false,
    selectedGender: "Gender",
    isActionSheetShow: false,
    loader:false,
  });
  const [animalState, setAnimalState] = useState({
    name: '',
    artError: false,
    art: '',
    raceError: false,
    race: '',
    genderError: false,
    gender: '',
    petArtListData: [],
    petRaceListData: [],
    selectedPetArt: "Art",
    selectedPetRace: "Race",
    selectedGender: "Gender",
    actionSheetPosition: 0,
    isActionSheetShow: false,
    loader:false,
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  const petGenderListData = allGenderStaticData();

  useEffect(() => {
    callPetArtListFn();
  }, []);
  
  const callPetArtListFn = () => {
    setAnimalState(prev => ({...prev, loader: true}));

    dispatch(
      getPetArtList((res: any) => {
        if(res) {
          const { data } = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
          setAnimalState(prev => ({...prev, loader: false, petArtListData:  newArrayOfObj}));
        } else {
          setAnimalState(prev => ({...prev, loader: false, petArtListData: []}));
        }
      }),
    );
  };

  const dropDownPosition = (position: number) => {
    setAnimalState(prev => ({...prev, actionSheetPosition: position}));
    if(position == 0) {
      setAnimalState(prev => ({...prev, actionSheetData: animalState.petArtListData, isActionSheetShow: true}));
    }  else if(position == 2) {
      setAnimalState(prev => ({...prev, actionSheetData: petGenderListData, isActionSheetShow: true}));
    }
  }

  const clickOnActionSheetOption = async (index: number) => {
    const {petArtListData, actionSheetPosition, petRaceListData, countryList} = animalState;
    if(index!=petArtListData.length){
      if(actionSheetPosition == 0) {
        setAnimalState(prev => ({...prev, selectedPetArt: petArtListData[index].title, 
          isActionSheetShow: false, selectedPetRace: "Race"}));
      } else if(actionSheetPosition == 2) {
        setAnimalState(prev => ({...prev, selectedGender: petGenderListData[index].title, isActionSheetShow: false}));
      }
    }
  }

  const dropDownUserPosition = (position: number) => {
    setState(prev => ({...prev, actionSheetPosition: position}));
    if(position == 0) {
      setState(prev => ({...prev, actionSheetData: petGenderListData, isActionSheetShow: true}));
    }
  }

  const clickOnActionSheetUserOption = async (index: number) => {
    const {actionSheetPosition} = state;
      if(actionSheetPosition == 0) {
        setState(prev => ({...prev, selectedGender: petGenderListData[index].title, isActionSheetShow: false}));
      }
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Ionicons
          onPress={() => goBack()}
          name="arrow-back"
          color={darkColors.darkGreen}
          size={scale(30)}
        />
        <View style={styles.header}>
          <Image
            source={{uri: profilePic?.[0]?.full}}
            resizeMode="contain"
            style={styles.pic}
          />
          <Text style={styles.name}> {(userData?.nicename).toUpperCase()}</Text>
        </View>
        <View style={styles.boxView}>
          <View style={styles.optionMainView}>
         
            <Pressable style={[styles.optionView,{backgroundColor: option?darkColors.darkGreen:darkColors.lightGreen}]} onPress={()=>{setOption(true)}}>
            <Text style={styles.name}> User</Text>
            </Pressable>
           
            
            <Pressable style={[styles.optionView,{backgroundColor: option?darkColors.lightGreen:darkColors.darkGreen}]} onPress={()=>{setOption(false)}}>
            <Text style={styles.name}>Animal</Text>
            </Pressable>
            
          </View>
          {option?
          <View style={{width:'100%',paddingVertical:scale(10)}}>
               <TextInput
            value={state.name}
            mode="outlined"
            label={'Name'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setState(prev => ({
                ...prev,
                name: value,
              }));
            }}
            style={styles.txtInput1}
            placeholder="Name"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />
 <Pressable
              onPress={() => !isViewOnly && dropDownUserPosition(0)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedGender != "Gender" &&
                    {color: colors.black}]}>{state.selectedGender}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>

<Pressable onPress={()=>{}} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>Search now</Text>
          </Pressable>
          </View>
          :
          <View style={{width:'100%',paddingVertical:scale(10)}}>
               <TextInput
            value={animalState.name}
            mode="outlined"
            label={'Name'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setAnimalState(prev => ({
                ...prev,
                name: value,
              }));
            }}
            style={styles.txtInput1}
            placeholder="Name"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />

<Pressable
              onPress={() => !isViewOnly && dropDownPosition(0)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, animalState.selectedPetArt!="Art" &&
                    {color: colors.black}]}>{animalState.selectedPetArt}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => !isViewOnly && dropDownPosition(2)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, animalState.selectedGender != "Gender" &&
                    {color: colors.black}]}>{animalState.selectedGender}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>

            <CustomTrackMarkSlider/>

          <Pressable onPress={()=>{}} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>Search now</Text>
          </Pressable>
          </View>
        }
          
        </View>
      </View>
      <ActionSheetModal
        isVisible={animalState.isActionSheetShow}
        style={styles.actionModalStyle}>
        <ActionSheet
          actionSheetItems={animalState.actionSheetData}
          onCancelPress={() => setAnimalState(prev => ({...prev, isActionSheetShow: false}))}
          onPressItem={clickOnActionSheetOption}
        />
      </ActionSheetModal>
      <ActionSheetModal
        isVisible={state.isActionSheetShow}
        style={styles.actionModalStyle}>
        <ActionSheet
          actionSheetItems={state.actionSheetData}
          onCancelPress={() => setState(prev => ({...prev, isActionSheetShow: false}))}
          onPressItem={clickOnActionSheetUserOption}
        />
      </ActionSheetModal>
    </SafeAreaView>
  );
};

export default SearchMember;
