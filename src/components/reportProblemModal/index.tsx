import React, {useMemo, useState} from 'react';
import styles from './styles';
import {Image, Pressable, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {darkColors} from '../../theme/colors';
import Modal from "react-native-modal";
import { ReportProblemModalTypePropsInterface } from './types';
import { TextInput } from "react-native-paper";
import AllImages from '../../utils/Constants/AllImages';
import { useTheme } from '../../providers/ThemeProvider';
import ActionSheetModal from 'react-native-modal';
import ActionSheet from '../actionSheet';
import { getAllStaticReportProblemOptions } from '../../utils/Constants/AllConstance';
import { scale, verticalScale } from '../../theme/responsive';
import { sendReportProblem } from '../../redux/actions/memberAction';
import Spinner from '../spinner';

const ReportProblemModal = ({isModalVisible, onClose, reportUserId, onSuccessReportProblem,
  reportProblemSubmitStatus}: ReportProblemModalTypePropsInterface) => {
  
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const [state, setState] = useState({
    problemDesc: '',
    problemDescError: false,
    loader: false,
    selectedSubject: "Select Subject",
    subjectError: false,
    isActionSheetShow: false
  });

  const allProblemType = getAllStaticReportProblemOptions();

  const onSubmitPress = () => {
    if(state.selectedSubject === 'Select Subject'){
      setState(prev => ({...prev, subjectError: true}));
    } else if (state?.problemDesc === '') {
      setState(prev => ({...prev, problemDescError: true}));
    } else {
      callReportProblemFn();
    }
  }

  const callReportProblemFn = () => {
    setState(prev => ({...prev, loader: true}));
    const body = {
      report_user_id: reportUserId,
      category: state.selectedSubject,
      description: state.problemDesc
    }
    dispatch(
      sendReportProblem(body, (res: any) => {
        if (res) {
          setState(prev => ({...prev, loader: false}));
          onSuccessReportProblem();
        } else {
          setState(prev => ({...prev, loader: false}));
        }
      }),
    );
  }

  const clickOnActionSheetOption = async (index: number) => {
    setState(prev => ({...prev,  selectedSubject: allProblemType[index].title, isActionSheetShow: false}));
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
      <Spinner visible={state?.loader} color={colors.communityGreenColor} />
      <View style={styles.modalParentView}>
        <View style={styles.modalHeaderBackView}>
          <Text style={styles.appHeaderLabelText}>Report Account</Text>
        </View>
        {reportProblemSubmitStatus ?
          <>
            <Pressable
              onPress={() => setState(prev => ({...prev, isActionSheetShow: true}))}>
              <View style={[styles.textInputCustomStyle,{flexDirection: 'row'}]}>
                <View style={styles.flexOne}>
                  <Text style={[styles.dropdownLabelStyle, state.selectedSubject!="Select Subject" &&
                    {color: colors.black}]}>{state.selectedSubject}</Text>
                </View>
                <View style={styles.flexZero}>
                  <Image
                    style={styles.dropDownIconStyle}
                    source={AllImages.dropdownIcon}/>
                </View>
              </View>
            </Pressable>
            {state.subjectError ? (
              <Text style={[styles.error,{marginBottom: verticalScale(20), 
                marginTop: verticalScale(-20), }]}>Please select any subject of problem</Text>
            ) : null}
            <TextInput
              value={state.problemDesc}
              mode="outlined"
              label={'Please let us know more about that!'}
              activeOutlineColor={darkColors.communityGreenColor}
              outlineColor={darkColors.communityGreenColor}
              onChangeText={value => {
                  setState(prev => ({
                      ...prev,
                      problemDesc: value,
                      problemDescError: false,
                  }));
              }}
              style={[styles.txtInput,{marginTop: 0}]}
              placeholder="Problem Description"
              numberOfLines={5}
              multiline={true}
              placeholderTextColor={'gray'}
              autoCapitalize="none"
            />
            {state.problemDescError ? (
              <Text style={styles.error}>Please enter problem description</Text>
            ) : null}

            <View style={{flexDirection: 'row'}}>
              <Pressable onPress={onSubmitPress} style={styles.updateBtnBackView}>
                <Text style={styles.btnLabel}>SUBMIT</Text>
              </Pressable>
            </View>
          </>
          :
          <View style={{margin: scale(20)}}>
            <Text style={styles.reportSubmittedLabelStyle}>You already submitted report for this user</Text>
          </View>
        }
        <ActionSheetModal
          isVisible={state.isActionSheetShow}
          style={styles.actionModalStyle}>
          <ActionSheet
            actionSheetItems={allProblemType}
            onCancelPress={() => setState(prev => ({...prev, isActionSheetShow: false}))}
            onPressItem={clickOnActionSheetOption}
          />
        </ActionSheetModal>
      </View>
    </Modal>
  );
};

export default ReportProblemModal;
