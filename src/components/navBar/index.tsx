import React from 'react';
import styles from './styles';
import {View, Image, Pressable} from 'react-native';
import {goBack} from '../../routing/navigationRef';

const NavBar = () => {
  return (
    <View style={styles.main}>
      <Pressable
        style={styles.backBtn}
        onPress={() => {
          goBack();
        }}>
        <Image
          resizeMode="contain"
          style={styles.back}
          source={require('../../assets/images/back.png')}
        />
      </Pressable>
    </View>
  );
};

export default NavBar;
