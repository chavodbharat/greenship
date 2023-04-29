import React, { useEffect, useState } from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import LinearGradient from '../../../components/linearGradient';
import AllImages from '../../../utils/Constants/AllImages';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { getAllCountryList, getPetArtList, getPetDetails, getPetRaceList } from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import { scale, verticalScale } from '../../../theme/responsive';
import { Button, TextInput } from 'react-native-paper';
import ActionSheet from '../../../components/actionSheet';
import ActionSheetModal from 'react-native-modal';
import { TAG_DATE_FORMATE, allGenderStaticData } from '../../../utils/Constants/AllConstance';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ADD_ADDITIONAL_PET_DETAILS_SCREEN } from './AddAdditionalPetDetails';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelection from '../../../components/imageSelection';

export const ADD_PET_SCREEN = {
  name: 'AddPet',
};

const AddPet = ({route}: any) => {
  const dispatch = useDispatch();
  const { formId, petId, isEditMode } = route.params;
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    petName: "",
    actionSheetPosition: 0,
    actionSheetData: [],
    isActionSheetShow: false,
    petArtListData: [],
    petRaceListData: [],
    countryList: [],
    imageResponse: null,
    selectedPetArt: "Please Select Art",
    selectedPetRace: "Please Select Race",
    selectedGender: "Please Select Gender",
    selectedCountry: "Please Select Country",
    postCode: "",
    selectedDateOfBirth: "Select Date Of Birth",
    isDateModalOpen: false,
    imageType: '',
    imageModalVisible: false,
    petObj: {}
  });

  //Static Data
  const petGenderListData = allGenderStaticData();

  useEffect(() => {
    callPetDetails();
    callPetArtListFn();
    callAllCountryListFn();
  }, []);
  
  const callPetArtListFn = () => {
    setState(prev => ({...prev, loader: true}));

    dispatch(
      getPetArtList((res: any) => {
        if(res) {
          const { data } = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
          setState(prev => ({...prev, loader: false, petArtListData:  newArrayOfObj}));
        } else {
          setState(prev => ({...prev, loader: false, petArtListData: []}));
        }
      }),
    );
  };

  const callAllCountryListFn = () => {
    dispatch(
      getAllCountryList((res: any) => {
        if(res) {
          const { data } = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
          setState(prev => ({...prev, countryList:  newArrayOfObj}));
        } else {
          setState(prev => ({...prev, countryList: []}));
        }
      }),
    );
  };

  const callPetRaceListFn = (artName: string) => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      petArt: artName
    } 

    dispatch(
      getPetRaceList(body, (res: any) => {
        if(res) {
          const { data } = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
          setState(prev => ({...prev, loader: false, petRaceListData:  newArrayOfObj}));
        } else {
          setState(prev => ({...prev, loader: false, petRaceListData: []}));
        }
      }),
    );
  };

  const callPetDetails = () => {
    if(petId && isEditMode) {
      dispatch(
        getPetDetails({petId: petId} , (res: any) => {
          if(res) {
            const { data } = res;
            const imageObj = {
              path: data.pet_image.pet_image_url,
              mime: "jpg",
              isEditMode: true
            }
            setState(prev => ({...prev, petName: data.pet_name, selectedPetArt: data.pet_art,
              selectedCountry: data.pet_country, selectedPetRace: data.pet_race, selectedGender:
              data.pet_gender, selectedDateOfBirth: data.pet_birth_date, postCode: data.pet_zipcode,
              imageResponse: imageObj, petObj: data
            }));
            callPetRaceListFn(data.pet_art);
            // const newArrayOfObj = data.map(({name: title, values: id}: any) => ({title, id}));
            // setState(prev => ({...prev, loader: false, petRaceListData:  newArrayOfObj}));
          }
        }),
      );
    }
  };

  const dropDownPosition = (position: number) => {
    setState(prev => ({...prev, actionSheetPosition: position}));
    if(position == 0) {
      setState(prev => ({...prev, actionSheetData: state.petArtListData, isActionSheetShow: true}));
    } else if(position == 1 && state.selectedPetArt != "Please Select Art"){
      setState(prev => ({...prev, actionSheetData: state.petRaceListData, isActionSheetShow: true}));
    } else if(position == 2) {
      setState(prev => ({...prev, actionSheetData: petGenderListData, isActionSheetShow: true}));
    } else if(position == 3) {
      setState(prev => ({...prev, actionSheetData: state.countryList, isActionSheetShow: true}));
    } else if(position == 4) {
      setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}));
    }
  }

  const clickOnActionSheetOption = async (index: number) => {
    const {petArtListData, actionSheetPosition, petRaceListData, countryList} = state;
    if(index!=petArtListData.length){
      if(actionSheetPosition == 0) {
        setState(prev => ({...prev, selectedPetArt: petArtListData[index].title, 
          isActionSheetShow: false, selectedPetRace: "Please Select Race"}));
        callPetRaceListFn(petArtListData[index].title);
      } else if(actionSheetPosition == 1) {
        setState(prev => ({...prev, selectedPetRace: petRaceListData[index].title, isActionSheetShow: false}));
      } else if(actionSheetPosition == 2) {
        setState(prev => ({...prev, selectedGender: petGenderListData[index].title, isActionSheetShow: false}));
      } else if(actionSheetPosition == 3) {
        setState(prev => ({...prev, selectedCountry: countryList[index].title, isActionSheetShow: false}));
      }
    }
  }

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        image.isEditMode = false;
        setState(prev => ({...prev, imageResponse: image, imageModalVisible: !prev.imageModalVisible}));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        image.isEditMode = false;
        setState(prev => ({...prev, imageResponse: image, imageModalVisible: !prev.imageModalVisible}));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const onContinuePress = () => {
    const artDefaultMessage = "Please Select Art";
    const raceDefaultMessage = "Please Select Race";
    const genderDefaultMessage = "Please Select Gender";
    const countryDefaultMessage = "Please Select Country";
    const dobDefaultMessage = "Select Date Of Birth";
    const {petName, selectedPetArt, selectedPetRace, selectedGender, selectedCountry, postCode,
      selectedDateOfBirth, imageResponse, petObj} = state;

    if(petName && selectedPetArt!=artDefaultMessage  && selectedPetRace!=raceDefaultMessage
      && selectedGender!=genderDefaultMessage && selectedCountry!=countryDefaultMessage 
      && postCode && selectedDateOfBirth != dobDefaultMessage){
      navigate(ADD_ADDITIONAL_PET_DETAILS_SCREEN.name, {petName, selectedPetArt,
        selectedPetRace, selectedGender, selectedDateOfBirth, formId, postCode,
        petProfilePicRes: imageResponse ? imageResponse : "", selectedCountry,
        isEdit: isEditMode, petObj});
    } else {
      if(!petName) {
        showMessage({ message: "Please enter pet name", type: 'danger'});
      } else if (selectedPetArt === artDefaultMessage){
        showMessage({ message: artDefaultMessage, type: 'danger'});
      } else if(selectedPetRace === raceDefaultMessage) {
        showMessage({ message: raceDefaultMessage, type: 'danger'});
      } else if(selectedGender === genderDefaultMessage) {
        showMessage({ message: genderDefaultMessage, type: 'danger'});
      } else if(selectedCountry === countryDefaultMessage) {
        showMessage({ message: countryDefaultMessage, type: 'danger'});
      } else if(!postCode) {
        showMessage({ message: "Please enter post code", type: 'danger'});
      } else if(selectedDateOfBirth === dobDefaultMessage) {
        showMessage({ message: dobDefaultMessage, type: 'danger'});
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} />
      <Header
        statusBarColor={colors.listBackGradientThree}/>
      <View style={styles.flexZero}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.flexOne, {padding: scale(25)}]}>
            <View style={styles.flexOne}>
              <LinearGradient
                isHorizontal={false}
                childStyle={styles.gradientChildStyle}
                allColorsArray={[darkColors.listBackGradientTwo, darkColors.listBackGradientThree]}
                childrean={
                  <View style={[styles.flexOne,{alignItems: 'center', paddingTop: verticalScale(10)}]}>
                    <Text style={styles.digitalPassportLabel}>DIGITALER TIERPASS</Text>
                    <Text style={styles.petPassportLabel}>PET PASSPORT</Text>
                  </View>
                }
              />
              <Image
                style={styles.petProfilePicView}
                source={state.imageResponse ? 
                  {uri: state.imageResponse?.path} : AllImages.appPlaceholderIcon}
                resizeMode="contain"/>

              <View style={styles.uploadWrapper}>
                <TouchableWithoutFeedback
                  onPress={() => dropDownPosition(4)}>
                  <Image
                    resizeMode="contain"
                    style={styles.pressableUpload}
                    source={AllImages.uploadIcon}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
            <TextInput
              mode="outlined"
              value={state.petName}
              label={"Name"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={(name) => setState(prev => ({...prev, petName: name}))}
              placeholder={"Enter Name"}
            />
            <Pressable
              onPress={() => dropDownPosition(0)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedPetArt!="Please Select Art" &&
                    {color: colors.black}]}>{state.selectedPetArt}</Text>
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
                  <Text style={[styles.dropdownLabelStyle, state.selectedPetRace!="Please Select Race" &&
                    {color: colors.black}]}>{state.selectedPetRace}</Text>
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
                  <Text style={[styles.dropdownLabelStyle, state.selectedGender != "Please Select Gender" &&
                    {color: colors.black}]}>{state.selectedGender}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => dropDownPosition(3)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedCountry!="Please Select Country" &&
                    {color: colors.black}]}>{state.selectedCountry}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            <TextInput
              mode="outlined"
              value={state.postCode}
              label={"Postcode"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={(code) => setState(prev => ({...prev, postCode: code}))}
              placeholder={"Enter Postcode"}
            />
            <Pressable
              onPress={() => setState(prev => ({...prev, isDateModalOpen: true}))}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedDateOfBirth != "Select Date Of Birth" &&
                    {color: colors.black}]}>{state.selectedDateOfBirth}</Text>
                </View>
                <View style={styles.flexZero}>
                  <AntIcon
                    name="calendar"
                    size={scale(18)}
                    color={colors.listBackGradientThree}
                  />
                </View>
              </View>
            </Pressable>
            <Button
              labelStyle={styles.loginFontStyle} 
              style={[styles.allButonStyle,{marginBottom: verticalScale(50)}]} mode="contained" 
              onPress={onContinuePress}>
              Continue
            </Button> 
          </View>
        </ScrollView>
      </View>
      <ActionSheetModal
        isVisible={state.isActionSheetShow}
        style={styles.actionModalStyle}>
        <ActionSheet
          actionSheetItems={state.actionSheetData}
          onCancelPress={() => setState(prev => ({...prev, isActionSheetShow: false}))}
          onPressItem={clickOnActionSheetOption}
        />
      </ActionSheetModal>
      <DatePicker
        modal
        open={state.isDateModalOpen}
        mode="date"
        date={new Date()}
        onConfirm={(date) => {
          const updatedDate = moment(date).format(TAG_DATE_FORMATE);
          setState(prev => ({...prev, isDateModalOpen: false, selectedDateOfBirth: updatedDate}))
        }}
        onCancel={() => setState(prev => ({...prev, isDateModalOpen: false}))}
      />
      <ImageSelection
        modalVisible={state.imageModalVisible}
        setModalVisible={() =>  setState(prev => ({...prev, visible: !prev.imageModalVisible}))}
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />  
    </SafeAreaView>
  );
};

export default AddPet;
