import { createSelector, OutputSelector } from 'reselect'
import { Product } from '../../api/api'

import { keyNames } from '../consts/storeKeys'
import { AnyProps, keySelectors } from '../helpers/selectors'
import { ProductsStore } from './products.reducer'

const store = (s: AnyProps): ProductsStore => s[keyNames.products] as ProductsStore

export const { newProduct, products } = keySelectors(store, ['newProduct', 'products'])

export const productsSelectors = {
  newProduct,
  products,
}

export const singleRoomSelector = (
  roomId: string,
) =>
  createSelector(
    [productsSelectors.products as any],
    (products: Product[]) => {
      if (products && products.length > 0) {
        const singleRoom: any = products.filter((product) => +product.id === +roomId)
        return singleRoom;
      }
    })