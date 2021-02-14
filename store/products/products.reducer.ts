import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

import { CreateProductDto } from '../../api/api'
import { ActionsType, ProductsMessages } from '../consts/actionTypes'


export class ProductsStore {
  public newProduct: CreateProductDto | null = null;

  public errorMessage: string = '';
}

const initialState = { ...new ProductsStore() }

export type ProductsActions = ActionsType<typeof productsActions>

export const productsActions = {
  setNewProduct: createAction<CreateProductDto>(ProductsMessages.SET_NEW_PRODUCT),
  addNewProductSaga: createAction<CreateProductDto>(ProductsMessages.ADD_NEW_PRODUCT_SAGA),
  setAddProductError: createAction<string>(ProductsMessages.ADD_PRODUCT_ERROR),
}

export const productsReducer = createReducer(initialState as ProductsStore, (builder) => {
  builder
    .addCase(productsActions.setNewProduct, (state, action: PayloadAction<CreateProductDto>) => {
      state.newProduct = action.payload;
    })
    .addCase(productsActions.setAddProductError, (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    })
})
