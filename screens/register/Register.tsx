import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Colors } from '../../constants/Colors';
// import * as cartActions from '../../store/actions/cart';

const RegisterScreen = (props) => {
  // const productId = props.navigation.getParam('productId');
  // const selectedProduct = useSelector(state =>
  //   state.products.availableProducts.find(prod => prod.id === productId)
  // );
  // const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Go to login"
          onPress={() => props.navigation.push('LoginScreen')}
        />
      </View>
      <Text style={styles.price}>Register Screen</Text>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Register'
    // headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center'
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
