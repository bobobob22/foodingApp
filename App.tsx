import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';

import AppNavigator, { RootNavigator } from './navigation/AppNavigator';
import { configureStore, AppStore } from './store/index'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [store, setStore] = useState<AppStore | null>(null);

  useEffect(() => {
    const getStore = async (): Promise<void> => {
      const storeToSet = await configureStore()
      setStore(storeToSet)
    }

    if (!store) {
      void getStore()
    }
  }, [])

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={console.warn}
      />
    );
  }

  if (!store) {
    return (
      <View>
        <Text>Waiting for store</Text>
      </View>
    )
  }

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
