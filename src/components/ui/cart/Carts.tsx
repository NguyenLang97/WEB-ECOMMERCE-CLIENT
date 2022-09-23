import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CloseCircleOutlined } from '@ant-design/icons'
import CartItem from './cart_item/CartItem'

import { useDispatch, useSelector } from 'react-redux'
import { toggleCartUi } from '../../../store/cart_ui/cart_ui.action'
import RootReducerState from '../../../models/root_reducer'
import CartItemsState from '../../../models/cart_items'

import './cart.scss'

const Carts = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [cartItems])

    const toggleCart = () => {
        dispatch(toggleCartUi(false))
    }

    console.log('cartItem', cartItems)

    return (
        <div className="cart__container">
            <div className="cart">
                <div className="cart__close">
                    <span onClick={toggleCart}>
                        <CloseCircleOutlined className="cart__close-icon" />
                    </span>
                </div>

                <div className="cart__item-list">
                    {cartItems.length === 0 ? <h6 className="text-center mt-5">No item added to the cart</h6> : cartItems.map((item: CartItemsState, index) => <CartItem item={item} key={index} />)}
                </div>

                <div className="cart__bottom d-flex align-items-center justify-content-between">
                    <h6>
                        Tổng tiền : <span>${totalAmount}</span>
                    </h6>
                    <button>
                        <Link to="/checkout" onClick={toggleCart}>
                            Thanh toán
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Carts
