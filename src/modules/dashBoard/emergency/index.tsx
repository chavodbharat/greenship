import React, { useEffect, useRef, useState } from 'react';
import styles from './styles';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setTabBgColor } from '../../../redux/actions/authAction';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useIsFocused } from '@react-navigation/native';
import {
  fetchLocationResults,
  getReverseGeocodingData,
} from '../../../utils/Utility';
import { getMissingPetListReq } from '../../../redux/actions/homeAction';
import Spinner from '../../../components/spinner';
import { darkColors } from '../../../theme/colors';
import { types } from '../../../redux/ActionTypes';
import PetListView from '../../../components/petListView';
import Header from '../../../components/header';
import ChooseRadiusModal from '../../../components/chooseRadiusModal';
import Geocoder from 'react-native-geocoding';

const Emergency = () => {
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const mapRef = useRef(null);

  const { missingPetSuccess } = useSelector(
    state => ({
      missingPetSuccess: state.home?.missingPetSuccess,
    }),
    shallowEqual,
  );

  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    locationAddress: '',
    loading: false,
    missingPetList: [],
    locations: [],
    selectedAddress: '',
    radiusModal: false,
    radius: 0,
  });

  useEffect(() => {
    if (isFocused) {
      requestLocationPermission();
    }

    return () => {
      dispatch(setTabBgColor(null));
      dispatch({
        type: types.UPDATE_MISSING_SUCCESS,
        payload: false,
      });
    };
  }, [isFocused]);

  useEffect(() => {
    Geocoder.init('AIzaSyCIqkzX9pTLBDe3KKTnDITtVBa-gLqbIEY');

    if (state.selectedAddress !== '' || missingPetSuccess === true) {
      setState(prev => ({ ...prev, loading: true }));
      callGetMissingPetList();
    }
  }, [missingPetSuccess]);

  const requestLocationPermission = async () => {
    const granted = await getLocationPermissions();

    if (granted) {
      setState(prev => ({ ...prev, loading: true }));

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
        title: 'GreenSheep Earth',
        message:
          'GreenSheep Earth would like access to your location to find missing pet near you',
      },
    );

    return granted === RESULTS.GRANTED;
  };

  const setPosition = (lat, long) => {
    setState(prev => ({ ...prev, latitude: lat, longitude: long }));
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
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const getAddress = (latitude?: any, longitude?: any) => {
    getReverseGeocodingData(latitude, longitude).then(response => {
      callGetMissingPetList(latitude, longitude, response);
      setState(prev => ({ ...prev, locationAddress: response }));
    });
  };

  const getRadius = index => {
    return index === 0 ? '25' : index === 1 ? '50' : index === 2 ? '100' : 200;
  };

  const callGetMissingPetList = (
    latitude?: any,
    longitude?: any,
    address?: any,
    radius?: any,
  ) => {
    let body = {
      address: address || state.locationAddress,
      latitude: latitude || state.latitude,
      longitude: longitude || state.longitude,
      distance:
        radius || radius === 0 ? getRadius(radius) : getRadius(state.radius),
    };
    dispatch(
      getMissingPetListReq(body, res => {
        setState(prev => ({
          ...prev,
          loading: false,
          missingPetList: res?.data || [],
        }));

        handleFitToMarkers(res?.data);
      }),
    );
  };

  const handleFitToMarkers = markers => {
    const coordinates = markers.map(marker => ({
      latitude: Number(marker.latitude),
      longitude: Number(marker.longitude),
    }));
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  const zoomToMarker = (marker?: any) => {
    const coordinates = [
      { latitude: Number(marker.latitude), longitude: Number(marker.longitude) },
    ];
    const options = {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    };
    mapRef.current.fitToCoordinates(coordinates, options);
    mapRef.current.animateToRegion({
      ...marker,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  // const HeaderSubView = () => {
  //   return (
  //     <View style={styles.headerRow}>
  //       <Text>Filter Icon Icon</Text>
  //       <Text>Search Icon</Text>
  //     </View>
  //   );
  // };

  const handleSearch = async query => {
    const results = await fetchLocationResults(query);
    setState(prev => ({ ...prev, locations: results }));
  };

  const getLatLongFromAddress = address => {
    setState(prev => ({
      ...prev,
      loading: true,
    }));
    Geocoder.from(address)
      .then(json => {
        var location = json.results[0].geometry.location;
        setState(prev => ({
          ...prev,
          latitude: location?.lat,
          longitude: location?.lng,
        }));
        callGetMissingPetList(location?.lat, location?.lng, address);
      })
      .catch(error => console.warn(error));
  };

  const onFilterRadius = radius => {
    setState(prev => ({ ...prev, radius }));
    setState(prev => ({
      ...prev,
      loading: true,
    }));
    callGetMissingPetList(
      state.latitude,
      state.longitude,
      state.locationAddress,
      radius,
    );
  };

  return (
    // <View style={styles.parentContainer}>
    <SafeAreaView style={styles.safeAreaView}>
      <Spinner
        color={darkColors.dashboardEmergencyBG}
        visible={state.loading}
      />
      <>
        <Header
          headerBackgroundColor={darkColors.gradientLightGray}
          statusBarColor={darkColors.emergencyGradientOne}
          isEmergency={true}
          locationAddress={state.locationAddress}
          onLocationSearch={value => {
            setState(prev => ({ ...prev, locationAddress: value }));
            handleSearch(value);
          }}
          onCrossIconPress={() => {
            setState(prev => ({
              ...prev,
              locationAddress: '',
              selectedAddress: '',
            }));
          }}
          onFilterPress={() => {
            setState(prev => ({ ...prev, radiusModal: true }));
          }}
        />
        <ChooseRadiusModal
          modalVisible={state.radiusModal}
          setModalVisible={() => {
            setState(prev => ({ ...prev, radiusModal: false }));
          }}
          radius={state.radius}
          onSubmit={onFilterRadius}
        />
        <View style={styles.mapBox}>
          <MapView
            zoomControlEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            style={styles.mapStyle}
            ref={mapRef}>
            {state.missingPetList?.map((marker, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: Number(marker.latitude) || 0,
                    longitude: Number(marker.longitude) || 0,
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: marker?.pet_image_url }}
                    style={styles.markerImg}
                  />

                  <Callout tooltip={true} style={styles.callOutWrapper}>
                    <View>
                      <Text style={styles.calloutTitle}>
                        {marker?.pet_name} {marker?.pet_age}
                        {marker?.pet_gender} {marker?.pet_size}{' '}
                        {marker?.pet_color} {marker?.pet_gender}{' '}
                        {marker?.pet_country}
                      </Text>
                    </View>
                  </Callout>
                </Marker>
              );
            })}
          </MapView>
        </View>

        <ScrollView style={styles.container}>
          <View style={styles.listWrapper}>
            <PetListView
              isEmergency={true}
              onItemPress={item =>
                zoomToMarker({
                  latitude: item?.latitude,
                  longitude: item.longitude,
                })
              }
              petListData={state?.missingPetList}
            />
          </View>
        </ScrollView>
        <View style={styles.list}>
          {state?.locations?.map(item => {
            return (
              <Pressable
                onPress={() => {
                  setState(prev => ({
                    ...prev,
                    locationAddress: item?.name,
                    selectedAddress: item?.name,
                    locations: [],
                  }));

                  getLatLongFromAddress(item?.name);
                }}
                style={styles.item}>
                <Text style={styles.name}>{item?.name}</Text>
                <View style={styles.separator} />
              </Pressable>
            );
          })}
        </View>
      </>
    </SafeAreaView>
    // </View>
  );
};

export default Emergency;
