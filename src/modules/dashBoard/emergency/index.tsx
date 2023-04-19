import React, {useEffect} from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, ScrollView, Image} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {setTabBgColor} from '../../../redux/actions/authAction';

const tokyoRegion = {
  latitude: 35.6762,
  longitude: 139.6503,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const Emergency = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTabBgColor(null));
    };
  }, []);
  // const HeaderSubView = () => {
  //   return (
  //     <View style={styles.headerRow}>
  //       <Text>Filter Icon Icon</Text>
  //       <Text>Search Icon</Text>
  //     </View>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header
        title=""
        onBackPress={() => goBack()}
        children={<HeaderSubView />}
      /> */}

      <View style={styles.mapBox}>
        <MapView
          style={styles.mapStyle}
          showsUserLocation={false}
          // zoomEnabled={false}
          // scrollEnabled={false}
          region={tokyoRegion}
          // zoomControlEnabled={false}
        >
          <Marker coordinate={tokyoRegion}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic_app_logo.png')}
              style={styles.markerImg}
            />
          </Marker>

          <Marker
            coordinate={{
              latitude: 35.67714827145542,
              longitude: 139.6551462687416,
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/ic_app_logo.png')}
              style={styles.markerImg}
            />
          </Marker>
        </MapView>
      </View>
      <ScrollView>
        {[...Array(4)]?.map((tile, index) => {
          return (
            <View key={index} style={styles.itemWrapper}>
              <View style={styles.img}></View>

              <View style={styles.labelWrapper}>
                <Text style={styles.label}>NAme Art</Text>
              </View>
              <View style={styles.valueWrapper}>
                <Text style={styles.label}>Brown SugarPFerd</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Emergency;
