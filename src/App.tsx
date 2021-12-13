import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {Provider} from 'react-redux';
import {AppNavigator} from './navigation/AppNavigator';
import {store} from './store/store';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};
