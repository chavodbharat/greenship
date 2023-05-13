import React from 'react';
import styles from './styles';
import {View, Modal, Text} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {scale} from '../../theme/responsive';
import {Pressable} from 'react-native';

const DeleteAccConfirmModal = ({modalVisible, setModalVisible, onPressYes}) => {
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
            name="cross"
            size={scale(30)}
            style={styles.crossIcon}
            color={'black'}
          />

          <Text style={styles.heading}>
            Are you sure you want to delete your account?
          </Text>
          <Text style={styles.desc}>
            If you delete your account you can't recover it
          </Text>

          <View style={styles.rowWrapper}>
            <Pressable onPress={setModalVisible} style={styles.noBtn}>
              <Text style={styles.no}>No</Text>
            </Pressable>
            <Pressable onPress={onPressYes} style={styles.yesBtn}>
              <Text style={styles.yes}>Yes</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccConfirmModal;
