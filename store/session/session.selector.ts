import { createSelector, OutputSelector } from 'reselect'

import { keyNames } from '../consts/storeKeys'
import { AnyProps, keySelectors } from '../helpers/selectors'
import { SessionStore } from './session.reducer'

const store = (s: AnyProps): SessionStore => s[keyNames.session] as SessionStore

export const { accessToken } = keySelectors(store, ['accessToken'])

export const sessionSelectors = {
  accessToken,
}
