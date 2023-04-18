import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../modules/auth';
import DashBoard from '../modules/dashBoard';
import {navigationRef} from './navigationRef';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {types} from '../redux/ActionTypes';
import SignUp from '../modules/auth/signUp';
import Login from '../modules/auth/login';
import ResetPassword from '../modules/auth/resetPassword';
import Emergency from '../modules/dashBoard/emergency';
const HomeStack = createStackNavigator();
const AuthStack = createStackNavigator();

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
        <HomeStack.Navigator
          screenOptions={screenOptions}
          initialRouteName="DashBoard">
          <HomeStack.Screen name="DashBoard" component={DashBoard} />
          <HomeStack.Screen name="Emergency" component={Emergency} />
        </HomeStack.Navigator>
      ) : (
        <AuthStack.Navigator
          screenOptions={screenOptions}
          initialRouteName={'Welcome'}>
          <AuthStack.Screen name="Welcome" component={Welcome} />
          <AuthStack.Screen name="SignUp" component={SignUp} />
          <AuthStack.Screen name="Login" component={Login} />
          <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
