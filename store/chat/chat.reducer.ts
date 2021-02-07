import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';

import { ActionsType, ChatMessages } from '../consts/actionTypes'


export class ChatStore {
  public userMessage: string = ''
}

const initialState = { ...new ChatStore() }

export type ChatActions = ActionsType<typeof chatActions>

export const chatActions = {
  addMessageSaga: createAction<string>(ChatMessages.ADD_MESSAGE_SAGA),
  addMessage: createAction<string>(ChatMessages.ADD_MESSAGE),
  removeMessage: createAction(ChatMessages.REMOVE_MESSAGE),
}

export const chatReducer = createReducer(initialState as ChatStore, (builder) => {
  builder
    .addCase(chatActions.addMessage, (state, action: PayloadAction<string>) => {
      state.userMessage = action.payload;
    })
    .addCase(chatActions.removeMessage, (state) => {
      state.userMessage = '';
    })
})
