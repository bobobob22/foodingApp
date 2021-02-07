import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';


import { FoodNavigator, DrawerNavigator }  from './FoodNavigator';

const AppNavigator = (props) => {
  // const isAuth = useSelector(state => !!state.auth.token);

  return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>

  );
};

export default AppNavigator;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300
  },
});