import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Pressable, Image, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {scale} from '../../theme/responsive';
import Entypo from 'react-native-vector-icons/Entypo';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {
  getUserProfilePic,
  deleteAccountReq,
} from '../../redux/actions/homeAction';
import {useIsFocused} from '@react-navigation/native';
import {navigate} from '../../routing/navigationRef';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../../redux/ActionTypes';
import {showMessage} from 'react-native-flash-message';
import DeleteAccConfirmModal from '../deleteAccConfirmModal';
import Spinner from '../spinner';
import VersionCheck from 'react-native-version-check';
import { darkColors } from '../../theme/colors';
import AllImages from '../../utils/Constants/AllImages';
const CustomDrawer = ({navigation}: any) => {
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
    visible: false,
    loading: false,
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

  const onLogoutPress = isDeleted => {
    AsyncStorage.clear();
    dispatch({type: types.UPDATE_SIGN_IN, payload: false});
    dispatch({
      type: types.LOGOUT_SUCCESS,
    });
    showMessage({
      message: isDeleted
        ? 'Account deleted successfully'
        : 'Logout successfully..!!',
      type: 'success',
    });
  };

  const onDeleteAccount = () => {
    setModalVisible();
    navigation.closeDrawer();
    setState(prev => ({...prev, loading: true}));

    dispatch(
      deleteAccountReq(res => {
        setState(prev => ({...prev, loading: false}));

        if (res?.success) {
          onLogoutPress(true);
        }
      }),
    );
  };

  const setModalVisible = () => {
    setState(prev => ({...prev, visible: !prev.visible}));
  };
  return (
    <SafeAreaView style={styles.main}>
      <DeleteAccConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={state.visible}
        onPressYes={onDeleteAccount}
      />
      <Spinner visible={state.loading} />
      <Entypo
        onPress={() => {
          navigation.closeDrawer();
        }}
        size={scale(26)}
        color={'black'}
        alignSelf={'flex-end'}
        name="cross"
        paddingRight={scale(12)}
      />
      <Pressable
        onPress={() => navigate('Profile', {userPic: state.userProfilePic})}
        style={styles.user}>
        <Image
          resizeMode="cover"
          style={styles.userView}
          source={{uri: state?.userProfilePic?.[0]?.full}}
          defaultSource={require('../../assets/images/ic_no_avatar.png')}
        />
      </Pressable>
      <Text style={styles.userName}>{userData?.nicename?.toUpperCase()}</Text>

      <Pressable onPress={() => console.log("call 11")} style={styles.wrapper}>
        <Feather
          name="edit"
          color={'white'}
          size={scale(20)}
        />
        <Text style={styles.label}>Edit profile</Text>
      </Pressable>
      <Pressable onPress={() => console.log("call 11")} style={[styles.wrapper, 
        {backgroundColor: darkColors.borderBlueColor, paddingVertical: scale(8)}]}>
        <Image
          style={{width: scale(20), height: scale(30)}}
          source={AllImages.myPetIcon}
        />
        <Text style={styles.label}>PetPass</Text>
      </Pressable>
      <Pressable onPress={() => onLogoutPress()} style={styles.wrapper}>
        <MaterialCommunityIcons
          name="logout"
          color={'white'}
          size={scale(20)}
        />
        <Text style={styles.label}>Logout</Text>
      </Pressable>
      <View style={styles.end}>
        <View style={[styles.rowView,{marginVertical: scale(20), justifyContent: 'center'}]}>
          <Image
            style={styles.englishLanIcon}
            source={AllImages.englishLanIcon}
          />
          <Image
            style={styles.germanLanIcon}
            source={AllImages.germanLanIcon}
          />
        </View>
        <Pressable onPress={() => setModalVisible()} style={styles.wrapper}>
          <AntDesign name="delete" color={'white'} size={scale(20)} />
          <Text style={styles.label}>Delete account</Text>
        </Pressable>
        <View style={[styles.rowView,{paddingLeft: scale(10),
          paddingTop: scale(10)}]}>
          <View style={styles.flexOneView}>
            <Text style={styles.version}>Data Protection (GDPR)</Text>
          </View>
          <View style={styles.flexZeroView}>
            <Text style={styles.version}>v {VersionCheck.getCurrentVersion()}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
