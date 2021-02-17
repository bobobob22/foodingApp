import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { enableScreens } from 'react-native-screens';

import { RootNavigator } from './navigation/AppNavigator';
import { configureStore, AppStore } from './store/index'

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


// Notifications.setNotificationHandler({
//   handleNotification: async () => {
//     return {
//       shouldShowAlert: true,
//     };
//   },
// });


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [store, setStore] = useState<AppStore | null>(null);

  const temp = null
  enableScreens()

  useEffect(() => {

    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((statusObj) => {
        console.log('a')
        if (statusObj.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return statusObj;
      })
      .then((statusObj) => {
        console.log('b')
        if (statusObj.status !== 'granted') {
          throw new Error('permission not granted');
        }
      })
      .then((data) => {
        return Notifications.getExpoPushTokenAsync();
   
      })
      .then((data) => {
        console.log("@@@")
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
        return null
      })
  }, []);


  useEffect(() => {
    const getStore = async (): Promise<void> => {
      const storeToSet = await configureStore()
      setStore(storeToSet)
    }

    if (!store) {
      void getStore()
    }
  }, [])

  useEffect(() => {
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('backgroundSubscription', response);
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('notification', notification);
      }
    );

    return () => {
      backgroundSubscription.remove();
      foregroundSubscription.remove();
    };
  }, []);


  const triggerNotificationsHandler = (): void => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'ddddd',
        body: 'dasdsa'
      },
      trigger: {
        seconds: 10,
      }
    })
  }

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
      <View style={{margin: 30}}>
        <Text>Waiting for store</Text>
        <Button title="notify" onPress={triggerNotificationsHandler} />
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
