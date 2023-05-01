import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Image} from 'react-native';
import NavBar from '../../../components/navBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {resetPasswordReq} from '../../../redux/actions/authAction';
import {goBack, navigate} from '../../../routing/navigationRef';
import Spinner from '../../../components/spinner';
import { RESET_PASSWORD_OTP_VERIFICATION_SCREEN } from '../resetPasswordOtpVerification';
import { TextInput } from 'react-native-paper';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    userName: '',
    userNameError: false,
    loader: false,
  });

  const onSubmit = () => {
    if (state?.userName === '') {
      setState(prev => ({...prev, userNameError: true}));
    } else {
      callRestPasswordFn();
    }
  };

  const callRestPasswordFn = () => {
    setState(prev => ({...prev, loader: true}));

    let body = {
      user_email: state?.userName,
    };
    dispatch(
      resetPasswordReq(body, res => {
        setState(prev => ({...prev, loader: false}));
        if (res?.success) {
          navigate(RESET_PASSWORD_OTP_VERIFICATION_SCREEN.name, {email: state.userName})
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
          Please enter your email address or Username to
          <Text> reset your password</Text>
        </Text>
        <TextInput
          value={state.userName}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          mode="outlined"
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              userName: value,
              userNameError: false,
            }));
          }}
          style={styles.txtInput}
          placeholder="Username or E-mail"
          label="Username or E-mail"
          placeholderTextColor={darkColors.darkGrey}
          autoCapitalize="none"
        />

        {state.userNameError ? (
          <Text style={styles.error}>Please enter username/email</Text>
        ) : null}

        <View style={styles.btnView}>
          <Pressable onPress={onSubmit} style={styles.resetPasswordBtn}>
            <Text style={styles.btnLabel}>ResetPassword</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;
