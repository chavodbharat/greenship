import React, {useState} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../../../theme/colors';
import {goBack, navigate} from '../../../routing/navigationRef';
import {scale, verticalScale} from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Accordion from '../../../components/accordion';
import {shallowEqual, useSelector} from 'react-redux';
import {TextInput} from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const genderType = ['Men', 'Women', 'Other'];
const SearchMember = ({route}) => {
  const profilePic = route?.params?.userPic;
  const [option,setOption] = useState(route.params?.option)
  const [state, setState] = useState({
    name: '',
    genderError: false,
    gender: '',
  });
  const [animalState, setAnimalState] = useState({
    name: '',
    artError: false,
    art: '',
    raceError: false,
    race: '',
    genderError: false,
    gender: '',
  });

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

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

<SelectDropdown
            data={genderType}
            onSelect={selectedItem => {
              setState(prev => ({
                ...prev,
                gender: selectedItem,
                genderError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={isOpened => {
              return (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={scale(30)}
                  color={darkColors.darkGreen}
                />
              );
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem || 'Gender'}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

<Pressable onPress={()=>{}} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>Search now</Text>
          </Pressable>
          </View>
          :
          <View style={{width:'100%',paddingVertical:scale(10)}}>
               <TextInput
            value={state.name}
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

<SelectDropdown
            data={genderType}
            onSelect={selectedItem => {
              setAnimalState(prev => ({
                ...prev,
                art: selectedItem,
                artError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={isOpened => {
              return (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={scale(30)}
                  color={darkColors.darkGreen}
                />
              );
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem || 'Art'}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

<SelectDropdown
            data={genderType}
            onSelect={selectedItem => {
              setAnimalState(prev => ({
                ...prev,
                race: selectedItem,
                raceError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={isOpened => {
              return (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={scale(30)}
                  color={darkColors.darkGreen}
                />
              );
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem || 'Race'}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

<SelectDropdown
            data={genderType}
            onSelect={selectedItem => {
              setAnimalState(prev => ({
                ...prev,
                gender: selectedItem,
                genderError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={isOpened => {
              return (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={scale(30)}
                  color={darkColors.darkGreen}
                />
              );
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem || 'Gender'}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

<Pressable onPress={()=>{}} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>Search now</Text>
          </Pressable>
          </View>
        }
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchMember;
