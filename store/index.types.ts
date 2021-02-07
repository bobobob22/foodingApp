import { combineReducers } from 'redux'

import { rootReducer } from './index.reducer'

export const combineReducer = combineReducers({
  ...rootReducer,
})

export type StoreType = ReturnType<typeof combineReducer>
