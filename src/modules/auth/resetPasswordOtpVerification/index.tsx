import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Image} from 'react-native';
import NavBar from '../../../components/navBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {verifyOtp} from '../../../redux/actions/authAction';
import {goBack, navigate} from '../../../routing/navigationRef';
import Spinner from '../../../components/spinner';
import { GENERATE_NEW_PASSWORD_SCREEN } from '../generateNewPassword';
import { TextInput } from 'react-native-paper';

export const RESET_PASSWORD_OTP_VERIFICATION_SCREEN = {
  name: 'ResetPasswordOtpVerification',
};

const ResetPasswordOtpVerification = ({route}: any) => {
  const dispatch = useDispatch();
  const { email } = route.params;
  const [state, setState] = useState({
    verificationCode: '',
    verificationCodeError: false,
    loader: false,
  });

  const onSubmit = () => {
    if (state?.verificationCode === '') {
      setState(prev => ({...prev, verificationCodeError: true}));
    } else {
      callOtpVerificationFn();
    }
  };

  const callOtpVerificationFn = () => {
    setState(prev => ({...prev, loader: true}));

    let body = {
      user_email: email,
      code: state?.verificationCode,
    };
  
    dispatch(
      verifyOtp(body, res => {
        setState(prev => ({...prev, loader: false}));
        if (res?.success) {
          navigate(GENERATE_NEW_PASSWORD_SCREEN.name, {email, verificationCode: state.verificationCode});
        }
      }),
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <NavBar />
      <Spinner visible={state?.loader} />
      <View style={styles.wrapper}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../../assets/images/ic_app_landscape_logo.png')}
        />
        <Text style={styles.desc}>
        Enter the verification code that was sent to your email
        </Text>
        <TextInput
          value={state.verificationCode}
          maxLength={4}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          mode="outlined"
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              verificationCode: value,
              verificationCodeError: false,
            }));
          }}
          style={styles.txtInput}
          keyboardType={'number-pad'}
          placeholder="Enter Verification Code"
          label="Enter Verification Code"
          placeholderTextColor={darkColors.darkGrey}
          autoCapitalize="none"
        />

        {state.verificationCodeError ? (
          <Text style={styles.error}>Please enter verification code</Text>
        ) : null}

        <View style={styles.btnView}>
          <Pressable onPress={onSubmit} style={styles.resetPasswordBtn}>
            <Text style={styles.btnLabel}>Verify</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordOtpVerification;
