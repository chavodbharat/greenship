import React, {useMemo, useState} from 'react';
import styles from './styles';
import {Pressable, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';
import Modal from "react-native-modal";
import { CustomDateRangeModalTypePropsInterface } from './types';
import { TextInput } from "react-native-paper";
import { blockUser } from '../../redux/actions/memberAction';

const BlockUserModal = ({isModalVisible, onClose, blockUserId, onSuccessBlockUser}: CustomDateRangeModalTypePropsInterface) => {
  
  const dispatch = useDispatch();
  const [state, setState] = useState({
    blockReasons: '',
    isBlockReasonsError: false,
    loader: false,
  });

  const onSubmitPress = () => {
    if (state?.blockReasons === '') {
      setState(prev => ({...prev, isBlockReasonsError: true}));
    } else {
      callBlockUserFn();
    }
  }

  const callBlockUserFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      blocked_user: blockUserId,
      reason: state.blockReasons,
      action: 'block'
    }
    dispatch(
      blockUser(body, (res: any) => {
        if (res) {
          setState(prev => ({...prev, loader: false}));
          onSuccessBlockUser();
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  }

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
          <Text style={styles.appHeaderLabelText}>Block Member</Text>
        </View>
        <TextInput
          value={state.blockReasons}
          mode="outlined"
          label={'Block Reason'}
          activeOutlineColor={darkColors.communityGreenColor}
          outlineColor={darkColors.communityGreenColor}
          onChangeText={value => {
              setState(prev => ({
                  ...prev,
                  blockReasons: value,
                  isBlockReasonsError: false,
              }));
          }}
          style={[styles.txtInput,{marginTop: 0}]}
          placeholder="Block Reason"
          numberOfLines={5}
          multiline={true}
          placeholderTextColor={'gray'}
          autoCapitalize="none"
        />
        {state.isBlockReasonsError ? (
          <Text style={styles.error}>Please enter block reason</Text>
        ) : null}

        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={onSubmitPress} style={styles.updateBtnBackView}>
            <Text style={styles.btnLabel}>SUBMIT</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default BlockUserModal;
