import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList
} from '@react-navigation/drawer';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { useDispatch } from 'react-redux';


import LoginScreen, {
  screenOptions as loginScreenOptions
} from '../screens/login/Login';
import RegisterScreen, {
  screenOptions as registerScreenOptions
} from '../screens/register/Register';

// import AuthScreen from '../screens/user/AuthScreen';
// import StartupScreen from '../screens/StartupScreen';
import { Colors } from '../constants/Colors';
// import * as authActions from '../store/actions/auth';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: 'blue'
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Colors.primary
};

const LoginStackNavigator = createStackNavigator();

export const FoodNavigator = () => {
  return (
    <LoginStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <LoginStackNavigator.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={loginScreenOptions}
      />
      <LoginStackNavigator.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={registerScreenOptions}
      />
    </LoginStackNavigator.Navigator>
  );
};

const CreatedDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
  // const dispatch = useDispatch();

  return (
    <CreatedDrawerNavigator.Navigator
      drawerContent={props => {
        return (
          <View style={{ flex: 1, marginTop: 50 }}>
            <SafeAreaView>
              <DrawerItemList {...props} />
        
            </SafeAreaView>
          </View>
        );
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary
      }}
    >
      <CreatedDrawerNavigator.Screen
        name="Login"
        component={FoodNavigator}
        options={{
          headerTintColor: '#c2c2c2',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          drawerIcon: props => (
            <Ionicons
              name="md-cart"
              size={23}
              color={props.color}
            />
          )
        }}
      />
      <CreatedDrawerNavigator.Screen
        name="Register"
        component={FoodNavigator}
        options={{
          drawerIcon: props => (
            <Ionicons
              name="md-list"
              size={23}
              color={props.color}
            />
          )
        }}
      />
    </CreatedDrawerNavigator.Navigator>
  );
};