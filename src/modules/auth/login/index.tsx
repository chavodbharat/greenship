import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {navigate, replace} from '../../../routing/navigationRef';
import {useDispatch} from 'react-redux';
import {loginUserReq} from '../../../redux/actions/authAction';
import Spinner from '../../../components/spinner';
import {TextInput} from 'react-native-paper';
import {darkColors} from '../../../theme/colors';
import NavBar from '../../../components/navBar';

const Login = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    hidePassword: true,
    userName: '',
    password: '',
    userNameError: false,
    passwordError: false,
    loader: false,
  });

  const showHidePassword = () => {
    setState(prev => ({...prev, hidePassword: !state.hidePassword}));
  };

  const onSubmit = () => {
    if (state?.userName === '') {
      setState(prev => ({...prev, userNameError: true}));
    } else if (state?.password === '') {
      setState(prev => ({...prev, passwordError: true}));
    } else {
      callLoginFn();
    }
  };

  const callLoginFn = () => {
    setState(prev => ({...prev, loader: true}));

    let body = {
      username: state?.userName,
      password: state?.password,
    };
    dispatch(
      loginUserReq(body, res => {
        setState(prev => ({...prev, loader: false}));
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
        <TextInput
          value={state.userName}
          mode="outlined"
          label={'Username'}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              userName: value,
              userNameError: false,
            }));
          }}
          style={styles.txtInput}
          placeholder="Username"
          placeholderTextColor={'gray'}
          autoCapitalize="none"
        />

        {state.userNameError ? (
          <Text style={styles.error}>Please enter username</Text>
        ) : null}

        <TextInput
          value={state.password}
          mode="outlined"
          label={'Password'}
          activeOutlineColor={darkColors.darkGreen}
          outlineColor={darkColors.darkGreen}
          onChangeText={value => {
            setState(prev => ({
              ...prev,
              password: value,
              passwordError: false,
            }));
          }}
          autoCapitalize="none"
          style={styles.txtInput1}
          placeholder="Password"
          secureTextEntry={state?.hidePassword}
          right={
            <TextInput.Icon
              icon={state.hidePassword ? 'eye-off' : 'eye'}
              onPress={showHidePassword}
            />
          }
        />

        {state.passwordError ? (
          <Text style={styles.error}>Please enter password</Text>
        ) : null}
        <Pressable
          onPress={() => {
            navigate('ResetPassword');
          }}
          style={styles.linkBtn}>
          <Text style={styles.link}>Forgot Password?</Text>
        </Pressable>

        <Pressable onPress={onSubmit} style={styles.loginBtn}>
          <Text style={styles.btnLabel}>LOGIN</Text>
        </Pressable>

        <Text style={styles.noAccount}>
          Don't have an account?
          <Text
            onPress={() => {
              replace('SignUp');
            }}
            style={styles.signUp}>
            {' '}
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
