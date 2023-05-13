import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../../components/header';
import LinearGradient from '../../../../components/linearGradient';
import Spinner from '../../../../components/spinner';
import {scale, verticalScale} from '../../../../theme/responsive';
import {
  addPetVaccine,
  getPetVaccinationList,
} from '../../../../redux/actions/petAction';
import PetPassportSubHeader from '../../../../components/petPassportSubHeader';
import {TAG_DATE_FORMATE} from '../../../../utils/Constants/AllConstance';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {darkColors} from '../../../../theme/colors';
import CustomDateRangeModal from '../../../../components/customDateRangeModal';
import {showMessage} from 'react-native-flash-message';
import {useTheme} from '../../../../providers/ThemeProvider';
import ImageSelection from '../../../../components/imageSelection';
import ImagePicker from 'react-native-image-crop-picker';
import PetHealthFloatingButton from '../../../../components/petHealthFloatingButton';
import {setActiveSubModule} from '../../../../redux/actions/authAction';
import {goBack, navigate} from '../../../../routing/navigationRef';
import {SEARCH_FILTER_SCREEN} from '../../../searchFilters/searchFilter';

export const ADD_PET_VACCINATION_SCREEN = {
  name: 'AddPetVaccination',
};

const AddPetVaccination = ({route}: any) => {
  const dispatch = useDispatch();
  const {vaccineObj, petObj} = route.params;

  const {colors} = useTheme();
  const [state, setState] = useState({
    loader: false,
    petVaccineListData: [],
    manufactureImageResponse: null,
    authorisedImageResponse: null,
    dateRange: {startDate: undefined, endDate: undefined},
    datePickerOpenStatus: false,
    imageOptionPosition: 0,
    imageType: '',
    imageModalVisible: false,
  });

  const onSubmit = () => {
    const {dateRange, manufactureImageResponse, authorisedImageResponse} =
      state;

    if (
      dateRange.startDate &&
      dateRange.endDate &&
      manufactureImageResponse &&
      authorisedImageResponse
    ) {
      setState(prev => ({...prev, loader: true}));
      const body = {
        formId: vaccineObj.form_id,
        vaccineId: '',
        endDate: dateRange.endDate,
        startDate: dateRange.startDate,
        vaccineType: vaccineObj.vaccine_type,
        authorisedImageRes: authorisedImageResponse,
        manufatureImageRes: manufactureImageResponse,
      };
      dispatch(
        addPetVaccine(body, (res: any) => {
          console.log('Res', res);
          if (res.statusCode == 200) {
            showMessage({
              message: 'Vaccine added successfully',
              type: 'success',
            });
            setState(prev => ({
              ...prev,
              loader: false,
              manufactureImageResponse: null,
              authorisedImageResponse: null,
              dateRange: {startDate: undefined, endDate: undefined},
            }));
            goBack();
          } else {
            setState(prev => ({...prev, loader: false}));
            showMessage({message: res.message, type: 'danger'});
          }
        }),
      );
      // try {
      //   const startDate = moment(dateRange.startDate).format(TAG_DATE_FORMATE);
      //   const endDate = moment( dateRange.endDate).format(TAG_DATE_FORMATE);
      //   addVaccine(
      //     token,
      //     vaccineObj.form_id,
      //     "",
      //     startDate,
      //     endDate,
      //     vaccineObj.vaccine_type,
      //     authorisedImageResponse,
      //     manufactureImageResponse,
      //     async (responseData: any) => {
      //       setIsLoading(false);
      //       if(responseData.statusCode == 200){
      //         toast.show(Locales.vaccine_add_success_message, {type: "custom_toast",
      //           animationDuration: 100, duration: TAG_TIMEOUT, data: {borderColor: colors.toastBorderSuccessColor}
      //         });
      //         setManufactureImageResponse(null);
      //         setAuthorisedImageResponse(null);
      //         setDateRange({ startDate: undefined, endDate: undefined});
      //         getRabbiesVaccineList();
      //       } else {
      //         toast.show(responseData.message, {type: "custom_toast",
      //           animationDuration: 100, duration: TAG_TIMEOUT, data: {borderColor: colors.toastBorderErrorColor}
      //         });
      //       }
      //     },
      //     (e: any) => {
      //       setIsLoading(false);
      //       toast.show(Locales.vaccine_add_error_message, {type: "custom_toast",
      //         animationDuration: 100, duration: TAG_TIMEOUT, data: {borderColor: colors.toastBorderErrorColor}
      //       });
      //     },
      //   );
      // } catch (error) {
      //   setIsLoading(false);
      // }
    } else {
      if (!dateRange.startDate || !dateRange.endDate) {
        showMessage({
          message: 'Please select start & end date',
          type: 'danger',
        });
      } else if (!manufactureImageResponse) {
        showMessage({
          message: 'Please select manufacturer vaccine image',
          type: 'danger',
        });
      } else if (!authorisedImageResponse) {
        showMessage({
          message: 'Please select authorised vaccine image',
          type: 'danger',
        });
      }
    }
  };

  const onVaccineImageSelect = (position: number) => {
    setState(prev => ({
      ...prev,
      imageModalVisible: true,
      imageOptionPosition: position,
    }));
  };

  const onDateSelected = (dateRange: any) => {
    setState(prev => ({
      ...prev,
      datePickerOpenStatus: false,
      dateRange: {
        startDate: dateRange.firstDate,
        endDate: dateRange.secondDate,
      },
    }));
  };

  const onDateIconPress = (status: boolean) => {
    setState(prev => ({...prev, datePickerOpenStatus: status}));
  };

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        if (state.imageOptionPosition == 1) {
          setState(prev => ({
            ...prev,
            manufactureImageResponse: image,
            imageModalVisible: !prev.imageModalVisible,
          }));
        } else {
          setState(prev => ({
            ...prev,
            authorisedImageResponse: image,
            imageModalVisible: !prev.imageModalVisible,
          }));
          //   setState(prev => ({...prev, authorisedImageResponse: data.assets[0]}));
        }
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
        if (state.imageOptionPosition == 1) {
          setState(prev => ({
            ...prev,
            manufactureImageResponse: image,
            imageModalVisible: !prev.imageModalVisible,
          }));
        } else {
          setState(prev => ({
            ...prev,
            authorisedImageResponse: image,
            imageModalVisible: !prev.imageModalVisible,
          }));
          //   setState(prev => ({...prev, authorisedImageResponse: data.assets[0]}));
        }
        // setState(prev => ({...prev, imageResponse: image, imageModalVisible: !prev.imageModalVisible}));
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const renderItem = ({item, index}: any) => {
    return <></>;
  };

  const onFilterPress = () => {
    navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
  };

  const renderHeaderItemView = () => {
    return (
      <View>
        <LinearGradient
          isHorizontal={false}
          childStyle={styles.linearGradientCustomStyle}
          childrean={
            <View style={styles.dateSelectView}>
              <View style={styles.flexOne}>
                <Text style={[styles.petListItemTextValueStyle]}>
                  {moment(state.dateRange.startDate).format(TAG_DATE_FORMATE) +
                    ' to ' +
                    moment(state.dateRange.endDate).format(TAG_DATE_FORMATE)}
                </Text>
              </View>
              <Pressable onPress={() => onDateIconPress(true)}>
                <View style={styles.flexZero}>
                  <AntIcon
                    name="calendar"
                    size={25}
                    color={darkColors.petPassportIconColor}
                  />
                </View>
              </Pressable>
            </View>
          }
        />
        <View style={styles.flexDirectionRowView}>
          <LinearGradient
            isHorizontal={false}
            childStyle={[
              styles.linearGradientCustomStyle,
              state.manufactureImageResponse && {
                paddingLeft: 0,
                paddingRight: 0,
              },
            ]}
            childrean={
              <Pressable onPress={() => onVaccineImageSelect(1)}>
                {state.manufactureImageResponse ? (
                  <View
                    style={[
                      styles.petPassportOptionView,
                      {marginTop: 0, marginBottom: 0},
                    ]}>
                    <Image
                      style={styles.vaccinationImageStyle}
                      source={{uri: state.manufactureImageResponse.path}}
                    />
                  </View>
                ) : (
                  <View style={styles.petPassportOptionView}>
                    <Icon
                      name="camera"
                      size={30}
                      color={darkColors.petPassportIconColor}
                    />
                    <Text
                      style={[
                        styles.petListItemTextValueStyle,
                        {marginTop: 10},
                      ]}>
                      Manufacturer Name of Vaccine
                    </Text>
                  </View>
                )}
              </Pressable>
            }
          />
          <LinearGradient
            isHorizontal={false}
            childStyle={[
              styles.linearGradientCustomStyle,
              state.authorisedImageResponse && {
                paddingLeft: 0,
                paddingRight: 0,
              },
            ]}
            childrean={
              <Pressable onPress={() => onVaccineImageSelect(2)}>
                {state.authorisedImageResponse ? (
                  <View
                    style={[
                      styles.petPassportOptionView,
                      {marginTop: 0, marginBottom: 0},
                    ]}>
                    <Image
                      style={styles.vaccinationImageStyle}
                      source={{uri: state.authorisedImageResponse.path}}
                    />
                  </View>
                ) : (
                  <View style={styles.petPassportOptionView}>
                    <Icon
                      name="camera"
                      size={30}
                      color={darkColors.petPassportIconColor}
                    />
                    <Text
                      style={[
                        styles.petListItemTextValueStyle,
                        {marginTop: 10},
                      ]}>
                      Authorised Veterian
                    </Text>
                  </View>
                )}
              </Pressable>
            }
          />
        </View>
        <Pressable onPress={onSubmit} style={styles.submitButonBackStyle}>
          <Text style={styles.submitBtnStyle}>Add</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.flexOne}>
      <Spinner visible={state?.loader} color={colors.listBackGradientThree} />
      <Header
        statusBarColor={colors.listBackGradientThree}
        onFilterPress={onFilterPress}
      />
      <PetPassportSubHeader
        title={vaccineObj.label}
        petImage={
          typeof petObj.pet_image === 'string'
            ? petObj.pet_image
            : petObj.pet_image.pet_image_url
        }
      />
      <View
        style={[
          styles.flexOne,
          {
            marginLeft: scale(5),
            marginRight: scale(5),
            marginTop: verticalScale(3),
          },
        ]}>
        <FlatList
          data={state.petVaccineListData}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeaderItemView}
          renderItem={renderItem}
        />
      </View>
      <CustomDateRangeModal
        isModalVisible={state.datePickerOpenStatus}
        onClose={() => onDateIconPress(false)}
        onSubmit={range => onDateSelected(range)}
      />
      <ImageSelection
        modalVisible={state.imageModalVisible}
        setModalVisible={() =>
          setState(prev => ({
            ...prev,
            imageModalVisible: !prev.imageModalVisible,
          }))
        }
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />
      {/* {state.datePickerOpenStatus &&
      <DateRangePicker
          onSelectDateRange={(range) => {
           console.log("Range ", range);
          }}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          selectedDateContainerStyle={{ height: 35,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "blue",}}
          selectedDateStyle={{ fontWeight: "bold",
          color: "white",}}
        />
      } */}
      {/* <DatePickerModal
        locale="de"
        mode="range"
        editIcon='false'
        visible={state.datePickerOpenStatus}
        onDismiss={onDismiss}
        startDate={state.dateRange.startDate}
        endDate={state.dateRange.endDate}
        onConfirm={onConfirm}
      />  */}
      <PetHealthFloatingButton />
    </SafeAreaView>
  );
};

export default AddPetVaccination;
