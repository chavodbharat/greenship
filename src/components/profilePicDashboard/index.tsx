import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, Image, Pressable, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {darkColors} from '../../theme/colors';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelection from '../imageSelection';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Spinner from '../spinner';
import {
  updateBannerImage,
  getBannerImage,
  updateUserProfilePic,
  getUserProfilePic,
} from '../../redux/actions/homeAction';
import {scale} from '../../theme/responsive';
const ProfilePicDashboard = () => {
  const dispatch = useDispatch();
  const {userData} = useSelector(
    state => ({
      userData: state.auth?.loginData,
    }),
    shallowEqual,
  );
  const [state, setState] = useState({
    visible: false,
    imageType: '',
    loading: false,
    bannerImage: '',
    userPic: '',
  });

  useEffect(() => {
    getBannerImageFn();
    getProfilePicFn();
  }, []);

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        callImageUpload(image);
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const openGallery = () => {
    try {
      ImagePicker.openPicker({
        width: state.imageType === 'cover' ? 1350 : 500,
        height: 500,
        cropping: true,
      }).then(image => {
        callImageUpload(image);
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const callImageUpload = image => {
    setState(prev => ({...prev, visible: false}));

    if (state.imageType === 'cover') {
      callCoverImageUpload(image);
    } else if (state.imageType === 'userPic') {
      callUserPicImageUpload(image);
    }
  };

  const callCoverImageUpload = image => {
    setState(prev => ({...prev, loading: true}));

    let formData = new FormData();

    formData.append('file', {
      uri: image?.path,
      type: 'image/jpeg',
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
    });

    formData.append('action', 'bp_cover_image_upload');
    formData.append('context', 'edit');

    let body = {
      data: formData,
      id: userData?.id,
    };
    dispatch(
      updateBannerImage(body, res => {
        getBannerImageFn();
      }),
    );
  };

  const getBannerImageFn = () => {
    let body = {
      id: userData?.id,
      context: 'view',
    };
    dispatch(
      getBannerImage(body, res => {
        if (res?.length) {
          setState(prev => ({...prev, bannerImage: res}));
        }
        setState(prev => ({...prev, loading: false}));
      }),
    );
  };

  const callUserPicImageUpload = image => {
    setState(prev => ({...prev, loading: true}));

    let formData = new FormData();

    formData.append('file', {
      uri: image?.path,
      type: 'image/jpeg',
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
    });

    formData.append('action', 'bp_avatar_upload');
    formData.append('context', 'edit');

    let body = {
      data: formData,
      id: userData?.id,
    };

    dispatch(
      updateUserProfilePic(body, res => {
        getProfilePicFn();
      }),
    );
  };

  const getProfilePicFn = () => {
    let body = {
      id: userData?.id,
      context: 'view',
    };
    dispatch(
      getUserProfilePic(body, res => {
        if (res?.length) {
          setState(prev => ({...prev, userPic: res}));
        }
        setState(prev => ({...prev, loading: false}));
      }),
    );
  };

  const setModalVisible = () => {
    setState(prev => ({...prev, visible: !prev.visible}));
  };
  return (
    <View>
      <Spinner visible={state.loading} />
      {!state.bannerImage ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[darkColors.darkGreen, darkColors.green]}
          style={styles.main}>
          <Text style={styles.userName}>USERNAME</Text>
          <Text style={styles.userRole}>USERROLE</Text>
        </LinearGradient>
      ) : (
        <ImageBackground
          borderRadius={scale(4)}
          source={{uri: state.bannerImage?.[0]?.image}}
          style={styles.main}>
          <Text style={styles.userName}>USERNAME</Text>
          <Text style={styles.userRole}>USERROLE</Text>
        </ImageBackground>
      )}

      <View style={styles.imgWrapper}>
        <Image
          resizeMode={'contain'}
          source={{uri: state.userPic?.[0]?.full}}
          style={styles.img}
        />
        <Pressable
          onPress={() => {
            setState(prev => ({
              ...prev,
              visible: true,
              imageType: 'userPic',
            }));
          }}>
          <Image
            resizeMode="contain"
            style={styles.upload1}
            source={require('../../assets/images/upload.png')}
          />
        </Pressable>

        <View style={styles.uploadWrapper}>
          <Pressable
            onPress={() => {
              setState(prev => ({
                ...prev,
                visible: true,
                imageType: 'cover',
              }));
            }}
            style={styles.pressableUpload}>
            <Image
              resizeMode="contain"
              style={styles.upload}
              source={require('../../assets/images/upload.png')}
            />
          </Pressable>
        </View>
      </View>
      <ImageSelection
        modalVisible={state.visible}
        setModalVisible={setModalVisible}
        onPressCamera={openCamera}
        onPressGallery={openGallery}
      />
    </View>
  );
};

export default ProfilePicDashboard;
