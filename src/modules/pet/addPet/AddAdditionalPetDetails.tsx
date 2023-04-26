import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Spinner from '../../../components/spinner';
import Header from '../../../components/header';
import { scale, verticalScale } from '../../../theme/responsive';
import { Button, Checkbox, TextInput } from 'react-native-paper';
import { useTheme } from '../../../providers/ThemeProvider';
import AllImages from '../../../utils/Constants/AllImages';
import { TAG_TIMEOUT, allImageOptionsArray, imageOptionsTitleData, onImageOptionPress, yesNoData } from '../../../utils/Constants/AllConstance';
import ActionSheetModal from 'react-native-modal';
import ActionSheet from '../../../components/actionSheet';
import { showMessage } from 'react-native-flash-message';
import { MY_PET_LIST_SCREEN } from '../myPetList';
import { navigate } from '../../../routing/navigationRef';
import { createPet, uploadPetProfilePhoto } from '../../../redux/actions/petAction';

export const ADD_ADDITIONAL_PET_DETAILS_SCREEN = {
  name: 'AddAdditionalPetDetails',
};

const AddAdditionalPetDetails = ({route}: any) => {
  const dispatch = useDispatch();
  const { petProfilePicRes, petName, selectedPetArt, selectedPetRace, selectedGender, 
    selectedDateOfBirth, formId, postCode, selectedCountry, isEdit, petDetails} = route.params;
  console.log("Form is", formId)
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
    actionSheetData: []
  });

  //Static Data
  const imageOptionsArray = imageOptionsTitleData();
  const yesNoOptions = yesNoData();

  
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
        // try {
        //   Promise.all([editPetDetails(), uploadPetProfileImage(), uploadMultipleImages()])
        //   .then(function()  {
        //     setIsLoading(false);
        //     toast.show(Locales.pet_edit_success_message, {type: "custom_toast", animationDuration: 100, 
        //       duration: TAG_TIMEOUT, data: {borderColor: colors.toastBorderSuccessColor}
        //     });
        //     setTimeout(() => {
        //       navigation.navigate(MY_PET_LIST_SCREEN.name);
        //     }, TAG_TIMEOUT)
        // }); 
        // } catch (error) {}
      } else {
        try {
          Promise.all([createNewPet()])
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
      form_id: formId.toString()
    } 
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
  });

  const uploadPetProfileImage = () => new Promise(function(resolve, reject) {
    if(petProfilePicRes) {
      const body = {
        petProfilePicRes: petProfilePicRes,
        formId: formId.toString()
      } 
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
    setState(prev => ({...prev, actionSheetPosition: 2, isActionSheetShow: true, actionSheetData: imageOptionsArray}));
  }

  const clickOnActionSheetOption = async (index: number) => {
    const {actionSheetPosition} = state;
    if(actionSheetPosition == 0) {
      setState(prev => ({...prev,  selectedPetMissing: yesNoOptions[index].title, isActionSheetShow: false}));
    } else if(actionSheetPosition == 1) {
      setState(prev => ({...prev,  selectedFamilyTree: yesNoOptions[index].title, isActionSheetShow: false}));
    } else if(actionSheetPosition == 2) {
      const originalMessageObj = allImageOptionsArray().find((item: any) => item.type === imageOptionsArray[index].id);
      const data = await onImageOptionPress(originalMessageObj?.type, originalMessageObj?.options);
      if(data.assets && data.assets.length > 0){
        setState(prev => ({...prev,  allMultipleImageLocalArray: prev.allMultipleImageLocalArray.push(data.assets[0]), 
          isActionSheetShow: false}));
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={state.loader} />
      <Header/>
      <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.flexOne, {paddingLeft: scale(25), paddingRight: scale(25),
            paddingBottom: scale(25)}]}>
            {(petProfilePicRes &&  petProfilePicRes.assets) ?
              <Image 
                style={[styles.petImageStyle,{ marginBottom: verticalScale(15), marginTop: 0 }]} 
                source={{uri: petProfilePicRes.assets[0].uri}} />
                :
                <></>
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
              activeOutlineColor={colors.darkGreen}
              outlineColor={colors.darkGreen}
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
            <FlatList
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
            />
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
              style={[styles.allButonStyle,{marginBottom: 50}]} mode="contained" 
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
    </SafeAreaView>
  );
};

export default AddAdditionalPetDetails;
