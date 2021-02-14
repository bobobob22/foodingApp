import { keyNames } from './consts/storeKeys'
import { chatReducer } from './chat/chat.reducer'
import { sessionReducer } from './session/session.reducer'
import { productsReducer } from './products/products.reducer'


export const rootReducer = {
  [keyNames.chat]: chatReducer,
  [keyNames.session]: sessionReducer,
  [keyNames.products]: productsReducer,
}
