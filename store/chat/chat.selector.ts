import { createSelector, OutputSelector } from 'reselect'

import { keyNames } from '../consts/storeKeys'
import { AnyProps, keySelectors } from '../helpers/selectors'
import { ChatStore } from './chat.reducer'

const store = (s: AnyProps): ChatStore => s[keyNames.chat] as ChatStore

export const { userMessage } = keySelectors(store, ['userMessage'])

export const chatSelectors = {
  userMessage,
}
