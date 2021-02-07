import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import { rootReducer } from './index.reducer'
import { indexSaga } from './index.saga';
import { Reducer, Store } from '@reduxjs/toolkit'

import { combineReducer } from './index.types'

export type AppStore = Store<any, any>

const initialState = {}
export const configureStore = async () => {
  const sagaMiddleware = createSagaMiddleware()
  const store: AppStore = createStore(
    combineReducer,
    initialState,
    applyMiddleware(
      sagaMiddleware
    )
  )
  sagaMiddleware.run(indexSaga(store.dispatch, store))

  return store
}
