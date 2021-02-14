import React from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import StartupScreen from '../screens/StartupScreen/StartupScreen';
import HelloScreen from '../screens/hello/Hello';
import ProductScreen from '../screens/product/Product';
import LoginScreen from '../screens/login/Login';
import RegisterScreen from '../screens/register/Register';

import MenuIcon from '../components/MenuIcon/MenuIcon'

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};


const DRawer = createDrawerNavigator()

function DRawerNavigation({ navigation }) {
  return (
    <DRawer.Navigator initialRouteName="HelloScreen">
      <DRawer.Screen name="Hello" component={HelloScreen} options={{
        title: "Hello Screen",
      }} />
      <DRawer.Screen name="Login" component={LoginScreen} options={{
        title: "Login Screen",
      }} />
      <DRawer.Screen name="Register" component={RegisterScreen} options={{
        title: "Register Screen",
      }} />
      <DRawer.Screen name="Product" component={ProductScreen} options={{
        title: "Product Screen"
      }} />
    </DRawer.Navigator>
  )
}

const StackApp = createStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <StackApp.Navigator>
        <StackApp.Screen name="StartupScreen" component={StartupScreen}
          options={{
            headerShown: false,
            title: 'Startup Page', //Set Header Title
            headerLeft: () => <MenuIcon />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }} />

        <StackApp.Screen name="Login" component={LoginScreen}
          options={{
            headerShown: false,
            title: 'Login Page', //Set Header Title
            headerLeft: () => <MenuIcon />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }} />

        <StackApp.Screen name="Register" component={RegisterScreen}
          options={{
            headerShown: false,
            title: 'Register Page', //Set Header Title
            headerLeft: () => <MenuIcon />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }} />

        <StackApp.Screen name="Hello" component={DRawerNavigation}
          options={{
            headerShown: false,
            title: 'Hello Page', //Set Header Title
            headerLeft: () => <MenuIcon />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }} />
      </StackApp.Navigator>
    </NavigationContainer >
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300
  },
});