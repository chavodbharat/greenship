import React, {useState,useEffect} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, Image, Pressable, ScrollView} from 'react-native';
import {darkColors} from '../../../theme/colors';
import { useTheme } from '../../../providers/ThemeProvider';
import {navigate} from '../../../routing/navigationRef';
import {scale} from '../../../theme/responsive';
import {shallowEqual, useSelector,useDispatch} from 'react-redux';
import {TextInput} from 'react-native-paper';
import { allGenderStaticData } from '../../../utils/Constants/AllConstance';
import { getPetArtList, getPetRaceList } from '../../../redux/actions/petAction';
import AllImages from '../../../utils/Constants/AllImages';
import ActionSheet from '../../../components/actionSheet';
import ActionSheetModal from 'react-native-modal';
import Header from '../../../components/header';
import RadiusSeekBar from '../../../components/chooseRadiusModal/radiusSeekBar';
import { SEARCH_PET_USER_LIST_SCREEN } from '../searchPetUserList';
import CustomRadiusSeekbar from '../../../components/customRadiusSeekbar';

export const SEARCH_FILTER_SCREEN = {
  name: 'SearchFilter',
};

const SearchFilter = ({route}: any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  
  const { userPic, isPetTabShow = false } = route.params;
  //const [option,setOption] = useState(route.params?.option)
  const [state, setState] = useState({
    name: '',
    selectedGender: "Gender",
    actionSheetPosition: 0,
    isActionSheetShow: false,
    loader:false,
    selectedRadius: 25,
    activeTab: 0
  });
  const [animalState, setAnimalState] = useState({
    name: '',
    petArtListData: [],
    petRaceListData: [],
    selectedPetArt: "Art",
    selectedPetRace: "Race",
    selectedGender: "Gender",
    actionSheetPosition: 0,
    isActionSheetShow: false,
    selectedRadius: 25,
    selectedAge: 0-5,
    loader: false
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
    setState(prev => ({...prev, activeTab: isPetTabShow ? 1 : 0}));
    
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

  const callPetRaceListFn = (artName: string) => {
    setAnimalState(prev => ({...prev, loader: true}));
    const body = {
      petArt: artName
    } 

    dispatch(
      getPetRaceList(body, (res: any) => {
        if(res) {
          const { data } = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
          setAnimalState(prev => ({...prev, loader: false, petRaceListData:  newArrayOfObj}));
        } else {
          setAnimalState(prev => ({...prev, loader: false, petRaceListData: []}));
        }
      }),
    );
  };

  const dropDownPosition = (position: number) => {
    setAnimalState(prev => ({...prev, actionSheetPosition: position}));
    if(position == 0) {
      setAnimalState(prev => ({...prev, actionSheetData: animalState.petArtListData, isActionSheetShow: true}));
    } else if(position == 1) {
      setAnimalState(prev => ({...prev, actionSheetData: animalState.petRaceListData, isActionSheetShow: true}));
    } else if(position == 2) {
      setAnimalState(prev => ({...prev, actionSheetData: petGenderListData, isActionSheetShow: true}));
    }
  }

  const clickOnActionSheetOption = async (index: number) => {
    const {petArtListData, actionSheetPosition, petRaceListData} = animalState;
    if(index!=petArtListData.length){
      if(actionSheetPosition == 0) {
        setAnimalState(prev => ({...prev, selectedPetArt: petArtListData[index].title, 
          isActionSheetShow: false, selectedPetRace: "Race"}));
          callPetRaceListFn(petArtListData[index].title);
      } else if(actionSheetPosition == 1) {
        setAnimalState(prev => ({...prev, selectedPetRace: petRaceListData[index].title, isActionSheetShow: false}));
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

  const onRadiusChange = (data: any) => {
    data = data.replace(" km", "");
    if(state.activeTab == 0){
      setState(prev => ({...prev, selectedRadius: data}));
    } else {
      setAnimalState(prev => ({...prev, selectedRadius: data}));
    }
  }

  const onAgeChange = (data: any) => { 
    setAnimalState(prev => ({...prev, selectedAge: data}));
  }

  const onSearchPress = () => {
    if(state.activeTab == 0) {
      //For User
      const {name, selectedGender, selectedRadius} = state;
      navigate(SEARCH_PET_USER_LIST_SCREEN.name, {isUser: true, name, gender: 
        selectedGender === "Gender" ? "" : selectedGender, radius: selectedRadius,
        profilePic: userPic});
    } else {
      //For Animal
      const {name, selectedGender, selectedRadius, selectedPetArt, selectedPetRace, selectedAge} = animalState;
      navigate(SEARCH_PET_USER_LIST_SCREEN.name, {isUser: false, name, 
        gender: selectedGender === "Gender" ? "" : selectedGender, radius: selectedRadius,
        profilePic: userPic, petArt: selectedPetArt, petRace: selectedPetRace, petAge: selectedAge});
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <Header
        statusBarColor={darkColors.communityGreenColor}/>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={{uri: userPic?.[0]?.full}}
              resizeMode="contain"
              style={styles.pic}
            />
            <Text style={styles.name}> {(userData?.nicename).toUpperCase()}</Text>
          </View>
          <View style={styles.boxView}>
            <View style={styles.optionMainView}>
              <Pressable style={[styles.optionView, { backgroundColor: state.activeTab == 0 
                ? darkColors.darkGreen : darkColors.lightGreen}]} 
                onPress={()=> setState(prev => ({...prev, activeTab: 0}))}>
                <Text style={styles.name}> User</Text>
              </Pressable>
              <Pressable style={[styles.optionView,{backgroundColor: state.activeTab == 0 
                ? darkColors.lightGreen : darkColors.darkGreen}]} 
                onPress={()=> setState(prev => ({...prev, activeTab: 1}))}>
                <Text style={styles.name}>Animal</Text>
              </Pressable>
            </View>
            {state.activeTab == 0 ?
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
                      name: value
                    }));
                  }}
                  style={styles.txtInput1}
                  placeholder="Name"
                  placeholderTextColor={'gray'}
                  autoCapitalize="none"
                />

                <Pressable
                  onPress={() => dropDownUserPosition(0)}>
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

                <View style={{margin: scale(20)}}>
                  <Text style={styles.radiusTxtStyle}>Radius</Text>
                  <CustomRadiusSeekbar 
                    dataArray={["25 km", "50 km", "100 km", "200 km"]} 
                    dotsColor={darkColors.communityGreenColor} 
                    dots={4} 
                    onRadiusChange={onRadiusChange} />
                </View>
              
                <Pressable onPress={onSearchPress} style={styles.searchBtnStyle}>
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
                  onPress={() => dropDownPosition(0)}>
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
                  onPress={() => dropDownPosition(1)}>
                  <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                    <View style={styles.flexOne}>
                      <Text style={[styles.dropdownLabelStyle, animalState.selectedPetRace!="Race" &&
                        {color: colors.black}]}>{animalState.selectedPetRace}</Text>
                    </View>
                    <View style={styles.flexZero}>
                      <Image
                        style={styles.dropDownIconStyle}
                        source={AllImages.dropdownIcon}/>
                    </View>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => dropDownPosition(2)}>
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

                <View style={{margin: scale(20)}}>
                  <Text style={styles.radiusTxtStyle}>Age (in years)</Text>
                  <CustomRadiusSeekbar 
                    dataArray={["0-5", "6-10", "11-16", "17-30"]} 
                    dotsColor={darkColors.communityGreenColor} 
                    dots={4} 
                    onRadiusChange={onAgeChange} />
                </View>

                <View style={{margin: scale(20)}}>
                  <Text style={[styles.radiusTxtStyle,{marginTop: scale(20)}]}>Radius</Text>
                  <CustomRadiusSeekbar 
                    dataArray={["25 km", "50 km", "100 km", "200 km"]} 
                    dotsColor={darkColors.communityGreenColor} 
                    dots={4} 
                    onRadiusChange={onRadiusChange} />
                </View>

                <Pressable onPress={onSearchPress} style={styles.searchBtnStyle}>
                  <Text style={styles.btnLabel}>Search now</Text>
                </Pressable>
              </View>
            }
          </View>
        </View>
      </ScrollView>
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

export default SearchFilter;
