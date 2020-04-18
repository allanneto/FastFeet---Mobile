import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import { store, persistor } from './store';

import App from './App';

export default function src() {
  const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: '#e8c141',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar backgroundColor="#320d6d" />
          <App />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}
