import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import Home from './home';
import Chat from './chat';
import Notifications from './notifications';
import {darkColors} from '../../theme/colors';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import FloatingAddButton from '../../components/floatingAddButtton';
import {scale} from '../../theme/responsive';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...styles.tabBarStyle,
          paddingBottom: insets.bottom,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="home"
              size={scale(30)}
              color={focused ? darkColors.lightGreen : darkColors.white}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Feather
              name="message-square"
              size={scale(30)}
              color={focused ? darkColors.lightGreen : darkColors.white}
            />
          ),
        }}
        name="Chat"
        component={Chat}
      />

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
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Ionicons
              name="md-notifications-outline"
              size={scale(30)}
              color={focused ? darkColors.lightGreen : darkColors.white}
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
              color={focused ? darkColors.lightGreen : darkColors.white}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
