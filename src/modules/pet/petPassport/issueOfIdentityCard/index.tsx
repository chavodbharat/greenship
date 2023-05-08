import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { darkColors } from "../../../../theme/colors";
import Header from "../../../../components/header";
import { scale, verticalScale } from "../../../../theme/responsive";
import AntIcon from 'react-native-vector-icons/AntDesign';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Spinner from "../../../../components/spinner";
import moment from "moment";
import { TAG_DATE_FORMATE } from "../../../../utils/Constants/AllConstance";
import { getIssueOfIdentityCard, submitIssueOfIdentityCard } from "../../../../redux/actions/petAction";
import { goBack } from "../../../../routing/navigationRef";
import PetPassportSubHeader from "../../../../components/petPassportSubHeader";

export const ISSUE_OF_IDENTITY_CARD_SCREEN = {
    name: 'IssueOfIdentityCard',
};
  
const IssueOfIdentityCard = ({route}: any) => {
    const dispatch = useDispatch();
    const { vaccineObj, petObj } = route.params;
    const staticDateOfIssue = "Select Date of Issue";

    const [state, setState] = useState({
        nameOfAuthorizedVeterinarian: '',
        nameOfAuthorizedVeterinarianError: false,
        address: '',
        addressError: false,
        datePickerStatus: false,
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
        loader: false,
    });
    
    useEffect(() => {
        callPetIssueOfIdentityCardFn();
      }, []);
      
      const callPetIssueOfIdentityCardFn = () => {
        setState(prev => ({...prev, loader: true}));
    
        dispatch(
          getIssueOfIdentityCard({form_id: petObj.form_id}, (res: any) => {
            if(res) {
                const { data } = res;
                setState(prev => ({...prev, loader: false, 
                    nameOfAuthorizedVeterinarian:  data['data-name-des'],
                    address: data['data-anschrift'], 
                    postalCode: data['data-postleitzahl'],
                    ort: data['data-ort'], 
                    land: data['data-land'],
                    phoneNumber: data['data-telefonnummer'],
                    emailAddress: data['data-e-mail-adresse'],
                    dateOfIssue: data['data-ausstellungsdatum'],
                    idNumber: data['data-ausweisnummer']
                }));
            } else {
                setState(prev => ({...prev, loader: false}));
            }
          }),
        );
      };
   
    const onSave = () => {
        if (state?.nameOfAuthorizedVeterinarian === '') {
            setState(prev => ({...prev, nameOfAuthorizedVeterinarianError: true}));
        } else if (state?.address === '') {
            setState(prev => ({...prev, addressError: true}));
        } else if (state?.postalCode === '') {
            setState(prev => ({...prev, postalCodeError: true}));
        } else if (state?.ort === '') {
            setState(prev => ({...prev, ortError: true}));
        } else if (state?.land === '') {
            setState(prev => ({...prev, landError: true}));
        } else if (state?.phoneNumber === '') {
            setState(prev => ({...prev, phoneNumberError: true}));
        } else if (state?.emailAddress === '') {
            setState(prev => ({...prev, emailAddressError: true}));
        } else if (state?.dateOfIssue === '' || state?.dateOfIssue === staticDateOfIssue) {
            setState(prev => ({...prev, dateOfIssueError: true}));
        } else if (state?.idNumber === '') {
            setState(prev => ({...prev, idNumberError: true}));
        } else {
          callIssueOfIdentityCardFn();
        }
    };

    const callIssueOfIdentityCardFn = () => {
        setState(prev => ({...prev, loader: true}));
    
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
            'form_id': petObj.form_id,
        };
        dispatch(
            submitIssueOfIdentityCard(body, (res: any) => {
                setState(prev => ({...prev, loader: false}));
                goBack();
            }),
        );
    };

    return (
        <SafeAreaView style={styles.flexOne}>
            <Spinner visible={state?.loader} color={darkColors.listBackGradientThree}/>
            <Header
                statusBarColor={darkColors.listBackGradientThree}/>
            <PetPassportSubHeader
                title={vaccineObj.label}
                petImage={typeof petObj.pet_image === "string" ? petObj.pet_image : petObj.pet_image.pet_image_url}
            />      
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.flexOne,{marginTop: verticalScale(15)}]}>    
                    <TextInput
                        value={state.nameOfAuthorizedVeterinarian}
                        mode="outlined"
                        label={'Name of authorized veterinarian'}
                        activeOutlineColor={darkColors.listBackGradientThree}
                        outlineColor={darkColors.listBackGradientThree}
                        onChangeText={value => {
                            setState(prev => ({
                                ...prev,
                                nameOfAuthorizedVeterinarian: value,
                                nameOfAuthorizedVeterinarianError: false,
                            }));
                        }}
                        style={[styles.txtInput,{marginTop: 0}]}
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
                        onPress={() => setState(prev => ({...prev, datePickerStatus: true}))}>
                        <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                            <View style={styles.flexOne}>
                                <Text style={[styles.dropdownLabelStyle, state.dateOfIssue != staticDateOfIssue &&
                                    {color: darkColors.black}]}>{state.dateOfIssue}</Text>
                            </View>
                            <View style={styles.flexZero}>
                                <AntIcon
                                    name="calendar"
                                    size={scale(18)}
                                    color={darkColors.listBackGradientThree}
                                />
                            </View>
                        </View>
                    </Pressable>
                    {state.dateOfIssueError ? (
                        <Text style={styles.error}>Please select date of issue</Text>
                    ) : null}

                    <TextInput
                        value={state.idNumber}
                        mode="outlined"
                        label={'ID number'}
                        activeOutlineColor={darkColors.listBackGradientThree}
                        outlineColor={darkColors.listBackGradientThree}
                        onChangeText={value => {
                            setState(prev => ({
                                ...prev,
                                idNumber: value,
                                idNumberError: false,
                            }));
                        }}
                        style={styles.txtInput}
                        placeholder="ID number"
                        placeholderTextColor={'gray'}
                        autoCapitalize="none"
                    />
                    {state.idNumberError ? (
                        <Text style={styles.error}>Please enter ID number</Text>
                    ) : null}

                    <Pressable onPress={onSave} style={styles.btnParentView}>
                        <Text style={styles.btnLabel}>SAVE</Text>
                    </Pressable>
                    <DateTimePicker
                        mode="date"
                        isVisible={state.datePickerStatus}
                        date={new Date()}
                        onConfirm={date => {
                            const updatedDate = moment(date).format(TAG_DATE_FORMATE);
                            setState(prev => ({...prev, dateOfIssue: updatedDate, 
                                datePickerStatus: false, dateOfIssueError: false}));
                        }}
                        onCancel={() => setState(prev => ({...prev, datePickerStatus: false}))}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default IssueOfIdentityCard;