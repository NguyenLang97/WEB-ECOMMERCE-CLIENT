import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './rootSaga'
import CartReducer from './cart/cart.reducer'
import CartUiReducer from './cart_ui/cart_ui.reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import AuthReducer from './auth/auth.reducer'
import { connectRouter } from 'connected-react-router'
import { history } from '../utils'
import { routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
const rootReducer = combineReducers({
    router: connectRouter(history),
    CartReducer: CartReducer,
    CartUiReducer: CartUiReducer,
    AuthReducer: AuthReducer,
})
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware, routerMiddleware(history))))

sagaMiddleware.run(rootSaga)

export default store
