import React from 'react';
import styles from './styles';
import {Image, Pressable, StatusBar, View} from 'react-native';
import AllImages from '../../utils/Constants/AllImages';
import { goBack } from '../../routing/navigationRef';
import { HeaderTypePropsInterface } from './types';

const Header = ({statusBarColor, isfilter, onSearchPress}: HeaderTypePropsInterface) => {

  const onBackPress = () => {
    goBack();
  }
  
  return (
    <View style={styles.headerParentView}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={'light-content'}
      />
      <Pressable onPress={onBackPress}>
        <View style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={styles.leftImageStyle}
            source={AllImages.leftBackIcon}/>
        </View>
      </Pressable>
      
      <View style={styles.flexOneView}/>
     {isfilter ? null : 
     <View style={styles.flexZeroView}>
        <Image
          resizeMode="contain"
          style={styles.headerImageStyle}
          source={AllImages.filterIcon}/>
      </View>}
      <Pressable onPress={onSearchPress}>
        <View style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={styles.headerImageStyle}
            source={AllImages.searchIcon}/>
        </View>
      </Pressable>
    </View>
  );
};

export default Header;
