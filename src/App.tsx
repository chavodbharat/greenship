import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/configureStore';
import RootStack from './routing/RootStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <RootStack />
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
