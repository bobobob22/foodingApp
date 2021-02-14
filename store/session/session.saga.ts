import { takeEvery } from 'redux-saga/effects'
import AsyncStorage from '@react-native-community/async-storage'
import {

  Platform,
} from 'react-native';

import { OpenAPI, Service } from '../../api/api'

import { setToken } from '../helpers/setToken';

import { sessionActions, SessionActions, sessionReducer } from './session.reducer'

import { SessionMessages } from '../consts/actionTypes'

import { all, apply, debounce, put, call, select, takeLatest } from 'typed-redux-saga';


const saveDataToStorage = (token: string, userId: string, expirationDate: string): void => {
  const isWebPlatform = Platform.OS === 'web';

  if (isWebPlatform) {
    localStorage.setItem('userData', JSON.stringify({
      token,
      userId,
      expirationDate,
    }))
  } else {
    AsyncStorage.setItem('userData', JSON.stringify({
      token,
      userId,
      expirationDate,
    }))
  }
}

export function* validateSessionFromStorage (action: SessionActions['validateSession']): Generator {
  console.log("VALIDATE")
  const accessToken = action.payload;
  console.log('accessTokenaccessTokenaccessToken', accessToken)
  yield put(sessionActions.setAccessToken(accessToken))
}

export function* onRegister(action: SessionActions['registerSaga']): Generator {
  OpenAPI.BASE = 'http://192.168.0.103:3000';

  console.log('register')

  try {
    const accessToken = yield* call(Service.authControllerSignUp, action.payload.signUpData);

    if (accessToken) {
      setToken(accessToken)
      yield put(sessionActions.setAccessToken(accessToken))
    } else {
      console.log('result', accessToken)
    }
  } catch (err) {
    console.log(err, 'err')
  }
  // yield put(chatActions.addMessage('dupa'))
  // yield delay(5000)
  // yield put(chatActions.removeMessage())
}

export function* onLogin(action: SessionActions['loginSaga']): Generator {
  OpenAPI.BASE = 'http://192.168.0.103:3000';

  console.log('action.payload.signUpData', action.payload.signInData)

  try {
    const accessToken = yield* call(Service.authControllerSignIn, action.payload.signInData);
    console.log('accessToken', accessToken)

    const expirationTokenDate = new Date().getTime()
    saveDataToStorage(accessToken, '1', "2021-02-24T00:16:31.553Z") //iso string date
    yield put(sessionActions.setAccessToken(accessToken))

  } catch (err) {
    console.log(err.message, 'err')
    console.log(err.message)
  }

}

export function* sessionSaga(): Generator {
  yield all([
    takeEvery(SessionMessages.REGISTER_SAGA, onRegister),
    takeEvery(SessionMessages.LOGIN_SAGA, onLogin),
    takeEvery(SessionMessages.VALIDATE_SESSION, validateSessionFromStorage),
  ])
}
