import React, {useMemo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';
import Modal from "react-native-modal";
import { CustomDateRangeModalTypePropsInterface } from './types';
import DateRangePicker from 'rn-select-date-range';

const CustomDateRangeModal = ({isModalVisible, onClose, onSubmit}: CustomDateRangeModalTypePropsInterface) => {
 
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
      style={{justifyContent: 'flex-end',
      margin: 0,}}
      swipeDirection={['down']}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop={true}
      isVisible={isModalVisible}>
      <View style={styles.modalParentView}>
        <DateRangePicker
          onSelectDateRange={(range) => onSubmit(range)}
          blockSingleDateSelection={true}
          responseFormat="YYYY-MM-DD"
          selectedDateContainerStyle={styles.selectedDateContainerStyle}
          selectedDateStyle={styles.selectedDateStyle}
        />
      </View>
    </Modal>
  );
};

export default CustomDateRangeModal;
