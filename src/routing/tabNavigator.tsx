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
import {shallowEqual, useSelector} from 'react-redux';
import {navigate} from './navigationRef';
import MyPetList, { MY_PET_LIST_SCREEN } from '../modules/pet/myPetList';
import PetPassportMenu, { PET_PASSPORT_MENU_SCREEN } from '../modules/pet/petPassport/petPassportMenu';

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

  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

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
