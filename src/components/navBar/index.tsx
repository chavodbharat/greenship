import React from 'react';
import styles from './styles';
import {View, Image, Pressable} from 'react-native';
import {goBack} from '../../routing/navigationRef';
import AllImages from '../../utils/Constants/AllImages';

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
          source={AllImages.leftBackIcon}
        />
      </Pressable>
    </View>
  );
};

export default NavBar;
