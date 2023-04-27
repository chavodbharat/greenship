import React, {useEffect, useMemo, useState} from 'react';
import styles from './styles';
import {Pressable, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';
import AddMissingPetModal from '../../modules/dashBoard/emergency/addMissingPetModal';

const FloatingAddButton = () => {
  const [state, setState] = useState({
    missingPetModal: false,
  });
  const {auth} = useSelector(
    state => ({
      auth: state?.auth,
    }),
    shallowEqual,
  );

  const btnColor = useMemo(() => {
    switch (auth?.activeModule) {
      case 0:
        return darkColors.dashboardPetBG;
      case 3:
        return darkColors.dashboardEmergencyBG;
      default:
        return darkColors.darkGreen;
    }
  }, [auth?.activeModule]);

  const updateModalStatus = () => {
    if (auth.activeModule === 3) {
      setState(prev => ({...prev, missingPetModal: !state.missingPetModal}));
    }
  };
  return (
    <Pressable
      onPress={updateModalStatus}
      style={{...styles.btn, backgroundColor: btnColor}}>
      <View>
        <Feather name="plus" size={30} color={'white'} />
        <AddMissingPetModal
          modalVisible={state.missingPetModal}
          setModalVisible={updateModalStatus}
        />
      </View>
    </Pressable>
  );
};

export default FloatingAddButton;
