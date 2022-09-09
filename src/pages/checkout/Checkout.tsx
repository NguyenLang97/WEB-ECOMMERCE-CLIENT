import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, message, Row, Tooltip, Input } from 'antd'

import CommonSection from '../../components/ui/common-section/CommonSection'
import Helmet from '../../components/helmet/Helmet'
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'

import './checkout.scss'
import CartTable from '../cart_page/cartTable/CartTable'
import SuccessfulTransaction from '../../components/successful_transaction/SuccessfulTransaction'
import RootReducerState from '../../models/root_reducer'
import CartItemsState from '../../models/cart_items'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    console.log({ totalQuantity })
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    console.log({ cartItems })
    const address = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.address)
    const phone = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.phone)
    const fullname = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.fullname)
    const email = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.email)
    const userId = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const cartTotalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const isAuth = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)

    console.log({ userId })

    const [enterFullName, setEnterFullName] = useState(fullname)
    const [enterEmail, setEnterEmail] = useState(email)
    const [enterPhone, setEnterPhone] = useState(phone)
    const [enterAddress, setEnterAddress] = useState(address)
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    const [total, setTotal] = useState()
    const [data, setData] = useState<any[]>([])

    const shippingCost = 30
    const Sale = 0

    const totalAmountOrder = cartTotalAmount + Number(shippingCost) + Number(Sale)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        // setIsOrderSuccess(true)
        e.preventDefault()
        const userShippingAddress = {
            name: enterFullName,
            email: enterEmail,
            phone: enterPhone,
            address: enterAddress,
            userId: userId,
            cartItems,
            totalQuantity,
            totalAmountOrder,
            status: 'Đặt hàng thành công',
        }

        console.log({ userShippingAddress })

        try {
            await addDoc(collection(db, 'order'), {
                ...userShippingAddress,
                timeStamp: serverTimestamp(),
            })
            // navigate(-1)
        } catch (err) {
            console.log(err)
            // setError(true)
        }

        cartItems.map(async (item: CartItemsState) => {
            try {
                await updateDoc(doc(db, 'products', item.id as string), {
                    total: Number(item.total) - Number(item.quantity),
                })
            } catch (err) {
                message.error('Vui lòng xem lại số lượng trên hệ thống', 2)
            }
        })

        setTimeout(() => {
            message.success('Đặt hàng thành công', 2)
            setIsOrderSuccess(true)
        }, 1000)
    }
    console.log({ isOrderSuccess })
    console.log('total', data)

    return (
        <div className="container">
            {isAuth ? (
                isOrderSuccess ? (
                    <SuccessfulTransaction />
                ) : (
                    <Helmet title="Checkout">
                        <CommonSection title="Checkout" />
                        <Row className="container">
                            <Col lg={24}>
                                <CartTable />
                            </Col>
                        </Row>
                        <Row className="container">
                            <Col lg={16} md={12}>
                                <h6 className="mb-4">Thông tin giao hàng</h6>
                                <form className="checkout__form" onSubmit={(e) => submitHandler(e)}>
                                    <div className="mb-4 ">
                                        <label htmlFor="">Tên người nhận</label>
                                        <Input type="text" placeholder="Enter your name" required defaultValue={enterFullName} onChange={(e) => setEnterFullName(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">Email</label>

                                        <Input type="email" placeholder="Enter your email" defaultValue={enterEmail} required onChange={(e) => setEnterEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">Số điện thoại</label>

                                        <Input type="number" placeholder="Phone number" defaultValue={enterPhone} required onChange={(e) => setEnterPhone(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">Địa chỉ nhận hàng</label>

                                        <Input type="text" placeholder="Country" defaultValue={enterAddress} required onChange={(e) => setEnterAddress(e.target.value)} />
                                    </div>
                                    <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                        <h2 className="m-b-8">Phương thức thanh toán</h2>
                                        <p>Thông tin thanh toán của bạn sẽ luôn được bảo mật</p>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24} md={12}>
                                                <div className="p-tb-8 p-lr-16 bg-gray item-active">
                                                    <b className="font-size-16px">Thanh toán khi nhận hàng</b>
                                                    <p>Thanh toán bằng tiền mặt khi nhận hàng tại nhà hoặc showroom.</p>
                                                </div>
                                            </Col>
                                            <Col span={24} md={12} onClick={() => message.warn('Tính năng đang được cập nhật. Rất xin lỗi quý khách vì sự bất tiện này', 3)}>
                                                <div className="p-tb-8 p-lr-16 bg-gray">
                                                    <b className="font-size-16px">Thanh toán Online qua cổng VNPAY</b>
                                                    <p>Thanh toán qua Internet Banking, Visa, Master, JCB, VNPAY-QR.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <button type="submit" className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                        ĐẶT HÀNG NGAY
                                    </button>
                                </form>
                            </Col>

                            <Col lg={8} md={12}>
                                <div className="checkout__bill">
                                    <h6 className="d-flex align-items-center justify-content-between mb-3">
                                        Subtotal: <span>${cartTotalAmount}</span>
                                    </h6>
                                    <h6 className="d-flex align-items-center justify-content-between mb-3">
                                        Shipping: <span>${shippingCost}</span>
                                    </h6>
                                    <h6 className="d-flex align-items-center justify-content-between mb-3">
                                        Sale: <span>${Sale}</span>
                                    </h6>
                                    <div className="checkout__total">
                                        <h5 className="d-flex align-items-center justify-content-between">
                                            Total: <span>${totalAmountOrder}</span>
                                        </h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Helmet>
                )
            ) : (
                <Link to={'/login'}>
                    <h3 className="text-center mt-5 t-color-secondary">Đăng nhập để thanh toán</h3>
                </Link>
            )}
        </div>
    )
}

export default Checkout
