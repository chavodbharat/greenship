import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
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
import { getIdentificationOfAnimal, submitIdentificationOfAnimal } from "../../../../redux/actions/petAction";
import { goBack, navigate } from "../../../../routing/navigationRef";
import PetPassportSubHeader from "../../../../components/petPassportSubHeader";
import { SEARCH_FILTER_SCREEN } from "../../../searchFilters/searchFilter";
import LinearGradient from "../../../../components/linearGradient";
import { useTheme } from "../../../../providers/ThemeProvider";
import DigitalerTierpassView from "../../../../components/digitalerTierpassView";
import { ISSUE_OF_IDENTITY_CARD_SCREEN } from "../issueOfIdentityCard";

export const IDENTIFICATION_OF_ANIMAL_SCREEN = {
    name: 'IdentificationOfAnimal',
};
  
const IdentificationOfAnimal = ({route}: any) => {
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const { petProfilePicRes, petObj } = route.params;
    const staticDateOfImplantation = "Select Date of Implantation";
    const staticDateOfTatto = "Select Date of Tattoo";

    const [state, setState] = useState({
        alphanumerischerCode: '',
        alphanumerischerCodeError: false,
        implantSite: '',
        implantSiteError: false,
        dateOfImplantation: staticDateOfImplantation,
        dateOfImplantationError: false,
        datePickerStatus: false,
        alphanumericTattooCode: '',
        alphanumericTattooCodeError: false,        
        tattooSpot: '',
        tattooSpotError: false,
        dateOfTattoo: staticDateOfTatto,
        dateOfTattooError: false,
        datePickerPosition: 0,
        loader: false,
    });
    
    useEffect(() => {
        callPetIdentificationOfAnimalFn();
      }, []);
      
      const callPetIdentificationOfAnimalFn = () => {
        setState(prev => ({...prev, loader: true}));
    
        dispatch(
          getIdentificationOfAnimal({form_id: petObj.form_id}, (res: any) => {
            if(res) {
                const { data } = res;
                console.log("data['data-datum-der']", data['data-datum-der'])
                setState(prev => ({...prev, loader: false, alphanumerischerCode:  data['data-alphanumerischer'],
                    dateOfImplantation: data['data-datum-der'] ? data['data-datum-der'] : staticDateOfImplantation, 
                    implantSite: data['data-implantierungsstelle'],
                    alphanumericTattooCode: data['data-alphanumerischer-t'], 
                    dateOfTattoo: data['data-datum-der-ta'] ? data['data-datum-der-ta'] : staticDateOfTatto,
                    tattooSpot: data['data-tätowierungsstelle']}));
            } else {
                setState(prev => ({...prev, loader: false}));
            }
          }),
        );
      };
   
    const onSave = () => {
        if (state?.alphanumerischerCode === '') {
            setState(prev => ({...prev, alphanumerischerCodeError: true}));
        } else if (state?.dateOfImplantation === '' || state?.dateOfImplantation === staticDateOfImplantation) {
            setState(prev => ({...prev, dateOfImplantationError: true}));
        } else if (state?.implantSite === '') {
            setState(prev => ({...prev, implantSiteError: true}));
        } else if (state?.alphanumericTattooCode === '') {
            setState(prev => ({...prev, alphanumericTattooCodeError: true}));
        } else if (state?.dateOfTattoo === '' || state?.dateOfTattoo === staticDateOfTatto) {
            setState(prev => ({...prev, dateOfTattooError: true}));
        } else if (state?.tattooSpot === '') {
            setState(prev => ({...prev, tattooSpotError: true}));
        } else {
          callIdentificationOfAnimalFn();
        }
    };

    const callIdentificationOfAnimalFn = () => {
        setState(prev => ({...prev, loader: true}));
    
        let body = {
            'data-alphanumerischer': state?.alphanumerischerCode,
            'data-datum-der': state?.dateOfImplantation,
            'data-implantierungsstelle': state?.implantSite,
            'data-alphanumerischer-t': state?.alphanumericTattooCode,
            'data-datum-der-ta': state?.dateOfTattoo,
            'data-tätowierungsstelle': state?.tattooSpot,
            'form_id': petObj.form_id,
        };
        dispatch(
            submitIdentificationOfAnimal(body, (res: any) => {
                setState(prev => ({...prev, loader: false}));
                navigate(ISSUE_OF_IDENTITY_CARD_SCREEN.name, {petProfilePicRes, petObj});
               // goBack();
            }),
        );
    };
    
    const onFilterPress = () => {
        navigate(SEARCH_FILTER_SCREEN.name, {isPetTabShow: true});
    }
    
    return (
        <SafeAreaView style={styles.flexOne}>
            <Spinner visible={state?.loader} color={darkColors.listBackGradientThree}/>
            <Header
                statusBarColor={darkColors.listBackGradientThree}
                onFilterPress={onFilterPress}/>
            {/* <PetPassportSubHeader
                title={vaccineObj.label}
                petImage={typeof petObj.pet_image === "string" ? petObj.pet_image : petObj.pet_image.pet_image_url}
            />   */}
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1}}>
                <View style={[styles.flexOne,{padding: scale(25)}]}>
                    {petProfilePicRes &&
                        <DigitalerTierpassView
                            petProfilePicRes={petProfilePicRes}/>
                    }    
                    <TextInput
                        value={state.alphanumerischerCode}
                        mode="outlined"
                        label={'Alphanumerischer Transponder-Code'}
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
                    onPress={() => setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 0}))}>
                    <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                        <View style={styles.flexOne}>
                        <Text style={[styles.dropdownLabelStyle, state.dateOfImplantation != staticDateOfImplantation &&
                            {color: darkColors.black}]}>{state.dateOfImplantation}</Text>
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
                    {state.dateOfImplantationError ? (
                        <Text style={styles.error}>Please select implantation date</Text>
                    ) : null}

                    <TextInput
                        value={state.implantSite}
                        mode="outlined"
                        label={'Implant site'}
                        activeOutlineColor={darkColors.listBackGradientThree}
                        outlineColor={darkColors.listBackGradientThree}
                        onChangeText={value => {
                            setState(prev => ({
                                ...prev,
                                implantSite: value,
                                implantSiteError: false,
                            }));
                        }}
                        style={styles.txtInput}
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
                        onPress={() => setState(prev => ({...prev, datePickerStatus: true, datePickerPosition: 1}))}>
                        <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                            <View style={styles.flexOne}>
                                <Text style={[styles.dropdownLabelStyle, state.dateOfTattoo != staticDateOfTatto &&
                                    {color: darkColors.black}]}>{state.dateOfTattoo}</Text>
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
                    {state.dateOfTattooError ? (
                        <Text style={styles.error}>Please select tatto date</Text>
                    ) : null}

                    <TextInput
                        value={state.tattooSpot}
                        mode="outlined"
                        label={'Tattoo spot'}
                        activeOutlineColor={darkColors.listBackGradientThree}
                        outlineColor={darkColors.listBackGradientThree}
                        onChangeText={value => {
                            setState(prev => ({
                                ...prev,
                                tattooSpot: value,
                                tattooSpotError: false,
                            }));
                        }}
                        style={styles.txtInput}
                        placeholder="Tattoo spot"
                        placeholderTextColor={'gray'}
                        autoCapitalize="none"
                    />
                    {state.tattooSpotError ? (
                        <Text style={styles.error}>Please enter tattoo spot</Text>
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
                            if(state.datePickerPosition == 0) {
                                setState(prev => ({...prev, dateOfImplantation: updatedDate, 
                                    datePickerStatus: false, dateOfImplantationError: false}));
                            } else {
                                setState(prev => ({...prev, dateOfTattoo: updatedDate, 
                                    datePickerStatus: false, dateOfTattooError: false}));
                            }
                        }}
                        onCancel={() => setState(prev => ({...prev, datePickerStatus: false}))}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default IdentificationOfAnimal;