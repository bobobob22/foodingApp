import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { productsSelectors } from '../../store/products/products.selector';

import { mainNavigate, openDrawer } from '../../navigation/AppNavigator';

import { singleRoomSelector } from '../../store/products/products.selector'

const ProductSingle = (props) => {
  const navigation = useNavigation();

  const { productId } = props.route.params;

  const aaaa = useSelector(singleRoomSelector(productId));

  console.log('aaaa', aaaa)

  // console.log('dupa', dupa)

  // console.log('product single', JSON.stringify(productId, null, 2))

  const handlePress = () => {
    openDrawer()
  }

  return (
    <ScrollView style={styles.main}>
      <CustomHeader isHome={false} title="Products" isNotWithDrawer={true} />
      <View>
        <Text style={styles.mainTitle}>
          Product single
        </Text>
      </View>

      <Button title="btn" onPress={handlePress} />
 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 20,
    margin: 0,
    paddingVertical: 20,
    textAlign: "center",
  },
  column: {
    height: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flex: 1,
  },
  content: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    margin: 0,
    padding: 0,
  }
});

export default ProductSingle;
