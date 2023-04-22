import React, { useEffect, useState } from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import Header from '../../../../components/header';
import LinearGradient from '../../../../components/linearGradient';
import Spinner from '../.././../../components/spinner';
import { scale, verticalScale } from '../../../../theme/responsive';
import { MenuOptions } from './types';
import { getPetVaccinationList, getPetVaccineMenuList } from '../../../../redux/actions/petAction';
import PetPassportSubHeader from '../../../../components/petPassportSubHeader';
import { TAG_DATE_FORMATE } from '../../../../utils/Constants/AllConstance';
import Icon from 'react-native-vector-icons/Feather';
import AntIcon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { darkColors } from '../../../../theme/colors';
import CustomDateRangeModal from '../../../../components/customDateRangeModal';

export const PET_VACCINATION_SCREEN = {
  name: 'PetVaccination',
};

const PetVaccination = ({route}: any) => {
  const dispatch = useDispatch();
  const { petObj, vaccineObj } = route.params;
  
  const [state, setState] = useState({
    loader: false,
    petVaccineListData: [],
    manufactureImageResponse: null,
    authorisedImageResponse: null,
    dateRange: { startDate: undefined, endDate: undefined},
    datePickerOpenStatus: false,
    isActionSheetShow: false,
    imageOptionPosition: 0
  });

  
  const [imageOptionPosition, setImageOptionPosition] = useState(0);

  useEffect(() => {
    callPetPassportVaccineListFn();
  }, []);
  
  const callPetPassportVaccineListFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      form_id: vaccineObj.form_id,
      vaccine_type: vaccineObj.vaccine_type
    }
    dispatch(
      getPetVaccinationList(body,(res: any) => {
        if(res) {
          const { data } = res;
          setState(prev => ({...prev, loader: false, petVaccineListData:  data}));
        } else {
          setState(prev => ({...prev, loader: false, petVaccineListData: []}));
        }
      }),
    );
  };

  const onSubmit = () => {

  }

  const onVaccineImageSelect = (position: number) => {
    setState(prev => ({...prev, isActionSheetShow: true, imageOptionPosition: position}));
    setImageOptionPosition(position);
  //  setActionSheetData();
  }

  const onDateSelected = (dateRange: any) => {
    setState(prev => ({...prev, datePickerOpenStatus: false, dateRange: 
      { startDate: dateRange.firstDate, endDate: dateRange.secondDate }}));
  }

  const onDateIconPress = (status: boolean) => {
    setState(prev => ({...prev, datePickerOpenStatus: status})); 
  }

  const renderItem = ({item, index}: any) => {
    return (
      <>
        <LinearGradient
          isHorizontal={false}
          childStyle={[styles.linearGradientCustomStyle, {marginTop: verticalScale(10)}]}
          childrean={
            <View style={[styles.dateSelectView,{marginTop: verticalScale(12), marginBottom: verticalScale(12)}]}>
              <View style={styles.flexOne}>
                <Text style={[styles.petListItemTextValueStyle]}>{item.start_date 
                +' to '+ item.end_date}</Text>
              </View>
            </View>
          }
        />
        <View style={[styles.flexDirectionRowView,{marginBottom: verticalScale(10)}]}>  
          <LinearGradient
            isHorizontal={false}
            childStyle={[styles.linearGradientCustomStyle, { paddingLeft: 0, paddingRight: 0}]}
            childrean={
              <View style={[styles.petPassportOptionView,{ marginTop: 0, marginBottom: 0}]}>
                <Image
                  style={styles.vaccinationImageStyle}
                  source={{uri: item.manufature_images}}/>
              </View>
            }
          />
          <LinearGradient
            isHorizontal={false}
            childStyle={[styles.linearGradientCustomStyle, { paddingLeft: 0, paddingRight: 0}]}
            childrean={ 
              <View style={[styles.petPassportOptionView,{ marginTop: 0, marginBottom: 0}]}>
                <Image
                  style={styles.vaccinationImageStyle}
                  source={{uri: item.authoried_images}}/>
              </View>
            }
          />
        </View>
      </>
    )
  }

  const renderHeaderItemView = () => {
    return(
      <View>
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
        <Pressable onPress={onSubmit} style={styles.submitButonBackStyle}>
          <Text style={styles.submitBtnStyle}>Submit</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.flexOne}>
      <Spinner visible={state.loader} />
      <Header/>
      <PetPassportSubHeader
        title={petObj.pet_name}
        petImage={petObj.pet_image}
      />  
      <View style={[styles.flexOne, {marginLeft: scale(5), marginRight: scale(5),
        marginTop: verticalScale(3)}]}>
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
        onSubmit={(range) => onDateSelected(range)} />
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
    </SafeAreaView>
  );
};

export default PetVaccination;
