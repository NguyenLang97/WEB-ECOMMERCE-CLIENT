import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase_config'

import { useSelector, useDispatch } from 'react-redux'
import RootReducerState from '../../../models/root_reducer'
import CartItemsState from '../../../models/cart_items'
import './oder_list.scss'
import ConvertStOrder from '../../../components/ConvertStOrder/ConvertStOrder'

const OrderList = () => {
    const currentUser = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    console.log({ currentUser })

    const [data, setData] = useState([])
    const [orderList, setOrderList] = useState<any[]>([])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'order'),
            (snapShot) => {
                let list: any = []
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })

                setData(list)
                const filterOrder = list.filter((item: any) => item.userId === currentUser)
                console.log('filterOrder', filterOrder)
                setOrderList(filterOrder)
                // setLoading(false)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    function setDate(unixTime: number) {
        const date = new Date(unixTime * 1000)
        // console.log(date.toLocaleDateString('en-US'))
        return date.toLocaleDateString('en-US')
    }

    console.log(data)

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Ngày mua</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Phí vận chuyển</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái đơn hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList &&
                        orderList.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{setDate(item.timeStamp.seconds)}</td>
                                <td className="">
                                    {item.cartItems.map((item: CartItemsState, index: number) => (
                                        <div key={index} className="d-flex flex-colum ">
                                            <img src={item.img[0].img} className="order__item-img" />
                                            <p>{item.title}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.cartItems.map((item: CartItemsState, index: number) => (
                                        <div key={index} className="d-flex flex-colum justify-content-between">
                                            <p>{item.quantity}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {item.cartItems.map((item: CartItemsState, index: number) => (
                                        <div key={index} className="d-flex flex-colum justify-content-between">
                                            <p>{item.price}</p>
                                        </div>
                                    ))}
                                </td>
                                <td>30</td>
                                <td>{item.totalAmountOrder}</td>
                                <td>{ConvertStOrder(item.status)}</td>
                            </tr>
                        ))}
                    {/* <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>@mdo</td>
                    </tr> */}
                    {/* <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                        <td>@twitter</td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}

export default OrderList
