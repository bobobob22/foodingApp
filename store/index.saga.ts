import { AnyAction, Store } from '@reduxjs/toolkit'
import { Dispatch } from 'react'
import { all as effectsAll, fork as effectsFork } from 'redux-saga/effects'

import { chatSaga } from './chat/chat.saga'
import { sessionSaga } from './session/session.saga';
import { productsSaga } from './products/products.saga';

const all: any = effectsAll
const fork: any = effectsFork

export function indexSaga(dispatch: Dispatch<AnyAction>, store: Store) {
  return function* index(): Generator {
    yield all([
      fork(chatSaga, dispatch),
      fork(sessionSaga, dispatch),
      fork(productsSaga, dispatch),
    ])
  }
}
