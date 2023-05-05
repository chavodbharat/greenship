import React, {useEffect, useState} from 'react';
import {View, Text, Modal, Pressable} from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {darkColors} from '../../../../theme/colors';
import {scale} from '../../../../theme/responsive';
import {useDispatch} from 'react-redux';
import {
  getMyPetListReq,
  updateMissingPetReq,
} from '../../../../redux/actions/homeAction';
import Spinner from '../../../../components/spinner';

interface addMissingPetModalProps {
  modalVisible?: boolean;
  setModalVisible?: Function;
}
const AddMissingPetModal: React.FC<addMissingPetModalProps> = ({
  modalVisible = false,
  setModalVisible,
}) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    animals: [],
    animal: '',
    animalError: false,
    loading: false,
  });

  useEffect(() => {
    getMyPetList();
  }, []);

  const getMyPetList = () => {
    dispatch(
      getMyPetListReq(res => {
        setState(prev => ({...prev, animals: res?.data}));
      }),
    );
  };

  const submit = () => {
    if (state.animal === '') {
      setState(prev => ({...prev, animalError: true}));
    } else {
      setState(prev => ({...prev, loading: true}));

      let body = {
        pet_id: state.animal?.id,
        pet_vermisst: 'yes',
      };
      dispatch(
        updateMissingPetReq(body, res => {
          setState(prev => ({...prev, loading: false}));
          getMyPetList();
          setModalVisible && setModalVisible();
        }),
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Spinner visible={state.loading} />
          <Entypo
            onPress={() => setModalVisible()}
            name="circle-with-cross"
            size={scale(30)}
            style={styles.crossIcon}
            color={darkColors.dashboardEmergencyBG}
          />
          <Text style={styles.title}>do you want to report your</Text>
          <Text style={styles.subTitle}> pet missing ?</Text>

          <Text style={styles.title}>please choose your animal</Text>

          <SelectDropdown
            data={state.animals}
            onSelect={selectedItem => {
              setState(prev => ({
                ...prev,
                animal: selectedItem,
                animalError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            renderDropdownIcon={isOpened => {
              return (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={scale(30)}
                  color={darkColors.dashboardEmergencyBG}
                />
              );
            }}
            rowTextForSelection={(item, index) => {
              return item?.pet_name;
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem?.pet_name || 'Select animal '}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          {state.animalError ? (
            <Text style={styles.error}>Please select animal</Text>
          ) : null}

          <Pressable onPress={submit} style={styles.submitBtn}>
            <Text style={styles.btnLabel}>submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AddMissingPetModal;
