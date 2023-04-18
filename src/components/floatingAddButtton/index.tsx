import React from 'react';
import styles from './styles';
import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
const FloatingAddButton = () => {
  return (
    <View style={styles.btn}>
      <View>
        <Feather name="plus" size={30} color={'white'} />
      </View>
    </View>
  );
};

export default FloatingAddButton;
