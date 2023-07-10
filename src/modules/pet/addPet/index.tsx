import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../../routing/navigationRef';
import { darkColors } from '../../../theme/colors';
import { useDispatch } from 'react-redux';
import Header from '../../../components/header';
import { useTheme } from '../../../providers/ThemeProvider';
import LinearGradientView from '../../../components/linearGradient';
import AllImages from '../../../utils/Constants/AllImages';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  getAllCountryList,
  getPetArtList,
  getPetDetails,
  getPetRaceList,
} from '../../../redux/actions/petAction';
import Spinner from '../../../components/spinner';
import { scale, verticalScale } from '../../../theme/responsive';
import { Button, TextInput } from 'react-native-paper';
import ActionSheet from '../../../components/actionSheet';
import ActionSheetModal from 'react-native-modal';
import {
  TAG_DATE_FORMATE,
  allGenderStaticData,
} from '../../../utils/Constants/AllConstance';
import moment from 'moment';
import { TouchableWithoutFeedback } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { ADD_ADDITIONAL_PET_DETAILS_SCREEN } from './AddAdditionalPetDetails';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelection from '../../../components/imageSelection';
import PetHealthFloatingButton from '../../../components/petHealthFloatingButton';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { SEARCH_FILTER_SCREEN } from '../../searchFilters/searchFilter';

export const ADD_PET_SCREEN = {
  name: 'AddPet',
};

const AddPet = ({ route }: any) => {
  const dispatch = useDispatch();
  const { formId, petId, isEditMode, isViewOnly } = route.params;
  const { colors } = useTheme();
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
  });

  //Static Data
  const petGenderListData = allGenderStaticData();

  useEffect(() => {
    callPetDetails();
    callPetArtListFn();
    callAllCountryListFn();
  }, []);

  const callPetArtListFn = () => {
    setState(prev => ({ ...prev, loader: true }));

    dispatch(
      getPetArtList((res: any) => {
        if (res) {
          const { data } = res;
          const newArrayOfObj = data.map(({ name: title, values: id }: any) => ({
            title,
            id,
          }));
          setState(prev => ({
            ...prev,
            loader: false,
            petArtListData: newArrayOfObj,
          }));
        } else {
          setState(prev => ({ ...prev, loader: false, petArtListData: [] }));
        }
      }),
    );
  };

  const callAllCountryListFn = () => {
    dispatch(
      getAllCountryList((res: any) => {
        if (res) {
          const { data } = res;
          const newArrayOfObj = data.map(({ name: title, values: id }: any) => ({
            title,
            id,
          }));
          setState(prev => ({ ...prev, countryList: newArrayOfObj }));
        } else {
          setState(prev => ({ ...prev, countryList: [] }));
        }
      }),
    );
  };

  const callPetRaceListFn = (artName: string) => {
    setState(prev => ({ ...prev, loader: true }));
    const body = {
      petArt: artName,
    };

    dispatch(
      getPetRaceList(body, (res: any) => {
        if (res) {
          const { data } = res;
          const newArrayOfObj = data.map(({ name: title, values: id }: any) => ({
            title,
            id,
          }));
          setState(prev => ({
            ...prev,
            loader: false,
            petRaceListData: newArrayOfObj,
          }));
        } else {
          setState(prev => ({ ...prev, loader: false, petRaceListData: [] }));
        }
      }),
    );
  };

  const callPetDetails = () => {
    if (petId && (isEditMode || isViewOnly)) {
      dispatch(
        getPetDetails({ petId: petId }, (res: any) => {
          if (res) {
            const { data } = res;
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
    setState(prev => ({ ...prev, actionSheetPosition: position }));
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
      setState(prev => ({ ...prev, imageModalVisible: !prev.imageModalVisible }));
    }
  };

  const clickOnActionSheetOption = async (index: number) => {
    const { petArtListData, actionSheetPosition, petRaceListData, countryList } =
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
    } = state;

    if (
      petName &&
      selectedPetArt != artDefaultMessage &&
      selectedPetRace != raceDefaultMessage &&
      selectedGender != genderDefaultMessage &&
      selectedCountry != countryDefaultMessage &&
      postCode &&
      selectedDateOfBirth != dobDefaultMessage
    ) {
      navigate(ADD_ADDITIONAL_PET_DETAILS_SCREEN.name, {
        petName,
        selectedPetArt,
        selectedPetRace,
        selectedGender,
        selectedDateOfBirth,
        formId,
        postCode,
        petProfilePicRes: imageResponse ? imageResponse : '',
        selectedCountry,
        isEdit: isEditMode,
        petObj,
      });
    } else {
      if (!petName) {
        showMessage({ message: 'Please enter pet name', type: 'danger' });
      } else if (selectedPetArt === artDefaultMessage) {
        showMessage({ message: artDefaultMessage, type: 'danger' });
      } else if (selectedPetRace === raceDefaultMessage) {
        showMessage({ message: raceDefaultMessage, type: 'danger' });
      } else if (selectedGender === genderDefaultMessage) {
        showMessage({ message: genderDefaultMessage, type: 'danger' });
      } else if (selectedCountry === countryDefaultMessage) {
        showMessage({ message: countryDefaultMessage, type: 'danger' });
      } else if (!postCode) {
        showMessage({ message: 'Please enter post code', type: 'danger' });
      } else if (selectedDateOfBirth === dobDefaultMessage) {
        showMessage({ message: dobDefaultMessage, type: 'danger' });
      }
    }
  };

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, { isPetTabShow: true });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.listBackGradientThree }}>
      <SafeAreaView style={[styles.safeAreaStyle, { backgroundColor: "transparent", }]}>
        <Spinner visible={state?.loader} color={colors.listBackGradientThree} />
        <Header
          statusBarColor={colors.listBackGradientThree}
          onFilterPress={onFilterPress} />
        <View style={[styles.flexZero, { backgroundColor: colors.defaultViewBackgroundColor }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.defaultViewBackgroundColor }}>
            <View style={[styles.flexOne, { padding: scale(25) }]}>
              <View style={styles.flexOne}>
                <LinearGradientView
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
                        { alignItems: 'center', paddingTop: verticalScale(10) },
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
                      ? { uri: state.imageResponse?.path }
                      : AllImages.appPlaceholderIcon
                  }
                  resizeMode="contain"
                />

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
                  setState(prev => ({ ...prev, petName: name }))
                }
                placeholder={'Enter Name'}
              />
              <Pressable onPress={() => !isViewOnly && dropDownPosition(0)}>
                <TextInput
                  mode="outlined"
                  value={state.selectedPetArt}
                  label={state.selectedPetArt != "Please Select Art" ? 'Art' : ''}
                  editable={false}
                  activeOutlineColor={colors.listBackGradientThree}
                  outlineColor={colors.listBackGradientThree}
                  style={styles.textInputStyle}
                  right={ !isViewOnly && <TextInput.Icon icon={() => (
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}
                    />
                    )}/>}
                  placeholder={'Please Select Art'}
                />
              </Pressable>
              <Pressable onPress={() => !isViewOnly && dropDownPosition(1)}>
                <TextInput
                  mode="outlined"
                  value={state.selectedPetRace}
                  label={state.selectedPetRace != "Please Select Race" ? 'Race' : ''}
                  editable={false}
                  activeOutlineColor={colors.listBackGradientThree}
                  outlineColor={colors.listBackGradientThree}
                  style={styles.textInputStyle}
                  right={ !isViewOnly && <TextInput.Icon icon={() => (
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}
                    />
                    )}/>}
                  placeholder={'Please Select Race'}
                />
              </Pressable>
              <Pressable onPress={() => !isViewOnly && dropDownPosition(2)}>
                <TextInput
                  mode="outlined"
                  value={state.selectedGender}
                  label={state.selectedGender != "Please Select Gender" ? 'Gender' : ''}
                  editable={false}
                  activeOutlineColor={colors.listBackGradientThree}
                  outlineColor={colors.listBackGradientThree}
                  style={styles.textInputStyle}
                  right={ !isViewOnly && <TextInput.Icon icon={() => (
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}
                    />
                    )}/>}
                  placeholder={'Please Select Gender'}
                />
              </Pressable>
              <Pressable onPress={() => !isViewOnly && dropDownPosition(3)}>
                <TextInput
                  mode="outlined"
                  value={state.selectedCountry}
                  label={state.selectedCountry != "Please Select Country" ? 'Country' : ''}
                  editable={false}
                  activeOutlineColor={colors.listBackGradientThree}
                  outlineColor={colors.listBackGradientThree}
                  style={styles.textInputStyle}
                  right={ !isViewOnly && <TextInput.Icon icon={() => (
                    <Image
                      style={styles.dropDownIconStyle}
                      source={AllImages.dropdownIcon}
                    />
                    )}/>}
                  placeholder={'Please Select Country'}
                />
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
                  setState(prev => ({ ...prev, postCode: code }))
                }
                placeholder={'Enter Postcode'}
              />
              <Pressable    
                onPress={() =>
                  !isViewOnly && setState(prev => ({...prev, datePickerStatus: true})) }>
                <TextInput
                  mode="outlined"
                  value={state.selectedDateOfBirth}
                  label={state.selectedDateOfBirth != "Select Date Of Birth" ? 'Date Of Birth' : ''}
                  editable={false}
                  activeOutlineColor={colors.listBackGradientThree}
                  outlineColor={colors.listBackGradientThree}
                  style={styles.textInputStyle}
                  right={ !isViewOnly && <TextInput.Icon icon={() => (
                    <AntIcon
                      name="calendar"
                      size={scale(18)}
                      color={colors.listBackGradientThree}
                    />
                    )}/>}
                  placeholder={'Select Date Of Birth'}
                />
              </Pressable>
              {!isViewOnly && (
                <Button
                  labelStyle={styles.loginFontStyle}
                  style={[
                    styles.allButonStyle,
                    { marginBottom: verticalScale(50) },
                  ]}
                  mode="contained"
                  onPress={onContinuePress}>
                  Continue
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
              setState(prev => ({ ...prev, isActionSheetShow: false }))
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
            setState(prev => ({
              ...prev,
              selectedDateOfBirth: updatedDate,
              datePickerStatus: false,
            }));
          }}
          onCancel={() => setState(prev => ({ ...prev, datePickerStatus: false }))}
        />
        <ImageSelection
          modalVisible={state.imageModalVisible}
          setModalVisible={() =>
            setState(prev => ({ ...prev, imageModalVisible: !prev.imageModalVisible }))
          }
          onPressCamera={openCamera}
          onPressGallery={openGallery}
        />
        <PetHealthFloatingButton
          petObj={state.petObj}
          isPetHealthViewShow={isEditMode || isViewOnly ? true : false}
        />
      </SafeAreaView>
    </View >
  );
};

export default AddPet;
