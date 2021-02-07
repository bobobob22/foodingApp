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