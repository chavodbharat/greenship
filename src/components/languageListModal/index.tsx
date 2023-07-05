import React from 'react';
import styles from './styles';
import {Image, Pressable, Text, View} from 'react-native';
import Modal from "react-native-modal";
import { LanguageListModalTypePropsInterface } from './types';
import Localization from '../../locales/Localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { types } from '../../redux/ActionTypes';

const LanguageListModal = ({isModalVisible, onClose}: LanguageListModalTypePropsInterface) => {
 
  const onLanguageChange = (lan: string) => {
    Localization.setLanguage(lan);
    AsyncStorage.setItem(types.SELECTED_APP_LANGUAGE, lan);
    onClose();
  }

  return (
    <Modal
      style={styles.parentView}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      hasBackdrop={true}
      isVisible={isModalVisible}>
      <View style={styles.modalParentView}>
        <Pressable
          onPress={() => onLanguageChange('de')}>
          <Text style={styles.appSubtitleLabelText}>DE</Text>
        </Pressable>
        <View style={styles.dividerStyle}></View>
        <Pressable
          onPress={() => onLanguageChange('en')}>
          <Text style={styles.appSubtitleLabelText}>EN</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default LanguageListModal;
