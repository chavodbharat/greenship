import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/configureStore';
import RootStack from './routing/RootStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import * as PubNubKeys from '../PubNubKeys.js'
import DeviceInfo from 'react-native-device-info'

import PubNub from 'pubnub'
import { PubNubProvider } from 'pubnub-react'

//  Create PubNub configuration and instantiate the PubNub object, used to communicate with PubNub
const pubnub = new PubNub({
  subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
  publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
  uuid: 'GreenSheepApp',
})

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <PubNubProvider client={pubnub}>
            <RootStack />
          </PubNubProvider>
          <FlashMessage
            position="top"
            animated={true}
            duration={1000}
          // GLOBAL FLASH MESSAGE COMPONENT INSTANCE {"success" (green), "warning" (orange), "danger" (red), "info" (blue) and "default" (gray)}
          />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
