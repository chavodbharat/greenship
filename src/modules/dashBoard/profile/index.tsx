import React, {useState} from 'react';
import styles from './styles';
import {View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {darkColors} from '../../../theme/colors';
import {goBack, navigate} from '../../../routing/navigationRef';
import {scale, verticalScale} from '../../../theme/responsive';
import LinearGradient from 'react-native-linear-gradient';
import Accordion from '../../../components/accordion';
import {shallowEqual, useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import PetHealthFloatingButton from '../../../components/petHealthFloatingButton';

const accordionArray = [
  {
    id: 0,
    title: 'Settings & Privacy',
    desc: 'Lorem111111 ipsum dolor, sit amet consectetur adipisicing elit. N',
  },
  {
    id: 0,
    title: 'Help & Support',
    desc: 'Lorem222 ipsum dolor, sit amet consectetur adipisicing elit. N',
  },
];
const Profile = ({route}) => {
  const profilePic = route?.params?.userPic;

  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );

  const getTitleInfo = (index: any) => {
    try {
      switch (index) {
        case 0:
          return {
            label: 'edit profile',
            path: require('../../../assets/images/edit.png'),
          };
        case 1:
          return {
            label: 'my friends',
            path: require('../../../assets/images/myFriends.png'),
          };
        case 2:
          return {
            label: 'my groups',
            path: require('../../../assets/images/myGroupGray.png'),
          };
        case 3:
          return {
            label: 'my pets',
            path: require('../../../assets/images/myPetsGray.png'),
          };
        default:
          return null;
      }
    } catch (e) {}
  };

  const onTilePress = (index?: any) => {
    switch (index) {
      case 0:
        return navigate('EditProfile');
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Ionicons
          onPress={() => goBack()}
          name="arrow-back"
          color={darkColors.darkGreen}
          size={scale(30)}
        />
        <View style={styles.header}>
          <Image source={{uri: profilePic?.[0]?.full}} style={styles.pic} />
          <Text style={styles.name}> {(userData?.nicename).toUpperCase()}</Text>
        </View>

        <View style={styles.boxWrapper}>
          {[...Array(4)].map((item, index) => {
            return (
              <LinearGradient
                style={styles.lg}
                colors={[
                  darkColors.gradientGary,
                  darkColors.gradientLightGray,
                  'white',
                ]}>
                <Pressable
                  onPress={() => onTilePress(index)}
                  style={styles.box}>
                  <Image
                    resizeMode="contain"
                    source={getTitleInfo(index)?.path}
                    style={styles.icon}
                  />
                  <Text
                    style={{
                      ...styles.label,
                      paddingTop: index === 2 ? 0 : verticalScale(7),
                    }}>
                    {getTitleInfo(index)?.label}
                  </Text>
                </Pressable>
              </LinearGradient>
            );
          })}
        </View>

        <View style={styles.end}>
          {accordionArray.map((item, index) => {
            return <Accordion item={item} />;
          })}
        </View>
      </View>
      <PetHealthFloatingButton />
    </SafeAreaView>
  );
};

export default Profile;
