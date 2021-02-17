import React, { useRef } from 'react';
import { StyleSheet } from 'react-native'
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import StartupScreen from '../screens/StartupScreen/StartupScreen';
import HelloScreen from '../screens/hello/Hello';
import ProductScreen from '../screens/product/Product';
import LoginScreen from '../screens/login/Login';
import RegisterScreen from '../screens/register/Register';
import ProductsLists from '../screens/ProductList/ProductsList'
import ProductSingle from '../screens/ProductSingle/ProductSingle';

import MenuIcon from '../components/MenuIcon/MenuIcon'

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

const navigationRef = React.createRef<any>();

export function openDrawer() {
  if (navigationRef && navigationRef.current) {
    console.log("DSDSDS")
    navigationRef.current && navigationRef.current.dispatch(DrawerActions.openDrawer());
  }
}

export function mainNavigate(name: any, params: any) {
  if (navigationRef && navigationRef.current) {
    navigationRef.current && navigationRef.current.navigate(name, params);
  }
}


// function openDrawer(routeName, params) {
//   _navigator.dispatch(DrawerActions.openDrawer());
// }

const DRawer = createDrawerNavigator();

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
      <DRawer.Screen name="ProductsList" component={ProductsLists} options={{
        title: "Product  List"
      }} />
    </DRawer.Navigator>
  )
}

const StackApp = createStackNavigator();

export function RootNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StackApp.Navigator mode="card">



        <StackApp.Screen name="StartupScreen" component={StartupScreen}
          options={({ navigation }) => ({


            headerShown: false,
            title: 'Startup Page', //Set Header Title
            headerLeft: () => <MenuIcon navigation={navigation} />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          })} />

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

        <StackApp.Screen
          name="ProductSingle"
          component={ProductSingle}
          options={({ navigation }) => ({
            headerShown: false,
            title: 'Product Page', //Set Header Title
            headerLeft: () => <MenuIcon navigation={navigation} />,
            headerStyle: {
              backgroundColor: '#fff', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          })} />

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