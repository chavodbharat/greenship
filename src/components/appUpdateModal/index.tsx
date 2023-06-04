import React from 'react';
import styles from './styles';
import {Image, Pressable, Text, View} from 'react-native';
import Modal from "react-native-modal";
import { CustomAppUpdateModalTypePropsInterface } from './types';
import AllImages from '../../utils/Constants/AllImages';

const AppUpdateModal = ({isModalVisible, onClose, onUpdatePress}: CustomAppUpdateModalTypePropsInterface) => {
 
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
        <View style={styles.modalHeaderBackView}>
          <Text style={styles.appHeaderLabelText}>App Update</Text>
        </View>
        <Image
          style={styles.appUpdateLogoStyle}
          source={AllImages.appLogoWithBorderIcon}/>
        <Text style={styles.appSubtitleLabelText}>If you want to take advantage of or use more features, please update our updated version of the application.</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={onUpdatePress} style={styles.updateBtnBackView}>
            <Text style={styles.btnLabel}>UPDATE</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.updateBtnBackView}>
            <Text style={styles.btnLabel}>Not Now</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AppUpdateModal;
