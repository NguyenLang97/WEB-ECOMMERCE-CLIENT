import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from './cart.action'
import { Button, message, Row } from 'antd'

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')) || 0,
    totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
}

const CartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM: {
            const newItem = action.payload
            const existingItem = state.cartItems.find((item) => item.id === newItem.id)

            if (!existingItem) {
                state.totalQuantity++

                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    img: newItem.img,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    total: newItem.total,
                })
            } else {
                if (Number(newItem.total) > existingItem.quantity) {
                    state.totalQuantity++

                    existingItem.quantity++
                    existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
                    console.log({ existingItem })
                } else {
                    message.error({
                        content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                        duration: 3,
                    })
                }
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)
            console.log('1', [...state.cartItems])
            return {
                ...state,
                cartItems: [...state.cartItems],
                totalQuantity: state.totalQuantity,
                totalAmount: state.totalAmount,
            }
        }

        case DELETE_ITEM: {
            const id = action.payload
            const existingItem = state.cartItems.find((item) => item.id === id)

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

            return {
                ...state,
                cartItems: [...state.cartItems],
                totalQuantity: state.totalQuantity,
                totalAmount: state.totalAmount,
            }
        }

        // Xoa 1 san pham
        case REMOVE_ITEM:
            const id = action.payload
            const existingItem = state.cartItems.find((item) => item.id === id)
            state.totalQuantity--

            if (existingItem.quantity === 1) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id)
            } else {
                existingItem.quantity--
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price)
            }

            state.totalAmount = state.cartItems.reduce((total, item) => total + Number(item.price) * Number(item.quantity), 0)

        default:
            return {
                ...state,
                cartItems: [...state.cartItems],
                totalQuantity: state.totalQuantity,
                totalAmount: state.totalAmount,
            }
    }
}

export default CartReducer
