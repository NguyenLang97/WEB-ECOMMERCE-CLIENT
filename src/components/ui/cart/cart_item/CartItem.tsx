import React, { useEffect, useMemo, useState } from 'react'
import { CloseSquareOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

import './cart-item.scss'

import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, deleteItem } from '../../../../store/cart/cart.action'
import { List, message } from 'antd'
import CartItemsState from '../../../../models/cart_items'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../../firebase/firebase_config'
import RootReducerState from '../../../../models/root_reducer'

interface CartsState {
    item: CartItemsState
}

const CartItem = (prop: CartsState) => {
    const { id, title, price, img, quantity, totalPrice } = prop.item
    const [allProducts, setAllProducts] = useState<any[]>([])
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list: any[] = []
                snapShot.docs.forEach((doc, index) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setAllProducts(list)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    const product = useMemo(() => {
        if (allProducts) return allProducts.find((item) => item.id === id)
    }, [allProducts])

    const dispatch = useDispatch()

    const incrementItem = () => {
        if (product) {
            const { id, title, price, category, description, img, total } = product
            if (product.total > 0) {
                // console.log('tang')

                // if (cartItems.length) {
                //     const quantity = (cartItems.find((item: any) => item.id === id) as any).quantity
                //     console.log('sl', cartItems)

                //     if (Number(product.total) > quantity) {
                //         console.log('dat hang')

                dispatch(
                    addItem({
                        id,
                        title,
                        price,
                        img,
                        total,
                    })
                )
                // } else {
                //     message.error({
                //         content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                //         duration: 3,
                //     })
                // }
            } else {
                // dispatch(
                //     addItem({
                //         id,
                //         title,
                //         price,
                //         img,
                //     })
                // )
                message.error({
                    content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                    duration: 3,
                })
            }
        }
    }

    const decreaseItem = () => {
        dispatch(removeItem(id))
    }

    const delItem = () => {
        dispatch(deleteItem(id))
    }

    return (
        <List className="cart__item p-2">
            <div className="cart__content d-flex gap-2">
                <img src={img[0].img} alt="product-img" />

                <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
                    <div className="cart__item">
                        <h6 className="cart__item-title">{title}</h6>
                        <p className=" cart__item-price d-flex align-items-center gap-5">
                            SL: {quantity}
                            <span>{price} VND/SP</span>
                            <span className="quantity">{Number(totalPrice)} VND</span>
                        </p>

                        <div className="cart__btn d-flex align-items-center justify-content-between ">
                            <div className="d-flex cart__btn-increase" onClick={incrementItem}>
                                <PlusOutlined />
                            </div>
                            <span className="quantity">{quantity}</span>
                            <div className="d-flex cart__btn-decrease" onClick={decreaseItem}>
                                <MinusOutlined />
                            </div>
                        </div>
                    </div>

                    <span className="cart__delete" onClick={delItem}>
                        <CloseSquareOutlined />
                    </span>
                </div>
            </div>
        </List>
    )
}

export default CartItem
