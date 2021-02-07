import { keyNames } from './consts/storeKeys'
import { chatReducer } from './chat/chat.reducer'


export const rootReducer = {
  [keyNames.chat]: chatReducer,
}
