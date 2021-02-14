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
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import IoIcon from 'react-native-vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PermissionStatus, PermissionResponse } from 'expo-permissions'

import CustomHeader from '../../components/CustomHeader/CustomHeader';
import { sessionSelectors } from '../../store/session/session.selector';
import { productsActions } from '../../store/products/products.reducer';
import { CreateProductDto } from '../../api/api'

import { Colors } from '../../constants/Colors';


type Product = {
  name?: string,
  image?: string,
  quantity?: string,
  fat?: string,
  protein?: string,
  carbohydrates?: string,
  weight?: string,
}

const ProductScreen = (props) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({});
  const [openBarcodeScanner, setOpenBarcodeScanner] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { handleSubmit, control, errors, setValue } = useForm();
  const accessToken = useSelector(sessionSelectors.accessToken);

  const onSubmit = (data: CreateProductDto): void => {
    dispatch(productsActions.addNewProductSaga(data))
  };

  const isWebPlatform = Platform.OS === 'web';

  const getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if (status === 'granted') {
      setHasCameraPermission(true)
    }
  };

  useEffect(() => {
    if (!isWebPlatform) {
      getPermissionsAsync()
    }
  }, [])

  useEffect(() => {
    (async () => {
      if (!isWebPlatform) {
        const permissionResponse = await BarCodeScanner.requestPermissionsAsync() as PermissionResponse;
        const { status } = permissionResponse;

        if (status === PermissionStatus.GRANTED) {
          setHasPermission(true);
        }
      }
    })();
  }, []);

  const handleBarCodeScanned = async (response: any) => {
    const apiEndpoint = 'https://world.openfoodfacts.org/api/v0/product';
    const barcode = response.data
    const newRes = await fetch(`${apiEndpoint}/${barcode}.json`)
    const resData = await newRes.json();

    console.log('res', resData)

    if (resData.status == 0) {
      Alert.alert('Not found product', 'Product not found, press manually')
      setScanned(true);
      setOpenBarcodeScanner(false);
      return;
    }
    const { product: { product_name, image_url, nutriments, serving_size } } = resData;

    const { fat, proteins, carbohydrates_value } = nutriments;

    const name = product_name;
    const image = image_url;
    // const formattedQuantity = quantity?.toString().replace(/\D/g,'');
    const formattedFat = fat?.toString().replace(/\D/g,'');
    const formattedProtein = proteins?.toString().replace(/\D/g,'');
    const formattedCarbohydrates = carbohydrates_value?.toString().replace(/\D/g,'');
    const formattedWeight = serving_size?.toString().replace(/\D/g,'');

    const newProduct = {
      name: product_name,
      image: image,
      // quantity: formattedQuantity,
      fat: formattedFat,
      protein: formattedProtein,
      carbohydrates: formattedCarbohydrates,
      weight: formattedWeight,
    };

    setValue('name', name);
    setValue('image', image);
    // setValue('quantity', formattedQuantity);
    setValue('fat', formattedFat);
    setValue('protein', formattedProtein);
    setValue('carbohydrates', formattedCarbohydrates);
    setValue('weight', formattedWeight);

    setScanned(true);
    setOpenBarcodeScanner(false);
    setNewProduct(newProduct);
  };

  const toggleOpenScanner = () => {
    setScanned(false);
    setOpenBarcodeScanner(() => !openBarcodeScanner);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ScrollView style={styles.main}>
      <CustomHeader isHome={false} title="Product" />
      {!isWebPlatform && (
        <View>
          <View >
            {!hasCameraPermission && (
              <View>
                <Text>There is no camera permission</Text>
              </View>
            )}
            <View style={openBarcodeScanner || scanned ? styles.hidden : styles.barcodeScanner}>
              <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
              />
            </View>
            <Button onPress={toggleOpenScanner} title={!openBarcodeScanner ? 'close barcode scanner' : 'open barcode scanner'} />
          </View>
        </View>
      )}

      {newProduct.image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: newProduct?.image }} style={styles.image} />
        </View>
      )}
      <View style={styles.inputStyle}>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="name"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="Product name"
                value={value || newProduct.name}
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.username?.message}
                errorProps={errors.username}
              />
            )}
            rules={{
              required: { value: true, message: 'product name is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="description"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="Description"
                value={value}
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.description?.message}
                errorProps={errors.description}
              />
            )}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="image"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="Image url"
                value={value}
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.image?.message}
                errorProps={errors.image}
              />
            )}
            rules={{
              required: { value: true, message: 'Image is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="quantity"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="Quantity"
                value={value}
                keyboardType='numeric'
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.quantity?.message}
                errorProps={errors.quantity}
              />
            )}
            rules={{
              required: { value: true, message: 'Quantity is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="category"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="category"
                value={value}
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.category?.message}
                errorProps={errors.category}
              />
            )}
            rules={{
              required: { value: true, message: 'Category is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="fat"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="fat"
                value={value}
                keyboardType='numeric'
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.fat?.message}
                errorProps={errors.fat}
              />
            )}
            rules={{
              required: { value: true, message: 'Fat is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="carbohydrates"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="carbohydrates"
                value={value}
                keyboardType='numeric'
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.carbohydrates?.message}
                errorProps={errors.carbohydrates}
              />
            )}
            rules={{
              required: { value: true, message: 'Carbohydrates field is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="protein"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="protein"
                value={value}
                keyboardType='numeric'
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.protein?.message}
                errorProps={errors.protein}
              />
            )}
            rules={{
              required: { value: true, message: 'Protein field is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="weight"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="weight"
                value={value}
                keyboardType='numeric'
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.weight?.message}
                errorProps={errors.weight}
              />
            )}
            rules={{
              required: { value: true, message: 'Weight field is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          <Controller
            defaultValue=''
            name="price"
            control={control}
            render={({ onChange, value }) => (
              <Input
                style={styles.singleInput}
                placeholder="price"
                value={value}
                onChangeText={(text) => onChange(text)}
                errorMessage={errors?.price?.message}
                errorProps={errors.price}
              />
            )}
            rules={{
              required: { value: true, message: 'Price is required' },
            }}
          />
        </View>
        <View style={styles.inputColumn}>
          {Platform.OS === 'web' ? (
            <View>
              <input type="text" />
            </View>
          ) : (
              <Controller
                defaultValue='2018-08-08'
                name="expirationDate"
                control={control}
                render={({ onChange, value }) => (
                  <DatePicker
                    style={{ width: 200 }}
                    date={value}
                    mode="date"
                    placeholder="select a date"
                    format="YYYY-MM-DD"
                    minDate="2020-03-01"
                    maxDate="2100-06-01"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => { onChange(date) }}
                  />
                )}
                rules={{
                  required: { value: true, message: 'expirationDate is required' },
                }}
              />
            )}
        </View>
      </View>

      <Button onPress={handleSubmit(onSubmit)} title="Submit" />

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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  hidden: {
    height: 0,
  },
  barcodeScanner: {
    flex: 1,
    height: 400,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: 300,
    height: 200
  },
  inputStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  inputColumn: {
    width: '50%',
  },
  singleInput: {
    minHeight: 25,

  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  price: {
    fontSize: 10,
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

export default ProductScreen;
