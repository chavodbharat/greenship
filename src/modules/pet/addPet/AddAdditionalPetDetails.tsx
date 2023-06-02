import React, { useEffect, useState } from 'react';
import {FlatList, Image, Platform, Pressable, ScrollView, Text, TouchableWithoutFeedback, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Spinner from '../../../components/spinner';
import Header from '../../../components/header';
import { scale, verticalScale } from '../../../theme/responsive';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { useTheme } from '../../../providers/ThemeProvider';
import AllImages from '../../../utils/Constants/AllImages';
import { TAG_TIMEOUT, yesNoData } from '../../../utils/Constants/AllConstance';
import ActionSheetModal from 'react-native-modal';
import ActionSheet from '../../../components/actionSheet';
import { showMessage } from 'react-native-flash-message';
import { MY_PET_LIST_SCREEN } from '../myPetList';
import { navigate } from '../../../routing/navigationRef';
import { createPet, updatePetDetails, uploadPetProfilePhoto } from '../../../redux/actions/petAction';
import ImageSelection from '../../../components/imageSelection';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from '../../../components/linearGradient';
import { SEARCH_FILTER_SCREEN } from '../../searchFilters/searchFilter';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { getReverseGeocodingData } from '../../../utils/Utility';

export const ADD_ADDITIONAL_PET_DETAILS_SCREEN = {
  name: 'AddAdditionalPetDetails',
};

const AddAdditionalPetDetails = ({route}: any) => {
  const dispatch = useDispatch();
  const { petProfilePicRes, petName, selectedPetArt, selectedPetRace, selectedGender, 
    selectedDateOfBirth, formId, postCode, selectedCountry, isEdit, petObj} = route.params;
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    allMultipleImageLocalArray: [],
    petAge: "",
    petSize: "",
    petWeight: "",
    petColors: "",
    selectedFamilyTree: "Family tree",
    selectedPetMissing: "Missing",
    isTermsConditionsCheck: false,
    imageResponse: null,
    actionSheetPosition: 0,
    isActionSheetShow: false,
    actionSheetData: [],
    imageModalVisible: false,
    imageType: '',
    currentLatitude: 0,
    currentLongitude: 0
  });

  //Static Data
  const yesNoOptions = yesNoData();

  useEffect(() => {
    setPetDetails();
    requestLocationPermission();
  }, []);

   //Location
   const requestLocationPermission = async () => {
    const granted = await getLocationPermissions();

    if (granted) {
      setState(prev => ({...prev, loading: true}));
      getCurrentPosition();
    }
  };

  const getLocationPermissions = async () => {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'GreenSheep Earth',
        message:
          'GreenSheep Earth would like access to your location to while adding pet',
      },
    );

    return granted === RESULTS.GRANTED;
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const crd = position.coords;
        setPosition(crd.latitude, crd.longitude);
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const setPosition = (lat: any, long: any) => {
    setState(prev => ({...prev, currentLatitude: lat, currentLongitude: long}));
  };

  const setPetDetails = () => {
    if(isEdit && Object.keys(petObj).length > 0){
      setState(prev => ({...prev, petAge: petObj.pet_age, petSize: petObj.pet_size, 
        petWeight: petObj.pet_weight, petColors: petObj.pet_color, selectedFamilyTree: petObj.pet_stammbaum,
        selectedPetMissing: petObj.pet_vermisst
      }));
    }
  };

  const dropDownPosition = (position: number) => {
    setState(prev => ({...prev, actionSheetPosition: position, isActionSheetShow: true, actionSheetData: yesNoOptions}));
  }

  const onPublishPress = () => {
    const familyTreeDefaultMessage = "Family tree";
    const missingDefaultMessage = "Missing";
    const {petAge, petSize, petWeight, petColors, selectedPetMissing, selectedFamilyTree,
      isTermsConditionsCheck} = state;
    if(petAge && petSize && petWeight && petColors && selectedPetMissing!=missingDefaultMessage
      && selectedFamilyTree!=familyTreeDefaultMessage && isTermsConditionsCheck){ 
      setState(prev => ({...prev, loader: true}));
      if(isEdit){
        try {
          Promise.all([createNewPet(), uploadPetProfileImage()])
          .then(function()  {
            setState(prev => ({...prev, loader: false}));
            showMessage({ message: "Pet details update successfully", type: 'success'});
            setTimeout(() => {
              navigate(MY_PET_LIST_SCREEN.name);
            }, TAG_TIMEOUT)
        }); 
        } catch (error) {}
      } else {
        try {
          Promise.all([createNewPet(), uploadPetProfileImage(), uploadPetProfileMultipleImages])
          .then(function()  {
            setState(prev => ({...prev, loader: false}));
            showMessage({ message: "New pet created successfully", type: 'success'});
            setTimeout(() => {
              navigate(MY_PET_LIST_SCREEN.name);
            }, TAG_TIMEOUT)
        }); 
        } catch (error) {
          setState(prev => ({...prev, loader: false}));
          console.log("Errror ", error)
        }
      }
    } else {
      if(!petAge) {
        showMessage({ message: "Please enter pet age", type: 'danger'});
      } else if(!petSize) {
        showMessage({ message: "Please enter pet size", type: 'danger'});
      } else if(!petWeight) {
        showMessage({ message: "Please enter pet weight", type: 'danger'});
      } else if(!petColors) {
        showMessage({ message: "Please enter pet colors with comma separate", type: 'danger'});
      } else if(selectedPetMissing === missingDefaultMessage) {
        showMessage({ message: "Please select pet missing", type: 'danger'});
      } else if(selectedFamilyTree === familyTreeDefaultMessage) {
        showMessage({ message: "Please select pet family tree", type: 'danger'});
      } else if(!isTermsConditionsCheck) {
        showMessage({ message: "Please check terms and condition", type: 'danger'});
      }
    }
  }

  const createNewPet = () => new Promise(function(resolve, reject) {
    const {petAge, petSize, petWeight, petColors, selectedPetMissing, selectedFamilyTree} = state;
    const body = {
      pet_name: petName,
      pet_art: selectedPetArt,
      pet_race: selectedPetRace,
      pet_gender: selectedGender,
      pet_country: selectedCountry,
      pet_zipcode: postCode,
      pet_birth_date: selectedDateOfBirth,
      pet_age: petAge,
      pet_size: petSize,
      pet_weight: petWeight,
      pet_color: petColors,
      pet_stammbaum: selectedFamilyTree,
      pet_vermisst: selectedPetMissing,
      form_id: formId.toString(),
      latitude: state.currentLatitude,
      longitude: state.currentLongitude,
    } 
    if(isEdit){
      body.pet_id = petObj.id;
    }
    console.log("Pet=====================================>", body);
    if(isEdit) {
      dispatch(
        updatePetDetails(body, (res: any) => {
          if(res) {
            const { data } = res;
            resolve(data);
          } else {
            reject();
          }
        }),
      );
    } else {
      dispatch(
        createPet(body, (res: any) => {
          if(res) {
            const { data } = res;
            resolve(data);
          } else {
            reject();
          }
        }),
      );
    }
  });

  const uploadPetProfileImage = () => new Promise(function(resolve, reject) {
    if(petProfilePicRes && !petProfilePicRes.isEditMode) {
      const formData = new FormData();
      formData.append('pet_profile', {
        name: petProfilePicRes.path.substring(petProfilePicRes.path.lastIndexOf('/') + 1),
        type: petProfilePicRes.mime,
        uri: Platform.OS === 'ios' ? petProfilePicRes.path.replace('file://', '') : 
          petProfilePicRes.path,
      });
      formData.append('form_id',  formId.toString());
      let body = {
        data: formData,
      };
      dispatch(
        uploadPetProfilePhoto(body, (res: any) => {
          if(res) {
            const { data } = res;
            resolve(data);
          } else {
            reject();
          }
        }),
      );
    } else {
      resolve({});
    }
  });

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
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
      }).then((image: any) => {
        let data = state.allMultipleImageLocalArray;
        data.push(image);
        setState(prev => ({...prev, allMultipleImageLocalArray: data, imageModalVisible: !prev.imageModalVisible}));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const uploadPetProfileMultipleImages = () => new Promise(function(resolve, reject) {
    if(state.allMultipleImageLocalArray) {
      const formData = new FormData();
      state.allMultipleImageLocalArray.forEach((images: any, index: number) => {
        formData.append('pet_profile[]', {
          name: images.path.substring(images.path.lastIndexOf('/') + 1),
          type: images.mime,
          uri: Platform.OS === 'ios' ? images.path.replace('file://', '') : images.path,
        });
      });
      formData.append('form_id',  formId.toString());
      let body = {
        data: formData,
      };
      dispatch(
        uploadPetProfilePhoto(body, (res: any) => {
          if(res) {
            const { data } = res;
            resolve(data);
          } else {
            reject();
          }
        }),
      );
    }
  });

  const selectProfileImage = async () => {
    setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}));
  }

  const clickOnActionSheetOption = async (index: number) => {
    const {actionSheetPosition} = state;
    if(actionSheetPosition == 0) {
      setState(prev => ({...prev,  selectedPetMissing: yesNoOptions[index].title, isActionSheetShow: false}));
    } else if(actionSheetPosition == 1) {
      setState(prev => ({...prev,  selectedFamilyTree: yesNoOptions[index].title, isActionSheetShow: false}));
    }
  }

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree}/>
      <Header
        statusBarColor={colors.listBackGradientThree}
        onFilterPress={onFilterPress}/>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.flexOne, {padding: scale(25)}]}>
            {/* {petProfilePicRes ?
              <Image 
                style={[styles.petImageStyle,{ marginBottom: verticalScale(15), marginTop: 0 }]} 
                source={{uri: petProfilePicRes.path}} />
                :
                <></>
            } */}
            {petProfilePicRes &&
              <View style={styles.flexOne}>
                <LinearGradient
                  isHorizontal={false}
                  childStyle={styles.gradientChildStyle}
                  allColorsArray={[colors.listBackGradientTwo, colors.listBackGradientThree]}
                  childrean={
                    <View style={[styles.flexOne,{alignItems: 'center', paddingTop: verticalScale(10)}]}>
                      <Text style={styles.digitalPassportLabel}>DIGITALER TIERPASS</Text>
                      <Text style={styles.petPassportLabel}>PET PASSPORT</Text>
                    </View>
                  }
                />
                <Image
                  style={styles.petProfilePicView}
                  source={{uri: petProfilePicRes.path}}
                  resizeMode="contain"/>
              </View>
            }
            <TextInput
              mode="outlined"
              value={state.petAge}
              label={"Age"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              placeholder={"Enter Age"}
              onChangeText={(age) => setState(prev => ({...prev, petAge: age}))}
            />
            <TextInput
              mode="outlined"
              value={state.petSize}
              label={"Size (cm)"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              keyboardType={'number-pad'}
              placeholder={"Enter Size"}
              onChangeText={(size) => setState(prev => ({...prev, petSize: size}))}
            />
            <TextInput
              mode="outlined"
              value={state.petWeight}
              label={"Weight (kg)"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              keyboardType={'number-pad'}
              placeholder={"Enter Weight"}
              onChangeText={(weight) => setState(prev => ({...prev, petWeight: weight}))}
            />
            <TextInput
              mode="outlined"
              value={state.petColors}
              label={"Color (separate by comma)"}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={(color) => setState(prev => ({...prev, petColors: color}))}
              placeholder={"Enter Color"}
            />
            <Pressable
              onPress={() => dropDownPosition(1)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedFamilyTree!="Family tree" &&
                    {color: colors.black}]}>{state.selectedFamilyTree}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            <Pressable
              onPress={() => dropDownPosition(0)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedPetMissing!="Missing" &&
                    {color: colors.black}]}>{state.selectedPetMissing}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            {/* <FlatList
              data={state.allMultipleImageLocalArray}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={() => {
                return (
                  <Pressable
                    onPress={selectProfileImage}>
                    <View style={styles.addPetView}>
                      <Image
                        style={[styles.petImageStyle, {borderWidth: 0}, !state.imageResponse && 
                          {tintColor: colors.listBackGradientThree}]}
                        source={(state.imageResponse && state.imageResponse.assets) ? {uri: state.imageResponse?.assets[0].uri} : AllImages.addIcon}/>
                      <Text style={styles.petNameTextStyle}>Add Pictures</Text>
                    </View>
                  </Pressable>
                )
              }}
              renderItem={({item, index}: any) => {
                return (
                  <View style={[styles.addPetView, {marginRight: scale(10)}]}>
                    <Image
                      style={[styles.petImageStyle, {borderWidth: 0}]}
                      source={{uri: item.uri}}/>
                  </View>
                )
              }}
            /> */}
            <View style={styles.checkBoxParentViewBack}>
              <Checkbox
                status={ state.isTermsConditionsCheck ? 'checked' : 'unchecked'}
                color={colors.listBackGradientThree}
                uncheckedColor={colors.listBackGradientThree}
                onPress={() => setState(prev => ({...prev, isTermsConditionsCheck: !state.isTermsConditionsCheck}))}
              />
              <Text style={styles.petNameTextStyle}>{"Yes, I agree to the terms of use of Greensheep"}</Text>
            </View>
            <Button
              labelStyle={styles.loginFontStyle} 
              style={[styles.allButonStyle,{marginBottom: verticalScale(50)}]} mode="contained" 
              onPress={onPublishPress}>
              Publish
            </Button>
          </View>
        </ScrollView>
        <ActionSheetModal
          isVisible={state.isActionSheetShow}
          style={styles.actionModalStyle}>
          <ActionSheet
            actionSheetItems={state.actionSheetData}
            onCancelPress={() => setState(prev => ({...prev, isActionSheetShow: false}))}
            onPressItem={clickOnActionSheetOption}
          />
        </ActionSheetModal>
        <ImageSelection
          modalVisible={state.imageModalVisible}
          setModalVisible={() =>  setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}))}
          onPressCamera={openCamera}
          onPressGallery={openGallery}
        /> 
    </SafeAreaView>
  );
};

export default AddAdditionalPetDetails;
