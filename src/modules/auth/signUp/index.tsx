import React, {useState} from 'react';
import styles from './styles';
import {View, Text, Pressable, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {replace} from '../../../routing/navigationRef';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../redux/actions/authAction';
import Spinner from '../../../components/spinner';
import {TextInput} from 'react-native-paper';
import {darkColors} from '../../../theme/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SelectDropdown from 'react-native-select-dropdown';

const userType = ['Vetenerian', 'Zoo', 'Animal Lover', 'Breeder'];
const SignUp = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    hidePassword: true,
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    passwordError: false,
    firstNameError: false,
    lastNameError: false,
    confirmPasswordError: false,
    confirmPassword: '',
    loader: false,
    userNameError: false,
    emailError: false,
    userType: '',
    userTypeError: false,
    passwordNoMatch: false,
  });

  const showHidePassword = () => {
    setState(prev => ({...prev, hidePassword: !state.hidePassword}));
  };

  const validateEmail = email => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const onSubmit = () => {
    if (state?.firstName === '') {
      setState(prev => ({...prev, firstNameError: true}));
    } else if (state?.lastName === '') {
      setState(prev => ({...prev, lastNameError: true}));
    } else if (state.userType === '') {
      setState(prev => ({...prev, userTypeError: true}));
    } else if (state.userName === '') {
      setState(prev => ({...prev, userNameError: true}));
    } else if (state.email === '' || !validateEmail(state?.email)) {
      setState(prev => ({...prev, emailError: true}));
    } else if (state.password === '') {
      setState(prev => ({...prev, passwordError: true}));
    } else if (state.confirmPassword === '') {
      setState(prev => ({...prev, confirmPasswordError: true}));
    } else if (
      state.password !== state.confirmPassword &&
      state.confirmPassword !== '' &&
      state.password !== ''
    ) {
      setState(prev => ({...prev, passwordNoMatch: true}));
    } else {
      callRegisterFn();
    }
  };

  const callRegisterFn = () => {
    setState(prev => ({...prev, loader: true}));
    let body = {
      user_login: state.userName,
      user_email: state.email,
      password: state.password,
      user_name: `${state.firstName} ${state.lastName}`,
      context: 'edit',
    };
    dispatch(
      registerUser(body, res => {
        if (res[0]?.id) {
          replace('Login');
        }
        setState(prev => ({...prev, loader: false}));
      }),
    );
  };
  return (
    <SafeAreaView style={styles.main}>
      <Spinner visible={state?.loader} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps={true}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="contain"
            style={styles.img}
            source={require('../../../assets/images/ic_app_landscape_logo.png')}
          />
          <TextInput
            value={state.firstName}
            mode="outlined"
            label={'First Name'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setState(prev => ({
                ...prev,
                firstName: value,
                firstNameError: false,
              }));
            }}
            style={styles.txtInput}
            placeholder="First Name"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />

          {state.firstNameError ? (
            <Text style={styles.error}>Please enter first name</Text>
          ) : null}

          <TextInput
            value={state.lastName}
            mode="outlined"
            label={'Last Name'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setState(prev => ({
                ...prev,
                lastName: value,
                lastNameError: false,
              }));
            }}
            style={styles.txtInput1}
            placeholder="Last Name"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />

          {state.lastNameError ? (
            <Text style={styles.error}>Please enter last name</Text>
          ) : null}

          <SelectDropdown
            data={userType}
            onSelect={selectedItem => {
              setState(prev => ({
                ...prev,
                userType: selectedItem,
                userTypeError: false,
              }));
            }}
            buttonStyle={styles.dropDown}
            // renderDropdownIcon={isOpened => {
            //   return <ArrowDown paddingRight={scale(27)} />;
            // }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View style={styles.dropDownBtnWrapper}>
                  <Text style={styles.dropDownPlaceHolder}>
                    {selectedItem || 'Select a profile type'}
                  </Text>
                </View>
              );
            }}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />

          {state.userTypeError ? (
            <Text style={styles.error}>Please select profile Type</Text>
          ) : null}

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
            style={styles.txtInput1}
            placeholder="Username"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />

          {state.userNameError ? (
            <Text style={styles.error}>Please enter username</Text>
          ) : null}

          <TextInput
            value={state.email}
            mode="outlined"
            label={'Email'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setState(prev => ({
                ...prev,
                email: value,
                emailError: false,
              }));
            }}
            style={styles.txtInput1}
            placeholder="Username"
            placeholderTextColor={'gray'}
            autoCapitalize="none"
          />
          {state.emailError ? (
            <Text style={styles.error}>Please enter valid email id</Text>
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
                passwordNoMatch: false,
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

          <TextInput
            value={state.confirmPassword}
            mode="outlined"
            label={'Confirm Password'}
            activeOutlineColor={darkColors.darkGreen}
            outlineColor={darkColors.darkGreen}
            onChangeText={value => {
              setState(prev => ({
                ...prev,
                confirmPassword: value,
                confirmPasswordError: false,
                passwordNoMatch: false,
              }));
            }}
            autoCapitalize="none"
            style={styles.txtInput1}
            placeholder="Confirm Password"
            secureTextEntry={state?.hidePassword}
            right={
              <TextInput.Icon
                icon={state.hidePassword ? 'eye-off' : 'eye'}
                onPress={showHidePassword}
              />
            }
          />

          {state.confirmPasswordError ? (
            <Text style={styles.error}>Please re-enter password</Text>
          ) : null}
          {state.passwordNoMatch ? (
            <Text style={styles.error}>Both password does not match </Text>
          ) : null}

          <Pressable onPress={onSubmit} style={styles.loginBtn}>
            <Text style={styles.btnLabel}>REGISTER</Text>
          </Pressable>

          <Text style={styles.noAccount}>
            Already have an account?
            <Text
              onPress={() => {
                replace('Login');
              }}
              style={styles.signUp}>
              {' '}
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
