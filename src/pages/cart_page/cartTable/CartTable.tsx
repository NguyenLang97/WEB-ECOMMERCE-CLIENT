import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteItem, removeItem, addItem } from '../../../store/cart/cart.action'
import RootReducerState from '../../../models/root_reducer'
import AddCartItemState from '../../../models/add_cartItem'
import CartItemsState from '../../../models/cart_items'
import _ from 'lodash'
import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import './cart_table.scss'
import { db } from '../../../firebase/firebase_config'
import { message } from 'antd'

const CartTable = () => {
    const [allProducts, setAllProducts] = useState([])
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)

    // const { id, title, price, img, quantity } = cartItems
    // console.log({ cartItems })

    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list: any = []
                snapShot.docs.forEach((doc) => {
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

    const delItem = (id: string) => {
        dispatch(deleteItem(id))
    }

    const decreaseItem = (id: string) => {
        console.log('giam')
        dispatch(removeItem(id))
    }

    const incrementItem = ({ id, title, price, img, quantity, total }: AddCartItemState) => {
        if (Number(total) > 0) {
            // const productsItem = allProducts.find((item: any) => item.id === id)
            // console.log({ productsItem })
            // console.log(productsItem as any)

            // if (Number((productsItem as any).total) > quantity) {
            //     console.log('dat hang')

            dispatch(
                addItem({
                    id,
                    title,
                    price,
                    img,
                    total,
                })
            )
        } else {
            message.error({
                content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                duration: 3,
            })
        }
        // }
    }

    return (
        <div className="table-responsive">
            {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
            ) : (
                <table className="table table-bordered bg-white">
                    <thead>
                        <tr className="text-center">
                            <th>Image</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>totalPrice</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item: CartItemsState) => (
                            <tr key={item.id}>
                                <td className="text-center cart__img-box">
                                    <img src={item.img[0].img} alt="" />
                                </td>
                                <td className="text-center">{item.title}</td>
                                <td className="text-center">${item.price}</td>
                                <td className="text-center">
                                    {item.quantity}
                                    <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
                                        <span
                                            className="increase__btn"
                                            onClick={() => incrementItem({ id: item.id, title: item.title, price: item.price, img: item.img[0].img, quantity: item.quantity, total: item.total })}
                                        >
                                            <i className="ri-add-line"></i>
                                        </span>
                                        <span className="decrease__btn" onClick={() => decreaseItem(item.id)}>
                                            <i className="ri-subtract-line"></i>
                                        </span>
                                    </div>
                                </td>
                                <td className="text-center cart__item-del">${item.totalPrice}</td>
                                <td className="text-center cart__item-del">
                                    <i className="ri-delete-bin-line" onClick={() => delItem(item.id)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CartTable
