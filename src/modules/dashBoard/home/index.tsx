import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {setTabBgColor} from '../../../redux/actions/authAction';
import {MY_PET_LIST_SCREEN} from '../../pet/myPetList';
import {MY_MEMBER_LIST_SCREEN} from '../../community/memberList';
import {useSelector, shallowEqual} from 'react-redux';
import {getUserProfilePic} from '../../../redux/actions/homeAction';
import {useIsFocused} from '@react-navigation/native';

export const DASHBOARD_SCREEN = {
  name: 'Dashboard',
};

const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  const [state, setState] = useState({
    userProfilePic: null,
  });

  useEffect(() => {
    if (isFocused && userData?.id) {
      let body = {
        context: 'view',
        id: userData?.id,
      };

      dispatch(
        getUserProfilePic(body, res => {
          setState(prev => ({...prev, userProfilePic: res}));
        }),
      );
    }
  }, [isFocused, userData?.id]);

  const onTilePress = (index: any) => {
    if (index === 0) {
      navigate(MY_PET_LIST_SCREEN.name, {userPic: state.userProfilePic});
    } else if (index === 1) {
      navigate(MY_MEMBER_LIST_SCREEN.name, {userPic: state.userProfilePic});
    } else if (index === 3) {
      navigate('Emergency');
    } else {
      // navigate('Emergency');
    }
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
      <Pressable
        onPress={() => navigate('Profile', {userPic: state.userProfilePic})}
        style={styles.main}>
        <Image
          resizeMode="cover"
          style={styles.userView}
          source={{uri: state?.userProfilePic?.[0]?.full}}
          defaultSource={require('../../../assets/images/ic_no_avatar.png')}
        />
      </Pressable>

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
