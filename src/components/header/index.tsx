import React, {useMemo} from 'react';
import styles from './styles';
import {Image, Pressable, StatusBar, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useSelector} from 'react-redux';
import { useTheme } from '../../providers/ThemeProvider';
import AllImages from '../../utils/Constants/AllImages';
import { goBack } from '../../routing/navigationRef';
import { HeaderTypePropsInterface } from './types';

const Header = ({statusBarColor}: HeaderTypePropsInterface) => {

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
      <View style={styles.flexZeroView}>
        <Image
          resizeMode="contain"
          style={styles.headerImageStyle}
          source={AllImages.filterIcon}/>
      </View>
      <View style={styles.flexZeroView}>
        <Image
          resizeMode="contain"
          style={styles.headerImageStyle}
          source={AllImages.searchIcon}/>
      </View>
    </View>
  );
};

export default Header;
