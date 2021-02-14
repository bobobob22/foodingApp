import React, { useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StackHeaderLeftButtonProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import MenuIcon from '../../components/MenuIcon/MenuIcon'

const TestScreen = (props) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props: StackHeaderLeftButtonProps) => (<MenuIcon />)
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text>Test screen !</Text>
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

export default TestScreen;
