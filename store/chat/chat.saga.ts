import { put } from 'redux-saga-test-plan/matchers'
import { all, delay, takeLatest } from 'redux-saga/effects'

import { ChatActions, chatActions } from './chat.reducer'

import { ChatMessages } from '../consts/actionTypes'

export function* onMessageSend(action: ChatActions['addMessage']): Generator {
  yield put(chatActions.addMessage('dupa'))
  yield delay(5000)
  yield put(chatActions.removeMessage())
}

export function* chatSaga(): Generator {
  yield all([takeLatest(ChatMessages.ADD_MESSAGE_SAGA, onMessageSend)])
}
