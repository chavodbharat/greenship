import React, {useMemo} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';
import Modal from "react-native-modal";
import { CustomDateRangeModalTypePropsInterface } from './types';
import DateRangePicker from 'rn-select-date-range';

const DeleteModal = ({isModalVisible, onClose, onDelete}: CustomDateRangeModalTypePropsInterface) => {
 
  return (
    <Modal
      coverScreen={false}
      backdropOpacity={0.8}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500}
      animationOutTiming={700}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{justifyContent: 'center',
      margin: 0,}}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop={true}
      isVisible={isModalVisible}>
      <View style={styles.modalParentView}>
        <Text style={styles.deleteLabelText}>Are you sure you want to delete?</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={onDelete} style={styles.deleteBtnBackView}>
            <Text style={styles.btnLabel}>YES</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.deleteBtnBackView}>
            <Text style={styles.btnLabel}>NO</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
