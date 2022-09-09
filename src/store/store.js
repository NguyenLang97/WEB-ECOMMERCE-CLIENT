import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import CartReducer from './cart/cart.reducer'
import CartUiReducer from './cart_ui/cart_ui.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import AuthReducer from './auth/auth.reducer'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const rootReducer = combineReducers({
    CartReducer: CartReducer,
    CartUiReducer: CartUiReducer,
    AuthReducer: AuthReducer,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

sagaMiddleware.run(rootSaga)

export default store
