import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import Header from '../../../components/header';
import {useTheme} from '../../../providers/ThemeProvider';
import LinearGradient from '../../../components/linearGradient';
import AllImages from '../../../utils/Constants/AllImages';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Geolocation from 'react-native-geolocation-service';
import {
  getAllCountryList,
  getIdentificationOfAnimal,
  getIssueOfIdentityCard,
  getPetArtList,
  getPetDetails,
  getPetRaceList,
  submitIdentificationOfAnimal,
  submitIssueOfIdentityCard,
  updatePetDetails,
  uploadPetProfilePhoto,
} from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import {scale, verticalScale} from '../../../theme/responsive';
import {Button, TextInput} from 'react-native-paper';
import ActionSheet from '../../../components/actionSheet';
import ActionSheetModal from 'react-native-modal';
import {
  TAG_DATE_FORMATE,
  TAG_TIMEOUT,
  allGenderStaticData,
  yesNoData,
} from '../../../utils/Constants/AllConstance';
import moment from 'moment';
import {TouchableWithoutFeedback} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {ADD_ADDITIONAL_PET_DETAILS_SCREEN} from './AddAdditionalPetDetails';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelection from '../../../components/imageSelection';
import PetHealthFloatingButton from '../../../components/petHealthFloatingButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SEARCH_FILTER_SCREEN } from '../../searchFilters/searchFilter';
import { MY_PET_LIST_SCREEN } from '../myPetList';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

export const EDIT_PET_DETAILS_SCREEN = {
  name: 'EditPetDetails',
};

const EditPetDetails = ({route}: any) => {
  const dispatch = useDispatch();
  const {formId, petId, isEditMode, isViewOnly} = route.params;
  const staticDateOfImplantation = "Select Date of Implantation";
  const staticDateOfTatto = "Select Date of Tattoo";
  const staticDateOfIssue = "Select Date of Issue";
  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    petName: '',
    actionSheetPosition: 0,
    actionSheetData: [],
    isActionSheetShow: false,
    petArtListData: [],
    petRaceListData: [],
    countryList: [],
    imageResponse: null,
    selectedPetArt: 'Please Select Art',
    selectedPetRace: 'Please Select Race',
    selectedGender: 'Please Select Gender',
    selectedCountry: 'Please Select Country',
    postCode: '',
    selectedDateOfBirth: 'Select Date Of Birth',
    imageType: '',
    imageModalVisible: false,
    petObj: {},
    datePickerStatus: false,

    //For Additional Field
    petAge: "",
    petSize: "",
    petWeight: "",
    petColors: "",
    selectedFamilyTree: "Family tree",
    selectedPetMissing: "Missing",
    currentLatitude: 0,
    currentLongitude: 0,
    //For Issue of Identification Of Animal
    alphanumerischerCode: '',
    alphanumerischerCodeError: false,
    implantSite: '',
    implantSiteError: false,
    dateOfImplantation: staticDateOfImplantation,
    dateOfImplantationError: false,
    alphanumericTattooCode: '',
    alphanumericTattooCodeError: false,        
    tattooSpot: '',
    tattooSpotError: false,
    dateOfTattoo: staticDateOfTatto,
    dateOfTattooError: false,
    datePickerPosition: 0,
    //For Issue of Identification of Card
    nameOfAuthorizedVeterinarian: '',
    nameOfAuthorizedVeterinarianError: false,
    address: '',
    addressError: false,
    postalCode: '',
    postalCodeError: false,
    ort: '',
    ortError: false,   
    land: '',
    landError: false,   
    phoneNumber: '',
    phoneNumberError: false,
    emailAddress: '',
    emailAddressError: false,   
    idNumber: '',
    idNumberError: false,
    dateOfIssue: staticDateOfIssue,
    dateOfIssueError: false,
  });

  //Static Data
  const petGenderListData = allGenderStaticData();
  const yesNoOptions = yesNoData();

  useEffect(() => {
    callPetDetails();
    requestLocationPermission();
    callPetArtListFn();
    callAllCountryListFn();
    callPetIdentificationOfAnimalFn();
    callPetIssueOfIdentityCardFn();
  }, []);

  const callPetIdentificationOfAnimalFn = () => {
    dispatch(
      getIdentificationOfAnimal({form_id: formId}, (res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, alphanumerischerCode:  data['data-alphanumerischer'],
            dateOfImplantation: data['data-datum-der'] ? data['data-datum-der'] : staticDateOfImplantation, 
            implantSite: data['data-implantierungsstelle'],
            alphanumericTattooCode: data['data-alphanumerischer-t'], 
            dateOfTattoo: data['data-datum-der-ta'] ? data['data-datum-der-ta'] : staticDateOfTatto,
            tattooSpot: data['data-tätowierungsstelle']}));
        }
      }),
    );
  };

  const callPetIssueOfIdentityCardFn = () => {
    dispatch(
      getIssueOfIdentityCard({form_id: formId}, (res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, 
            nameOfAuthorizedVeterinarian:  data['data-name-des'],
            address: data['data-anschrift'], 
            postalCode: data['data-postleitzahl'],
            ort: data['data-ort'], 
            land: data['data-land'],
            phoneNumber: data['data-telefonnummer'],
            emailAddress: data['data-e-mail-adresse'],
            dateOfIssue: data['data-ausstellungsdatum'] ? data['data-ausstellungsdatum'] : staticDateOfIssue,
            idNumber: data['data-ausweisnummer']
          }));
        }
      }),
    );
  };

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

  const callPetArtListFn = () => {
    setState(prev => ({...prev, loader: true}));

    dispatch(
      getPetArtList((res: any) => {
        if (res) {
          const {data} = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({
            title,
            id,
          }));
          setState(prev => ({
            ...prev,
            loader: false,
            petArtListData: newArrayOfObj,
          }));
        } else {
          setState(prev => ({...prev, loader: false, petArtListData: []}));
        }
      }),
    );
  };

  const callAllCountryListFn = () => {
    dispatch(
      getAllCountryList((res: any) => {
        if (res) {
          const {data} = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({
            title,
            id,
          }));
          setState(prev => ({...prev, countryList: newArrayOfObj}));
        } else {
          setState(prev => ({...prev, countryList: []}));
        }
      }),
    );
  };

  const callPetRaceListFn = (artName: string) => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      petArt: artName,
    };

    dispatch(
      getPetRaceList(body, (res: any) => {
        if (res) {
          const {data} = res;
          const newArrayOfObj = data.map(({name: title, values: id}: any) => ({
            title,
            id,
          }));
          setState(prev => ({
            ...prev,
            loader: false,
            petRaceListData: newArrayOfObj,
          }));
        } else {
          setState(prev => ({...prev, loader: false, petRaceListData: []}));
        }
      }),
    );
  };

  const callPetDetails = () => {
    if (petId && (isEditMode || isViewOnly)) {
      dispatch(
        getPetDetails({petId: petId}, (res: any) => {
          if (res) {
            const {data} = res;
            const imageObj = {
              path: data.pet_image.pet_image_url,
              mime: 'jpg',
              isEditMode: true,
            };
            setState(prev => ({
              ...prev,
              petName: data.pet_name,
              selectedPetArt: data.pet_art,
              selectedCountry: data.pet_country,
              selectedPetRace: data.pet_race,
              selectedGender: data.pet_gender,
              selectedDateOfBirth: data.pet_birth_date,
              postCode: data.pet_zipcode,
              imageResponse: imageObj,
              petObj: data,
              petAge: data.pet_age, petSize: data.pet_size, petWeight: data.pet_weight, 
              petColors: data.pet_color, selectedFamilyTree: data.pet_stammbaum,
              selectedPetMissing: data.pet_vermisst
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
    if (position == 0) {
      setState(prev => ({
        ...prev,
        actionSheetData: state.petArtListData,
        isActionSheetShow: true,
      }));
    } else if (position == 1 && state.selectedPetArt != 'Please Select Art') {
      setState(prev => ({
        ...prev,
        actionSheetData: state.petRaceListData,
        isActionSheetShow: true,
      }));
    } else if (position == 2) {
      setState(prev => ({
        ...prev,
        actionSheetData: petGenderListData,
        isActionSheetShow: true,
      }));
    } else if (position == 3) {
      setState(prev => ({
        ...prev,
        actionSheetData: state.countryList,
        isActionSheetShow: true,
      }));
    } else if (position == 4) {
      setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}));
    } else if(position == 5 || position == 6) {
      //For Pet Family Tree && Pet Missing
      setState(prev => ({
        ...prev,
        actionSheetData: yesNoOptions,
        isActionSheetShow: true,
      }));
    }
  };

  const clickOnActionSheetOption = async (index: number) => {
    const {petArtListData, actionSheetPosition, petRaceListData, countryList} =
      state;
    if (index != petArtListData.length) {
      if (actionSheetPosition == 0) {
        setState(prev => ({
          ...prev,
          selectedPetArt: petArtListData[index].title,
          isActionSheetShow: false,
          selectedPetRace: 'Please Select Race',
        }));
        callPetRaceListFn(petArtListData[index].title);
      } else if (actionSheetPosition == 1) {
        setState(prev => ({
          ...prev,
          selectedPetRace: petRaceListData[index].title,
          isActionSheetShow: false,
        }));
      } else if (actionSheetPosition == 2) {
        setState(prev => ({
          ...prev,
          selectedGender: petGenderListData[index].title,
          isActionSheetShow: false,
        }));
      } else if (actionSheetPosition == 3) {
        setState(prev => ({
          ...prev,
          selectedCountry: countryList[index].title,
          isActionSheetShow: false,
        }));
      } else if (actionSheetPosition == 5) {
        setState(prev => ({
          ...prev,
          selectedFamilyTree: yesNoOptions[index].title,
          isActionSheetShow: false,
        }));
      } else if(actionSheetPosition == 6) {
        setState(prev => ({
          ...prev,
          selectedPetMissing: yesNoOptions[index].title,
          isActionSheetShow: false,
        }));
      }
    }
  };

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        image.isEditMode = false;
        setState(prev => ({
          ...prev,
          imageResponse: image,
          imageModalVisible: !prev.imageModalVisible,
        }));
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
        setState(prev => ({
          ...prev,
          imageResponse: image,
          imageModalVisible: !prev.imageModalVisible,
        }));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const onContinuePress = () => {
    const artDefaultMessage = 'Please Select Art';
    const raceDefaultMessage = 'Please Select Race';
    const genderDefaultMessage = 'Please Select Gender';
    const countryDefaultMessage = 'Please Select Country';
    const dobDefaultMessage = 'Select Date Of Birth';
    const familyTreeDefaultMessage = "Family tree";
    const missingDefaultMessage = "Missing";
    const {
      petName,
      selectedPetArt,
      selectedPetRace,
      selectedGender,
      selectedCountry,
      postCode,
      selectedDateOfBirth,
      imageResponse,
      petObj,
      petAge, petSize, petWeight, petColors, selectedPetMissing, selectedFamilyTree,
    } = state;

    if (
      petName &&
      selectedPetArt != artDefaultMessage &&
      selectedPetRace != raceDefaultMessage &&
      selectedGender != genderDefaultMessage &&
      selectedCountry != countryDefaultMessage &&
      postCode &&
      selectedDateOfBirth != dobDefaultMessage &&
      petAge && petSize && petWeight && petColors && selectedPetMissing!=missingDefaultMessage
      && selectedFamilyTree!=familyTreeDefaultMessage
    ) {
      setState(prev => ({...prev, loader: true}));
      try {
        Promise.all([createNewPet(), uploadPetProfileImage(imageResponse),
          callIdentificationOfAnimalFn(), callIssueOfIdentityCardFn()])
        .then(function()  {
          setState(prev => ({...prev, loader: false}));
          showMessage({ message: "Pet details update successfully", type: 'success'});
          setTimeout(() => {
            navigate(MY_PET_LIST_SCREEN.name);
          }, TAG_TIMEOUT)
      }); 
      } catch (error) {}
    } else {
      if (!petName) {
        showMessage({message: 'Please enter pet name', type: 'danger'});
      } else if (selectedPetArt === artDefaultMessage) {
        showMessage({message: artDefaultMessage, type: 'danger'});
      } else if (selectedPetRace === raceDefaultMessage) {
        showMessage({message: raceDefaultMessage, type: 'danger'});
      } else if (selectedGender === genderDefaultMessage) {
        showMessage({message: genderDefaultMessage, type: 'danger'});
      } else if (selectedCountry === countryDefaultMessage) {
        showMessage({message: countryDefaultMessage, type: 'danger'});
      } else if (!postCode) {
        showMessage({message: 'Please enter post code', type: 'danger'});
      } else if (selectedDateOfBirth === dobDefaultMessage) {
        showMessage({message: dobDefaultMessage, type: 'danger'});
      } else if(!petAge) {
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
      }
    }
  };

  const createNewPet = () => new Promise(function(resolve, reject) {
    const {petName, selectedPetArt, selectedPetRace, selectedGender, selectedCountry,
      postCode, selectedDateOfBirth, petAge, petSize, petWeight, petColors, 
      selectedPetMissing, selectedFamilyTree, petObj} = state;
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
      pet_id: petObj?.id
    } 
   
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
  });

  const uploadPetProfileImage = (imageResponse: any) => new Promise(function(resolve, reject) {
    if(imageResponse && !imageResponse.isEditMode) {
      const formData = new FormData();
      formData.append('pet_profile', {
        name: imageResponse.path.substring(imageResponse.path.lastIndexOf('/') + 1),
        type: imageResponse.mime,
        uri: Platform.OS === 'ios' ? imageResponse.path.replace('file://', '') : 
        imageResponse.path,
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

  const callIdentificationOfAnimalFn = () => new Promise(function(resolve, reject) {
    let body = {
      'data-alphanumerischer': state?.alphanumerischerCode,
      'data-datum-der': state?.dateOfImplantation,
      'data-implantierungsstelle': state?.implantSite,
      'data-alphanumerischer-t': state?.alphanumericTattooCode,
      'data-datum-der-ta': state?.dateOfTattoo,
      'data-tätowierungsstelle': state?.tattooSpot,
      'form_id': formId.toString(),
    };
    dispatch(
      submitIdentificationOfAnimal(body, (res: any) => {
        console.log("Identification Of Animal", res)
        if(res) {
          const { data } = res;
          resolve(data);
        } else {
          reject();
        }
      }),
    );
  });

  const callIssueOfIdentityCardFn = () => new Promise(function(resolve, reject) {
    let body = {
      'data-name-des': state?.nameOfAuthorizedVeterinarian,
      'data-anschrift': state?.address,
      'data-postleitzahl': state?.postalCode,
      'data-ort': state?.ort,
      'data-land': state?.land,
      'data-telefonnummer': state?.phoneNumber,
      'data-e-mail-adresse': state?.emailAddress,
      'data-ausstellungsdatum': state?.dateOfIssue,
      'data-ausweisnummer': state?.idNumber,
      'form_id': formId.toString(),
    };
    dispatch(
      submitIssueOfIdentityCard(body, (res: any) => {
        if(res) {
          const { data } = res;
          resolve(data);
        } else {
          reject();
        }
      }),
    );
  });

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree} />
      <Header 
        statusBarColor={colors.listBackGradientThree} 
        onFilterPress={onFilterPress} />
      <View style={styles.flexZero}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.flexOne, {padding: scale(25)}]}>
            <View style={styles.flexOne}>
              <LinearGradient
                isHorizontal={false}
                childStyle={styles.gradientChildStyle}
                allColorsArray={[
                  darkColors.listBackGradientTwo,
                  darkColors.listBackGradientThree,
                ]}
                childrean={
                  <View
                    style={[
                      styles.flexOne,
                      {alignItems: 'center', paddingTop: verticalScale(10)},
                    ]}>
                    <Text style={styles.digitalPassportLabel}>
                      DIGITALER TIERPASS
                    </Text>
                    <Text style={styles.petPassportLabel}>PET PASSPORT</Text>
                  </View>
                }
              />
              <Image
                style={styles.petProfilePicView}
                source={
                  state.imageResponse
                    ? {uri: state.imageResponse?.path}
                    : AllImages.appPlaceholderIcon
                }
                resizeMode="contain"
              />
              {!isViewOnly &&
                <View style={styles.uploadWrapper}>
                  <TouchableWithoutFeedback
                    onPress={() => !isViewOnly && dropDownPosition(4)}>
                    <Image
                      resizeMode="contain"
                      style={styles.pressableUpload}
                      source={AllImages.uploadIcon}
                    />
                  </TouchableWithoutFeedback>
                </View>
              }
            </View>
            <TextInput
              mode="outlined"
              value={state.petName}
              label={'Name'}
              editable={!isViewOnly}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={name =>
                setState(prev => ({...prev, petName: name}))
              }
              placeholder={'Enter Name'}
            />
            <Pressable onPress={() => !isViewOnly && dropDownPosition(0)}>
              <View
                style={[styles.textInputCustomStyle, {flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text
                    style={[
                      styles.dropdownLabelStyle,
                      state.selectedPetArt != 'Please Select Art' && {
                        color: colors.black,
                      },
                    ]}>
                    {state.selectedPetArt}
                  </Text>
                </View>
                {!isViewOnly &&
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}
                  />
                </View>
                }
              </View>
            </Pressable>
            <Pressable onPress={() => !isViewOnly && dropDownPosition(1)}>
              <View
                style={[styles.textInputCustomStyle, {flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text
                    style={[
                      styles.dropdownLabelStyle,
                      state.selectedPetRace != 'Please Select Race' && {
                        color: colors.black,
                      },
                    ]}>
                    {state.selectedPetRace}
                  </Text>
                </View>
                {!isViewOnly &&
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}
                  />
                </View>
                }
              </View>
            </Pressable>
            <Pressable onPress={() => !isViewOnly && dropDownPosition(2)}>
              <View
                style={[styles.textInputCustomStyle, {flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text
                    style={[
                      styles.dropdownLabelStyle,
                      state.selectedGender != 'Please Select Gender' && {
                        color: colors.black,
                      },
                    ]}>
                    {state.selectedGender}
                  </Text>
                </View>
                {!isViewOnly &&
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}
                  />
                </View>
                }
              </View>
            </Pressable>
            <Pressable onPress={() => !isViewOnly && dropDownPosition(3)}>
              <View
                style={[styles.textInputCustomStyle, {flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text
                    style={[
                      styles.dropdownLabelStyle,
                      state.selectedCountry != 'Please Select Country' && {
                        color: colors.black,
                      },
                    ]}>
                    {state.selectedCountry}
                  </Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}
                    />
                  </View>
                }
              </View>
            </Pressable>
            <TextInput
              mode="outlined"
              value={state.postCode}
              label={'Postcode'}
              maxLength={6}
              editable={!isViewOnly}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={code =>
                setState(prev => ({...prev, postCode: code}))
              }
              placeholder={'Enter Postcode'}
            />
            <Pressable
              onPress={() =>
                !isViewOnly &&
                setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 0}))
              }>
              <View
                style={[styles.textInputCustomStyle, {flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text
                    style={[
                      styles.dropdownLabelStyle,
                      state.selectedDateOfBirth != 'Select Date Of Birth' && {
                        color: colors.black,
                      },
                    ]}>
                    {state.selectedDateOfBirth}
                  </Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <AntIcon
                      name="calendar"
                      size={scale(18)}
                      color={colors.listBackGradientThree}
                    />
                  </View>
                }
              </View>
            </Pressable>
            <TextInput
              mode="outlined"
              value={state.petAge}
              label={"Age"}
              editable={!isViewOnly}
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
              editable={!isViewOnly}
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
              editable={!isViewOnly}
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
              editable={!isViewOnly}
              activeOutlineColor={colors.listBackGradientThree}
              outlineColor={colors.listBackGradientThree}
              style={styles.textInputStyle}
              onChangeText={(color) => setState(prev => ({...prev, petColors: color}))}
              placeholder={"Enter Color"}
            />
            <Pressable
              onPress={() => !isViewOnly && dropDownPosition(5)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedFamilyTree!="Family tree" &&
                    {color: colors.black}]}>{state.selectedFamilyTree}</Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}/>
                  </View>
                }
              </View>
            </Pressable>
            <Pressable
              onPress={() => !isViewOnly && dropDownPosition(6)}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedPetMissing!="Missing" &&
                    {color: colors.black}]}>{state.selectedPetMissing}</Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}/>
                  </View>
                }
              </View>
            </Pressable>
            <TextInput
              value={state.alphanumerischerCode}
              mode="outlined"
              label={'Alphanumerischer Transponder-Code'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  alphanumerischerCode: value,
                  alphanumerischerCodeError: false,
                }));
              }}
              style={[styles.txtInput,{marginTop: 0}]}
              placeholder="Alphanumerischer Transponder-Code"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.alphanumerischerCodeError ? (
              <Text style={styles.error}>Please enter alphanumerischer transponder-code</Text>
            ) : null}

            <Pressable
              onPress={() => !isViewOnly && setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 1}))}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row',
                marginTop: verticalScale(10)}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.dateOfImplantation != staticDateOfImplantation &&
                    {color: darkColors.black}]}>{state.dateOfImplantation}</Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <AntIcon
                      name="calendar"
                      size={scale(18)}
                      color={darkColors.listBackGradientThree}
                    />
                  </View>
                }
              </View>
            </Pressable>
            {state.dateOfImplantationError ? (
              <Text style={styles.error}>Please select implantation date</Text>
            ) : null}

            <TextInput
              value={state.implantSite}
              mode="outlined"
              label={'Implant site'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  implantSite: value,
                  implantSiteError: false,
                }));
              }}
              style={[styles.txtInput,{marginTop: 0}]}
              placeholder="Implant site"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.implantSiteError ? (
              <Text style={styles.error}>Please enter implant site</Text>
            ) : null}

            <TextInput
              value={state.alphanumericTattooCode}
              mode="outlined"
              label={'Alphanumeric tattoo code'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  alphanumericTattooCode: value,
                  alphanumericTattooCodeError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Alphanumeric tattoo code"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.alphanumericTattooCodeError ? (
              <Text style={styles.error}>Please enter alphanumeric tattoo code</Text>
            ) : null}

            <Pressable
              onPress={() => !isViewOnly && setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 2}))}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row',
                marginTop: verticalScale(10)}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.dateOfTattoo != staticDateOfTatto &&
                    {color: darkColors.black}]}>{state.dateOfTattoo}</Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <AntIcon
                      name="calendar"
                      size={scale(18)}
                      color={darkColors.listBackGradientThree}
                    />
                  </View>
                }
              </View>
            </Pressable>
            {state.dateOfTattooError ? (
              <Text style={styles.error}>Please select tatto date</Text>
            ) : null}

            <TextInput
              value={state.tattooSpot}
              mode="outlined"
              label={'Tattoo spot'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  tattooSpot: value,
                  tattooSpotError: false,
                }));
              }}
              style={[styles.txtInput,{marginTop: 0}]}
              placeholder="Tattoo spot"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.tattooSpotError ? (
              <Text style={styles.error}>Please enter tattoo spot</Text>
            ) : null}

            <TextInput
              value={state.nameOfAuthorizedVeterinarian}
              mode="outlined"
              label={'Name of authorized veterinarian'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  nameOfAuthorizedVeterinarian: value,
                  nameOfAuthorizedVeterinarianError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Name of authorized veterinarian"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.nameOfAuthorizedVeterinarianError ? (
              <Text style={styles.error}>Please enter name of authorized veterinarian</Text>
            ) : null}

            <TextInput
              value={state.address}
              mode="outlined"
              label={'Address'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  address: value,
                  addressError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Address"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.addressError ? (
              <Text style={styles.error}>Please enter address</Text>
            ) : null}

            <TextInput
              value={state.postalCode}
              mode="outlined"
              label={'Postal code'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  postalCode: value,
                  postalCodeError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Postal code"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.postalCodeError ? (
              <Text style={styles.error}>Please enter postal code</Text>
            ) : null}

            <TextInput
              value={state.ort}
              mode="outlined"
              label={'Ort'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  ort: value,
                  ortError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Ort"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.ortError ? (
              <Text style={styles.error}>Please enter ort</Text>
            ) : null}

            <TextInput
              value={state.land}
              mode="outlined"
              label={'Land'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  land: value,
                  landError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Land"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.landError ? (
              <Text style={styles.error}>Please enter land</Text>
            ) : null}

            <TextInput
              value={state.phoneNumber}
              mode="outlined"
              label={'Phone number'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              keyboardType="phone-pad"
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  phoneNumber: value,
                  phoneNumberError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Phone number"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.phoneNumberError ? (
              <Text style={styles.error}>Please enter phone number</Text>
            ) : null}

            <TextInput
              value={state.emailAddress}
              mode="outlined"
              label={'Email Address'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  emailAddress: value,
                  emailAddressError: false,
                }));
              }}
              style={styles.txtInput}
              placeholder="Email Address"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.emailAddressError ? (
              <Text style={styles.error}>Please enter email address</Text>
            ) : null}

            <Pressable
              onPress={() => !isViewOnly && setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 3}))}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row',
                marginTop: verticalScale(10), marginBottom: 0}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.dateOfIssue != staticDateOfIssue &&
                    {color: darkColors.black}]}>{state.dateOfIssue}</Text>
                </View>
                {!isViewOnly &&
                  <View style={styles.flexZero}>
                    <AntIcon
                      name="calendar"
                      size={scale(18)}
                      color={darkColors.listBackGradientThree}
                    />
                  </View>
                }
              </View>
            </Pressable>
            {state.dateOfIssueError ? (
              <Text style={styles.error}>Please select date of issue</Text>
            ) : null}

            <TextInput
              value={state.idNumber}
              mode="outlined"
              label={'ID number'}
              editable={!isViewOnly}
              activeOutlineColor={darkColors.listBackGradientThree}
              outlineColor={darkColors.listBackGradientThree}
              onChangeText={value => {
                setState(prev => ({
                  ...prev,
                  idNumber: value,
                  idNumberError: false,
                }));
              }}
              style={[styles.txtInput, isViewOnly && {marginBottom: verticalScale(50)}]}
              placeholder="ID number"
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.idNumberError ? (
              <Text style={styles.error}>Please enter ID number</Text>
            ) : null}
  
            {!isViewOnly && (
              <Button
                labelStyle={styles.loginFontStyle}
                style={[
                  styles.allButonStyle,
                  {marginBottom: verticalScale(50)},
                ]}
                mode="contained"
                onPress={onContinuePress}>
                Submit
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
      <ActionSheetModal
        isVisible={state.isActionSheetShow}
        style={styles.actionModalStyle}>
        <ActionSheet
          actionSheetItems={state.actionSheetData}
          onCancelPress={() =>
            setState(prev => ({...prev, isActionSheetShow: false}))
          }
          onPressItem={clickOnActionSheetOption}
        />
      </ActionSheetModal>
      <DateTimePicker
        mode="date"
        isVisible={state.datePickerStatus}
        date={new Date()}
        onConfirm={date => {
          const updatedDate = moment(date).format(TAG_DATE_FORMATE);
          if(state.datePickerPosition == 0) {
            setState(prev => ({
              ...prev,
              selectedDateOfBirth: updatedDate,
              datePickerStatus: false,
            }));
          } else if(state.datePickerPosition == 1) {
            setState(prev => ({
              ...prev, 
              dateOfImplantation: updatedDate, 
              datePickerStatus: false, 
              dateOfImplantationError: false
            }));
          } else if (state.datePickerPosition == 2) {
            setState(prev => ({...prev, 
              dateOfTattoo: updatedDate, 
              datePickerStatus: false, 
              dateOfTattooError: false}));
          } else if (state.datePickerPosition == 3) {
            setState(prev => ({...prev, 
              dateOfIssue: updatedDate, 
              datePickerStatus: false, 
              dateOfIssueError: false}));
          }
        }}
        onCancel={() => setState(prev => ({...prev, datePickerStatus: false}))}
      />
      <ImageSelection
        modalVisible={state.imageModalVisible}
        setModalVisible={() =>
          setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}))
        }
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />
      <PetHealthFloatingButton
        petObj={state.petObj}
        isPetHealthViewShow={isEditMode || isViewOnly ? true : false}
      />
    </SafeAreaView>
  );
};

export default EditPetDetails;
