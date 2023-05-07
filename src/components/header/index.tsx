import React from 'react';
import styles from './styles';
import {Image, Pressable, StatusBar, TextInput, View} from 'react-native';
import AllImages from '../../utils/Constants/AllImages';
import {goBack} from '../../routing/navigationRef';
import {HeaderTypePropsInterface} from './types';

const Header = ({
  statusBarColor,
  onSearchPress,
  isEmergency = false,
  locationAddress,
  onLocationSearch,
  onFilterPress,
  isFilterShow = true
}: HeaderTypePropsInterface) => {

  const onBackPress = () => {
    goBack();
  };

  return (
    <View style={styles.headerParentView}>
      <StatusBar backgroundColor={statusBarColor} barStyle={'light-content'} />
      <Pressable onPress={onBackPress}>
        <View style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={[styles.leftImageStyle, {tintColor: statusBarColor}]}
            source={AllImages.leftBackIcon}
          />
        </View>
      </Pressable>

      <View style={styles.flexOneView}>
        {isEmergency ? (
          <View style={styles.searchBar}>
            <TextInput
              onChangeText={value => onLocationSearch(value)}
              value={locationAddress}
              placeholder="Type here to search..."
              style={styles.address}
            />
          </View>
        ) : null}
      </View>

      {isFilterShow &&
        <Pressable onPress={onFilterPress} style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={[styles.headerImageStyle, {tintColor: statusBarColor}]}
            source={AllImages.filterIcon}
          />
        </Pressable>
      }
      <Pressable onPress={onSearchPress}>
        <View style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={[styles.headerImageStyle, {tintColor: statusBarColor}]}
            source={AllImages.searchIcon}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default Header;
