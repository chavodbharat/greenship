import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {darkColors} from '../../theme/colors';
import ImagePicker from 'react-native-image-crop-picker';
import ImageSelection from '../imageSelection';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Spinner from '../spinner';
import {
  updateBannerImage,
  getBannerImage,
} from '../../redux/actions/homeAction';
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
  });

  const openCamera = () => {
    try {
      ImagePicker.openCamera({
        width: 1350,
        height: 400,
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
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        callImageUpload(image);
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  const callImageUpload = image => {
    if (state.imageType === 'cover') {
      callCoverImageUpload(image);
    } else if (state.imageType === 'userPic') {
      callUserPicImageUpload(image);
    }
  };

  const callCoverImageUpload = image => {
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
        console.log('resssBan', res);
        if (res?.data) {
          getBannerImageFn();
        }
      }),
    );
  };

  const getBannerImageFn = () => {
    let body = {
      id: userData?.id,
      context: 'view',
    };
    dispatch(getBannerImage(body, res => {}));
  };

  const callUserPicImageUpload = image => {};

  const setModalVisible = () => {
    setState(prev => ({...prev, visible: !prev.visible}));
  };
  return (
    <View>
      <Spinner visible={state.loading} />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[darkColors.darkGreen, darkColors.green]}
        style={styles.main}>
        <Text style={styles.userName}>USERNAME</Text>
        <Text style={styles.userRole}>USERROLE</Text>
      </LinearGradient>

      <View style={styles.imgWrapper}>
        <View style={styles.img}></View>
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
