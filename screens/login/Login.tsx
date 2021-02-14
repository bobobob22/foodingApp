import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import { sessionActions } from '../../store/session/session.reducer'
import { sessionSelectors } from '../../store/session/session.selector';
import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { AuthCredentialsDto } from '../../api/api'

import { Colors } from '../../constants/Colors';

const LoginScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors } = useForm();

  const onSubmit = (data: AuthCredentialsDto): void => {
    const formattedData = {
      signInData: data
    }
    dispatch(sessionActions.loginSaga(formattedData))
  };

  const accessToken = useSelector(sessionSelectors.accessToken)

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Login" isHome={false} />
      <ScrollView>
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
            title="Go to register"
            onPress={() => navigation.navigate('Register')}
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
            title="Go to product screen"
            onPress={() => navigation.navigate('Product')}
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
        <Text style={styles.price}>Login Screens</Text>
      </ScrollView>
    </SafeAreaView>
  );
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
