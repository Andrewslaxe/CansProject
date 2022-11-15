import {applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import {notificationReducer} from './reducers/notificationReducer'
import {canReducer} from './reducers/canReducer'
import {loginReducer} from "./reducers/loginReducer";

const reducer = combineReducers({
  notification: notificationReducer,
  cans: canReducer,
  user: loginReducer
})

const store = configureStore(
  {reducer},
  composeWithDevTools(applyMiddleware(thunk))
)

export default store