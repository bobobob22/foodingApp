import { ActionCreator, AnyAction } from 'redux'

type ActionsBasicType = {
  [k: string]: ActionCreator<AnyAction>
}

export type ActionsType<actions extends ActionsBasicType> = {
  [k in keyof actions]: ReturnType<actions[k]>
}

export enum ChatMessages {
  ADD_MESSAGE_SAGA = 'ADD_MESSAGE_SAGA',
  ADD_MESSAGE = 'ADD_MESSAGE',
  REMOVE_MESSAGE = 'REMOVE_MESSAGE',
}

export enum SessionMessages {
  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
  LOGIN_SAGA = 'LOGIN_SAGA',
  LOGIN_ERROR = 'LOGIN_ERROR',
  REGISTER_SAGA = 'REGISTER_SAGA',
  VALIDATE_SESSION = 'VALIDATE_SESSION',
}

export enum ProductsMessages {
  ADD_NEW_PRODUCT_SAGA = 'ADD_NEW_PRODUCT_SAGA',
  SET_NEW_PRODUCT = 'SET_NEW_PRODUCT',
  ADD_PRODUCT_ERROR = 'ADD_PRODUCT_ERROR',
}