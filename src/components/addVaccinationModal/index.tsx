import React, {useState} from 'react';
import styles from './styles';
import {Image, Pressable, Text, View} from 'react-native';
import {darkColors} from '../../theme/colors';
import { AddVaccinationModalTypePropsInterface } from './types';
import LinearGradient from '../linearGradient';
import moment from 'moment';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';
import { TAG_DATE_FORMATE } from '../../utils/Constants/AllConstance';
import CustomDateRangeModal from '../customDateRangeModal';
import ImageSelection from '../imageSelection';
import ImagePicker from 'react-native-image-crop-picker';

const AddVaccination = ({isModalVisible, dateRange, onClose, onDelete}: AddVaccinationModalTypePropsInterface) => {
  
  const [state, setState] = useState({
    loader: false,
    petVaccineListData: [],
    manufactureImageResponse: null,
    authorisedImageResponse: null,
    dateRange: { startDate: undefined, endDate: undefined},
    datePickerOpenStatus: false,
    imageOptionPosition: 0,
    imageModalVisible: false,
    imageType: '',
  });

  const onDateSelected = (dateRange: any) => {
    setState(prev => ({...prev, datePickerOpenStatus: false, dateRange: 
      { startDate: dateRange.firstDate, endDate: dateRange.secondDate }}));
  }

  const onDateIconPress = (status: boolean) => {
    setState(prev => ({...prev, datePickerOpenStatus: status})); 
  }
  
  const onVaccineImageSelect = (position: number) => {
    setState(prev => ({...prev, imageModalVisible: true, imageOptionPosition: position}));
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

  return (
    <>
     
        <View style={styles.modalParentView}>
        <View style={{flex: 0}}>
          <LinearGradient
            isHorizontal={false}
            childStyle={styles.linearGradientCustomStyle}
            childrean={
              <View style={styles.dateSelectView}>
                <View style={styles.flexOne}>
                  <Text style={[styles.petListItemTextValueStyle]}>{moment(state.dateRange.startDate)
                  .format(TAG_DATE_FORMATE) +' to '+ moment(state.dateRange.endDate).format(TAG_DATE_FORMATE)}</Text>
                </View>
                <Pressable
                  onPress={() => onDateIconPress(true)}>
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
              childStyle={[styles.linearGradientCustomStyle, state.manufactureImageResponse &&
                { paddingLeft: 0, paddingRight: 0}]}
              childrean={
                <Pressable
                  onPress={() => onVaccineImageSelect(1)}>
                  {state.manufactureImageResponse ?
                    <View style={[styles.petPassportOptionView,{ marginTop: 0, marginBottom: 0}]}>
                      <Image
                        style={styles.vaccinationImageStyle}
                        source={{uri: state.manufactureImageResponse.uri}}/>
                    </View>
                    :  
                    <View style={styles.petPassportOptionView}>
                      <Icon
                        name="camera"
                        size={30}
                        color={darkColors.petPassportIconColor}
                      />
                      <Text style={[styles.petListItemTextValueStyle,{marginTop: 10}]}>Manufacturer Name of Vaccine</Text>
                    </View>
                  }
                </Pressable>
              }
            />
            <LinearGradient
              isHorizontal={false}
              childStyle={[styles.linearGradientCustomStyle, state.authorisedImageResponse &&
                { paddingLeft: 0, paddingRight: 0}]}
              childrean={
                <Pressable
                  onPress={() => onVaccineImageSelect(2)}>
                  {state.authorisedImageResponse ?
                    <View style={[styles.petPassportOptionView,{ marginTop: 0, marginBottom: 0}]}>
                      <Image
                        style={styles.vaccinationImageStyle}
                        source={{uri: state.authorisedImageResponse.uri}}/>
                    </View>
                    :  
                    <View style={styles.petPassportOptionView}>
                      <Icon
                        name="camera"
                        size={30}
                        color={darkColors.petPassportIconColor}
                      />
                      <Text style={[styles.petListItemTextValueStyle,{marginTop: 10}]}>Authorised Veterian</Text>
                    </View>
                  }
                </Pressable>
              }
            />
          </View>
          <Pressable onPress={() => console.log("Call 11")} style={styles.submitButonBackStyle}>
            <Text style={styles.submitBtnStyle}>Add</Text>
          </Pressable>
        </View>
        </View>
      <CustomDateRangeModal
        isModalVisible={state.datePickerOpenStatus}
        onClose={() => onDateIconPress(false)}
        onSubmit={(range) => onDateSelected(range)} />
      <ImageSelection
        modalVisible={state.imageModalVisible}
        setModalVisible={() =>  setState(prev => ({...prev, imageModalVisible: !prev.imageModalVisible}))}
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />    
     </>
  );
};

export default AddVaccination;
