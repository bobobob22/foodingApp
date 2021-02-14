import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

import { AuthCredentialsDto } from '../../api/api'
import { ActionsType, SessionMessages } from '../consts/actionTypes'


export class SessionStore {
  public accessToken: string = '';

  public errorMessage: string = '';
}

const initialState = { ...new SessionStore() }

export type SessionActions = ActionsType<typeof sessionActions>

export const sessionActions = {
  loginError: createAction<string>(SessionMessages.LOGIN_ERROR),
  setAccessToken: createAction<string>(SessionMessages.SET_ACCESS_TOKEN),
  loginSaga: createAction<{ signInData: AuthCredentialsDto }>(SessionMessages.LOGIN_SAGA),
  registerSaga: createAction<{ signUpData: AuthCredentialsDto }>(SessionMessages.REGISTER_SAGA),
  validateSession: createAction<string>(SessionMessages.VALIDATE_SESSION),
}

export const sessionReducer = createReducer(initialState as SessionStore, (builder) => {
  builder
    .addCase(sessionActions.setAccessToken, (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    })
    .addCase(sessionActions.loginError, (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    })
})
