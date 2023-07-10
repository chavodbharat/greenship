import React from 'react';
import styles from './styles';
import { Image, Pressable, StatusBar, TextInput, View } from 'react-native';
import AllImages from '../../utils/Constants/AllImages';
import {goBack, pop} from '../../routing/navigationRef';
import {HeaderTypePropsInterface} from './types';
import Entypo from 'react-native-vector-icons/Entypo';
import { scale } from '../../theme/responsive';
import { darkColors, lightColors } from '../../theme/colors';
import Feather from 'react-native-vector-icons/Feather';

const Header = ({
  statusBarColor,
  onSearchPress,
  isEmergency = false,
  locationAddress,
  onLocationSearch,
  onFilterPress,
  isFilterShow = true,
  onCrossIconPress,
  backOneScreen = true,
  headerBackgroundColor,
  isMoreOptionShow = false,
  onMoreIconPress,
}: HeaderTypePropsInterface) => {
  const onBackPress = () => {
    if(backOneScreen){
      goBack();
    } else {
      pop(2);
    }
  };

  return (
    <View style={[styles.headerParentView, { backgroundColor: headerBackgroundColor ? headerBackgroundColor : lightColors.defaultViewBackgroundColor }]}>
      <StatusBar backgroundColor={statusBarColor} barStyle={'light-content'} />
      <Pressable onPress={onBackPress}>
        <View style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={[styles.leftImageStyle, {
              tintColor: statusBarColor
            }]}
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
            <Entypo
              onPress={onCrossIconPress}
              name="circle-with-cross"
              size={scale(20)}
              style={{ marginRight: scale(5) }}
              color={darkColors.dashboardEmergencyBG}
            />
          </View>
        ) : null}
      </View>

      {isMoreOptionShow && (
        <Pressable onPress={onMoreIconPress} style={[styles.flexZeroView,{marginRight: scale(5)}]}>
          <Feather
            name="more-horizontal"
            color={statusBarColor}
            size={scale(20)}
          />
        </Pressable>
      )}
      {isFilterShow && (
        <Pressable onPress={onFilterPress} style={styles.flexZeroView}>
          <Image
            resizeMode="contain"
            style={[styles.headerImageStyle, {
              tintColor: statusBarColor
            }]}
            source={AllImages.filterIcon}
          />
        </Pressable>
      )}
      {onSearchPress ? (
        <Pressable onPress={onSearchPress}>
          <View style={styles.flexZeroView}>
            <Image
              resizeMode="contain"
              style={[styles.headerImageStyle, { tintColor: statusBarColor }]}
              source={AllImages.searchIcon}
            />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default Header;
