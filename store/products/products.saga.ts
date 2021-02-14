import { takeEvery } from 'redux-saga/effects'

import { OpenAPI, Service } from '../../api/api'

import { productsActions, ProductsActions } from './products.reducer'

import { ProductsMessages } from '../consts/actionTypes'

import { all, apply, debounce, put, call, select, takeLatest } from 'typed-redux-saga'
import { sessionSelectors } from '../session/session.selector'

export function* addNewProduct(action: ProductsActions['addNewProductSaga']): Generator {
  OpenAPI.BASE = 'http://192.168.0.103:3000';

  const accessToken = yield* select(sessionSelectors.accessToken)
  console.log('acdsadsa', accessToken)

  OpenAPI.TOKEN = accessToken;

  console.log('addNewProduct', action.payload)

  const { name, description, carbohydrates, fat, price, protein, expirationDate, quantity, category, image, weight } = action.payload;
  const expiredDate = new Date(expirationDate);

  const productData = {
    description,
    name,
    carbohydrates: Number(carbohydrates),
    fat: Number(fat),
    price,
    protein: Number(protein),
    expirationDate: expiredDate.toISOString(),
    category,
    quantity: Number(quantity),
    image,
    weight: Number(weight),
  }

  console.log('productDataproductData', productData)

  try {
    const result = yield* call(Service.productControllerCreateTask, productData);
    console.log('result', result)
    if (result) {
      yield put(productsActions.setNewProduct(result))
    } else {
      console.log('result', result)
    }
  } catch (err) {
    console.log(err, 'err')
  }

}


export function* productsSaga(): Generator {
  yield all([
    takeEvery(ProductsMessages.ADD_NEW_PRODUCT_SAGA, addNewProduct),
  ])
}
