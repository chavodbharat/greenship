import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Image} from 'react-native';
import NavBar from '../../../components/navBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../../../theme/colors';
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../../redux/actions/authAction';
import {replace} from '../../../routing/navigationRef';
import Spinner from '../../../components/spinner';
import { TextInput } from 'react-native-paper';

export const GENERATE_NEW_PASSWORD_SCREEN = {
  name: 'GenerateNewPassword',
};

const GenerateNewPassword = ({route}: any) => {
  const dispatch = useDispatch();
  const { email, verificationCode } = route.params;
  const [state, setState] = useState({
    newPassword: '',
    newPasswordError: false,
    confirmPassword: '',
    confirmPasswordError: false,
    passwordAndConfirmPasswordMatch: true,
    loader: false,
    hideNewPassword: true,
    hideConfirmPassword: true
  });

  const onSubmit = () => {
    if (state?.newPassword === '') {
      setState(prev => ({...prev, newPasswordError: true, passwordAndConfirmPasswordMatch: true}));
    } else if (state?.confirmPassword === '') {
      setState(prev => ({...prev, confirmPasswordError: true, passwordAndConfirmPasswordMatch: true}));
    } else if(state?.newPassword != state?.confirmPassword){
      setState(prev => ({...prev, passwordAndConfirmPasswordMatch: false}));
    } else {
      callNewPasswordFn();
    }
  };

  const callNewPasswordFn = () => {
    setState(prev => ({...prev, loader: true, confirmPasswordError: false, 
      newPasswordError: false, passwordAndConfirmPasswordMatch: true}));

    let body = {
      user_email: email,
      code: verificationCode,
      password: state.newPassword
    };
  
    dispatch(
      setNewPassword(body, res => {
        setState(prev => ({...prev, loader: false}));
        if (res?.success) {
          replace('Login');
        }
      }),
    );
  };

  const showHidePassword = (index: number) => {
    if(index == 0) 
      setState(prev => ({...prev, hideNewPassword: !state.hideNewPassword}));
    else   
      setState(prev => ({...prev, hideConfirmPassword: !state.hideConfirmPassword}));
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
        Enter the new password for your login
        </Text>
        <TextInput
          value={state.newPassword}
          mode="outlined"
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              newPassword: value,
              newPasswordError: false,
              passwordAndConfirmPasswordMatch: true
            }));
          }}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          style={styles.txtInput}
          placeholder="New Password"
          label="New Password"
          secureTextEntry={state?.hideNewPassword}
          placeholderTextColor={darkColors.darkGrey}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={state.hideNewPassword ? 'eye-off' : 'eye'}
              onPress={() => showHidePassword(0)}
            />
          }
        />

        {state.newPasswordError ? (
          <Text style={styles.error}>Please enter new password</Text>
        ) : null}

        <TextInput
          value={state.confirmPassword}
          mode="outlined"
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              confirmPassword: value,
              confirmPasswordError: false,
              passwordAndConfirmPasswordMatch: true
            }));
          }}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          style={styles.txtInput}
          placeholder="Confirm Password"
          label="Confirm Password"
          secureTextEntry={state?.hideConfirmPassword}
          placeholderTextColor={darkColors.darkGrey}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              icon={state.hideConfirmPassword ? 'eye-off' : 'eye'}
              onPress={() => showHidePassword(1)}
            />
          }
        />

        {state.confirmPasswordError ? (
          <Text style={styles.error}>Please enter new confirm password</Text>
        ) : null}

        {!state.passwordAndConfirmPasswordMatch ? (
          <Text style={styles.error}>Password and Confirm password does not matched</Text>
        ) : null}

        <View style={styles.btnView}>
          <Pressable onPress={onSubmit} style={styles.resetPasswordBtn}>
            <Text style={styles.btnLabel}>Update Password</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GenerateNewPassword;
