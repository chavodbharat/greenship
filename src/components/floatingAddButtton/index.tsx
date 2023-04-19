import React, {useMemo} from 'react';
import styles from './styles';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';

const FloatingAddButton = () => {
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
  return (
    <View style={{...styles.btn, backgroundColor: btnColor}}>
      <View>
        <Feather name="plus" size={30} color={'white'} />
      </View>
    </View>
  );
};

export default FloatingAddButton;
