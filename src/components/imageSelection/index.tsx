import React from 'react';
import styles from './styles';
import {View, Modal, Image, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {darkColors} from '../../theme/colors';
import {scale} from '../../theme/responsive';
import {Pressable} from 'react-native';

const ImageSelection = ({
  modalVisible,
  setModalVisible,
  onPressCamera,
  onPressGallery,
}) => {
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <Entypo
            onPress={() => setModalVisible()}
            name="circle-with-cross"
            size={scale(30)}
            style={styles.crossIcon}
            color={darkColors.dashboardEmergencyBG}
          />

          <Text style={styles.heading}> Select Option</Text>

          <View style={styles.rowWrapper}>
            <Pressable onPress={onPressCamera}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('../../assets/images/photo-camera.png')}
              />
              <Text style={styles.label}>Camera</Text>
            </Pressable>
            <Pressable onPress={onPressGallery}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={require('../../assets/images/image-gallery.png')}
              />
              <Text style={styles.label}>Gallery</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageSelection;
