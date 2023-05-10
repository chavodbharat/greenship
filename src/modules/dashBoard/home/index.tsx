import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, StatusBar, Text, View} from 'react-native';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate} from '../../../routing/navigationRef';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {
  setActiveSubModule,
  setTabBgColor,
} from '../../../redux/actions/authAction';
import {MY_PET_LIST_SCREEN} from '../../pet/myPetList';
import {useSelector, shallowEqual} from 'react-redux';
import {getUserProfilePic} from '../../../redux/actions/homeAction';
import {useIsFocused} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {getReverseGeocodingData} from '../../../utils/Utility';
import {types} from '../../../redux/ActionTypes';
import {COMMUNITY_USER_LIST_SCREEN} from '../../community/communityUserList';

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
    // dispatch(setActiveSubModule(null));

    if (isFocused) {
      requestLocationPermission();
    }

    if (isFocused && userData?.id) {
      dispatch(setTabBgColor(null));
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
      navigate(COMMUNITY_USER_LIST_SCREEN.name, {
        userPic: state.userProfilePic,
      });
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

  //Location
  const requestLocationPermission = async () => {
    const granted = await getLocationPermissions();

    if (granted) {
      setState(prev => ({...prev, loading: true}));

      getCurrentPosition();
    }
  };

  const getLocationPermissions = async () => {
    const granted = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
      {
        title: 'GreenShip',
        message: 'GreenShip would like access to your location ',
      },
    );

    return granted === RESULTS.GRANTED;
  };

  const setPosition = (lat: any, long: any) => {
    console.log('Lat', lat);
    console.log('Long', long);
    setState(prev => ({...prev, latitude: lat, longitude: long}));
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const crd = position.coords;
        getAddress(crd.latitude, crd.longitude);
        setPosition(crd.latitude, crd.longitude);
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getAddress = (latitude?: any, longitude?: any) => {
    getReverseGeocodingData(latitude, longitude).then(response => {
      console.log('Address', response);
      dispatch({
        type: types.UPDATE_CURRENT_LOCATION,
        payload: {latitude, longitude, address: response},
      });
      setState(prev => ({...prev, locationAddress: response}));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={darkColors.darkGreen} barStyle={'light-content'} />
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
