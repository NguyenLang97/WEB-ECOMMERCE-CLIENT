import { TOGGLE_CART } from './cart_ui.action'

const initialState = {
    cartIsVisible: false,
}

const CartUiReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CART:
            return { cartIsVisible: action.payload }

        default:
            return state
    }
}

export default CartUiReducer
