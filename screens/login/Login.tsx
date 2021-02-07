import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoIcon from 'react-native-vector-icons/Ionicons';

import { useForm, Controller } from 'react-hook-form';

import { Input } from 'react-native-elements';

import { Colors } from '../../constants/Colors';
import { chatActions } from '../../store/chat/chat.reducer';
import { chatSelectors } from '../../store/chat/chat.selector';


const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const dispatchFirstAction = () => {
    dispatch(chatActions.addMessageSaga('ala ma kota2'))
  }

  const chatMessage = useSelector(chatSelectors.userMessage);

  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    console.log(data, 'data');
  };

  return (
    <ScrollView>
      <View style={styles.inputStyle}>
        <Controller
          name="name"
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="name"
              value={value}
              onChangeText={(text) => onChange(text)}
            />
          )}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Submit" />
      </View>
      <View style={styles.actions}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go to register"
          onPress={() => props.navigation.push('RegisterScreen')}
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
              style={{ paddingRight: 10 }}
            />
          }
        />

        <Button
          title="try store"
          onPress={dispatchFirstAction}
        />

        <Text>Store: {chatMessage}</Text>
      </View>
      <Text style={styles.price}>Login Screen</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Login',
    headerLeft: () => (
      <IoIcon.Button
        name="menu"
        size={25}
        backgroundColor="#009387"
        onPress={() => navData.navigation.openDrawer()}
      >
      </IoIcon.Button>
    )
  };
};

const styles = StyleSheet.create({
  inputStyle: {
    padding: 20,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    paddingTop: 60,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',

  },
  button: {
    backgroundColor: 'red',

  },
  containerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'red',
    backgroundColor: 'red',
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default LoginScreen;
