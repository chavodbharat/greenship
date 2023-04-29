import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from '../modules/dashBoard/home';
import Chat from '../modules/dashBoard/chat';
import Notifications from '../modules/dashBoard/notifications';
import {darkColors, lightColors} from '../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import FloatingAddButton from '../components/floatingAddButtton';
import {scale} from '../theme/responsive';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Emergency from '../modules/dashBoard/emergency';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {navigate} from './navigationRef';
import MyPetList, { MY_PET_LIST_SCREEN } from '../modules/pet/myPetList';
import PetPassportMenu, { PET_PASSPORT_MENU_SCREEN } from '../modules/pet/petPassport/petPassportMenu';
import PetVaccination, { PET_VACCINATION_SCREEN } from '../modules/pet/petPassport/petVaccination';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {types} from '../redux/ActionTypes';
import Profile from '../modules/dashBoard/profile';
import EditProfile from '../modules/dashBoard/profile/editProfile';
import AddPet, { ADD_PET_SCREEN } from '../modules/pet/addPet';
import AddAdditionalPetDetails, { ADD_ADDITIONAL_PET_DETAILS_SCREEN } from '../modules/pet/addPet/AddAdditionalPetDetails';
import VaccinationMenu, { VACCINATION_MENU_SCREEN } from '../modules/pet/petPassport/vaccinationMenu';

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
  animationEnabled: false,
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name={MY_PET_LIST_SCREEN.name} component={MyPetList} />
      <HomeStack.Screen name={PET_PASSPORT_MENU_SCREEN.name} component={PetPassportMenu} />
      <HomeStack.Screen name={PET_VACCINATION_SCREEN.name} component={PetVaccination} />
      <HomeStack.Screen name={ADD_PET_SCREEN.name} component={AddPet} />
      <HomeStack.Screen name={ADD_ADDITIONAL_PET_DETAILS_SCREEN.name} component={AddAdditionalPetDetails} />
      <HomeStack.Screen name={VACCINATION_MENU_SCREEN.name} component={VaccinationMenu} />
      <HomeStack.Screen name="Emergency" component={Emergency} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
    </HomeStack.Navigator>
  );
}

const TabNavigator = () => {
  const {auth} = useSelector(
    state => ({
      auth: state?.auth,
    }),
    shallowEqual,
  );
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  const logout = () => {
    AsyncStorage.clear();
    dispatch({type: types.UPDATE_SIGN_IN, payload: false});
    dispatch({
      type: types.LOGOUT_SUCCESS,
    });
    showMessage({
      message: 'Logout Successfully..!!',
      type: 'success',
    });
  };

  const tabBgColor = React.useMemo(() => {
    switch (auth?.activeModule) {
      case 0:
        return darkColors.listBackGradientThree;
      case 3:
        return lightColors.lightEmergencyBG;
      default:
        return darkColors.darkGreen;
    }
  }, [auth?.activeModule]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          paddingBottom: insets.bottom,
          backgroundColor: tabBgColor,
        },
      }}>
      <Tab.Screen
        listeners={() => ({
          tabPress: e => {
            // Your code here for when you press the tab
            navigate('Home');
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={scale(30)}
              color={focused ? darkColors.white : darkColors.white}
            />
          ),
        }}
        name="Home"
        component={HomeStackScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather
              name="message-square"
              size={scale(30)}
              color={focused ? darkColors.white : darkColors.white}
            />
          ),
        }}
        name="Chat"
        component={Chat}
      />

      {auth?.activeModule === 3 || auth.activeModule === 0 ? (
        <Tab.Screen
          name="FloatingBtn"
          component={() => null}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault(); // Prevents navigation
              // Your code here for when you press the tab
            },
          })}
          options={{
            headerShown: false,
            tabBarButton: () => <FloatingAddButton />,
          }}
        />
      ) : null}
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="md-notifications-outline"
              size={scale(30)}
              color={focused ? darkColors.white : darkColors.white}
            />
          ),
        }}
        name="Notifications"
        component={Notifications}
      />

      <Tab.Screen
        name="NavigationMenu"
        component={() => null}
        listeners={() => ({
          tabPress: e => {
            e.preventDefault(); // Prevents navigation
            logout();
            // Your code here for when you press the tab
          },
        })}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather
              name="menu"
              size={scale(30)}
              color={focused ? darkColors.white : darkColors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
