import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import { sessionActions } from '../../store/session/session.reducer'
import { sessionSelectors } from '../../store/session/session.selector';
import CustomHeader from '../../components/CustomHeader/CustomHeader';

import { Colors } from '../../constants/Colors';


const RegisterScreen = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);


  const { handleSubmit, control, errors, getValues } = useForm();

  interface submitDataInterface {
    username: string;
    password: string;
    confirmPassword?: string
  }

  const onSubmit = (data: submitDataInterface): void => {
    const signUpData = { ...data };
    delete signUpData['confirmPassword'];

    const formattedSignUpData = {
      signUpData: signUpData
    }

    dispatch(sessionActions.registerSaga(formattedSignUpData));
  };

  // const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formValues = getValues(['password', 'confirmPassword'])
  const accessToken = useSelector(sessionSelectors.accessToken)

  return (
    <ScrollView>
      <CustomHeader isHome={false} title="Register" />
      <View style={styles.inputStyle}>
        <Controller
          defaultValue=''
          name="username"
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="Nickname"
              value={value}
              onChangeText={(text) => onChange(text)}
              errorMessage={errors?.username?.message}
              errorProps={errors.username}
            />
          )}
          rules={{
            required: { value: true, message: 'Username is required' },
          }}

        />
        <Controller
          defaultValue=''
          name="password"
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="Password"
              value={value}
              secureTextEntry
              onChangeText={(text) => onChange(text)}
              errorMessage={errors?.password?.message}
              errorProps={errors.password}
            />
          )}
          rules={{
            required: { value: true, message: 'Password is required' },
          }}
        />
        <Controller
          defaultValue=''
          name="confirmPassword"
          control={control}
          render={({ onChange, value }) => (
            <Input
              placeholder="Confirm password"
              value={value}
              secureTextEntry
              onChangeText={(text) => onChange(text)}
              errorMessage={errors?.confirmPassword?.message}
              errorProps={errors.confirmPassword}
            />
          )}
          rules={{
            required: { value: true, message: 'Confirm password is required' },
            validate: (value) => formValues.confirmPassword === formValues.password || 'Passwords do not match'
          }}
        />
        <Button onPress={handleSubmit(onSubmit)} title="Submit" />
      </View>
      <View>
        <Text>
          {accessToken}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go to login"
          onPress={() => navigation.navigate('Login')}
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
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go adsadsadsa login"
          onPress={openDrawer}
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
          buttonStyle={styles.button}
          containerStyle={styles.containerButton}
          title="Go hello login"
          onPress={() => navigation.navigate('Hello')}
          icon={
            <Icon
              name="arrow-right"
              size={15}
              color="white"
              style={{ paddingRight: 10 }}
            />
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
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
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold'
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20
  }
});

export default RegisterScreen;
