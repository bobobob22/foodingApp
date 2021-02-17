import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, Icon } from 'react-native-elements'

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { productsSelectors } from '../../store/products/products.selector';
import { productsActions } from '../../store/products/products.reducer';


const ProductsList = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.products);

  useEffect(() => {
    if (!products) {
      dispatch(productsActions.fetchAllProducts())
    }
  }, [dispatch, products])


  if (products && products.length > 0) {
    console.log("there is no products")
  }

  const handleProductClick = (id: string) => {
    console.log("ID", id)
    navigation.navigate('ProductSingle', {
      productId: id,
    })
  }

  return (
    <ScrollView style={styles.main}>
      <CustomHeader isHome={false} title="Products" />
      <View>
        <Text style={styles.mainTitle}>
          Products lists
        </Text>
      </View>
      <View>
        {products && products.length > 0 && products.map((product, i) => (
          <TouchableOpacity key={product.id} onPress={() => handleProductClick(product.id.toString())}>
            <ListItem bottomDivider style={styles.column}>
              <ListItem.Content style={styles.content}>
                <ListItem.Title style={styles.title}>{product.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>

        ))
        }
      </View>
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

export default ProductsList;
