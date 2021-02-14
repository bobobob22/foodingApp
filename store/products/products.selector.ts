import { createSelector, OutputSelector } from 'reselect'

import { keyNames } from '../consts/storeKeys'
import { AnyProps, keySelectors } from '../helpers/selectors'
import { ProductsStore } from './products.reducer'

const store = (s: AnyProps): ProductsStore => s[keyNames.session] as ProductsStore

export const { newProduct } = keySelectors(store, ['newProduct'])

export const productsSelectors = {
  newProduct,
}
