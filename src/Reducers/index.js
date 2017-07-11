import { combineReducers } from 'redux'
import AddQuoteReducer from './AddQuoteReducer'

const rootReducer = combineReducers({
  addQuoteParams: AddQuoteReducer
})

export default rootReducer
