import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../modules/auth';
import TabNavigator from './tabNavigator';
import {navigationRef} from './navigationRef';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {types} from '../redux/ActionTypes';
import SignUp from '../modules/auth/signUp';
import Login from '../modules/auth/login';
import ResetPassword from '../modules/auth/resetPassword';
import ResetPasswordOtpVerification, {
  RESET_PASSWORD_OTP_VERIFICATION_SCREEN,
} from '../modules/auth/resetPasswordOtpVerification';
import GenerateNewPassword, {
  GENERATE_NEW_PASSWORD_SCREEN,
} from '../modules/auth/generateNewPassword';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/customDrawer';

const DashBoardStack = createStackNavigator();
const AuthStack = createStackNavigator();

const Drawer = createDrawerNavigator();

export default function RootStack() {
  const dispatch = useDispatch();

  const {signedIn} = useSelector(
    state => ({
      signedIn: state.auth.signedIn,
    }),
    shallowEqual,
  );

  const getData = async () => {
    let token = await AsyncStorage.getItem('token');

    if (token) {
      dispatch({
        type: types.UPDATE_SIGN_IN,
        payload: true,
      });
    } else {
      dispatch({
        type: types.UPDATE_SIGN_IN,
        payload: false,
      });
    }
  };

  useEffect(() => {
    getData();
  }, [signedIn]);

  if (signedIn == null) {
    return null;
  }

  const screenOptions = {
    gestureEnabled: false,
    headerShown: false,
    animationEnabled: false,
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {signedIn ? (
        <Drawer.Navigator
          screenOptions={{
            drawerPosition: 'right',
            headerShown: false,
            swipeEnabled: false,
          }}
          initialRouteName="TabNavigator"
          drawerContent={props => <CustomDrawer {...props} />}>
          <DashBoardStack.Screen name="TabNavigator" component={TabNavigator} />
        </Drawer.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={screenOptions}
          initialRouteName={'Welcome'}>
          <AuthStack.Screen name="Welcome" component={Welcome} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
          <AuthStack.Screen
            name={RESET_PASSWORD_OTP_VERIFICATION_SCREEN.name}
            component={ResetPasswordOtpVerification}
          />
          <AuthStack.Screen
            name={GENERATE_NEW_PASSWORD_SCREEN.name}
            component={GenerateNewPassword}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
