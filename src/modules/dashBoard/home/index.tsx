import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {setTabBgColor} from '../../../redux/actions/authAction';
import { MY_PET_LIST_SCREEN } from '../../pet/myPetList';

export const DASHBOARD_SCREEN = {
  name: 'Dashboard',
};

const Home = () => {
  const dispatch = useDispatch();

  const onTilePress = (index: any) => {
    if(index == 0) 
      navigate(MY_PET_LIST_SCREEN.name);

    dispatch(setTabBgColor(index));
  };

  const getTitleInfo = (index: any) => {
    try {
      switch (index) {
        case 0:
          return {
            bgColor: darkColors.dashboardPetBG,
            label: 'My Pets',
            path: require('../../../assets/images/myPets.png'),
          };
        case 1:
          return {
            bgColor: darkColors.darkGreen,
            label: 'Community',
            path: require('../../../assets/images/community.png'),
          };
        case 2:
          return {
            bgColor: darkColors.darkGreen,
            label: 'Groups',
            path: require('../../../assets/images/group.png'),
          };
        case 3:
          return {
            bgColor: darkColors.dashboardEmergencyBG,
            label: 'Emergency',
            path: require('../../../assets/images/emergency.png'),
          };
        default:
          return null;
      }
    } catch (e) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <View style={styles.userView}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../../../assets/images/ic_no_avatar.png')}
          />
        </View>
        <Image
          style={styles.upload}
          source={require('../../../assets/images/upload.png')}
        />
      </View>

      <View style={styles.list}>
        {[...Array(4)]?.map((tile, index) => {
          return (
            <Pressable onPress={() => onTilePress(index)} key={index}>
              <View
                style={{
                  ...styles.box,
                  backgroundColor: getTitleInfo(index)?.bgColor,
                }}>
                <Image
                  resizeMode="contain"
                  style={styles.tileImg}
                  source={getTitleInfo(index)?.path}
                />
              </View>
              <Text style={styles.label}>{getTitleInfo(index)?.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default Home;
