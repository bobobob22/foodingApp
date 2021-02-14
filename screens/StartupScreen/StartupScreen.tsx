import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/Colors';
import { sessionSelectors } from '../../store/session/session.selector';
import { sessionActions } from '../../store/session/session.reducer';

const StartupScreen = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const accessToken = useSelector(sessionSelectors.accessToken)
  const isWebPlatform = Platform.OS === 'web';

  useEffect(() => {
    const tryLogin = async () => {
      let userData;

      if (isWebPlatform) {
        userData = await localStorage.getItem('userData');
      } else {
        userData = await AsyncStorage.getItem('userData');
      }
      if (!userData) {
        navigation.navigate('Login')
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;

      console.log("TOKEN", token);

      if (!token || expirationDate <= new Date()) {
        navigation.navigate('Login')
        return;
      }
      dispatch(sessionActions.validateSession(token))
      navigation.navigate('Hello')
    }
    tryLogin();
  }, [])

  return (
    <ScrollView>
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default StartupScreen;
