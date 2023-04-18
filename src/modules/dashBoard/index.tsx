import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale, verticalScale} from '../../theme/responsive';
import SplashScreen from 'react-native-splash-screen';
import {fonts} from '../../theme/fonts';
import Home from './home';
import Chat from './chat';
import Search from './search';

const Tab = createBottomTabNavigator();

export default function App() {
  React.useEffect(() => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: verticalScale(10),
          paddingBottom: verticalScale(5),
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            // fontFamily: fonts.UrbanistRegular,
            fontSize: scale(14),
            fontWeight: '500',
            paddingTop: scale(5),
          },
          tabBarIcon: ({size, focused, color}) => {
            if (focused) {
              // return <HouseA />;
            } else {
              // return <House />;
            }
          },
        }}
        name="Home"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            // fontFamily: fonts.UrbanistRegular,
            fontSize: scale(14),
            fontWeight: '500',
            paddingTop: scale(5),
          },
          tabBarIcon: ({size, focused, color}) => {
            if (focused) {
              // return <VisitA />;
            } else {
              // return <Visit />;
            }
          },
        }}
        name="Chat"
        component={Chat}
      />

      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            // fontFamily: fonts.UrbanistRegular,
            fontSize: scale(14),
            fontWeight: '500',
            paddingTop: scale(5),
          },
          tabBarIcon: ({size, focused, color}) => {
            if (focused) {
              // return <Expense1 />;
            } else {
              // return <Expense0 />;
            }
          },
        }}
        name="Search"
        component={Search}
      />
    </Tab.Navigator>
  );
}
