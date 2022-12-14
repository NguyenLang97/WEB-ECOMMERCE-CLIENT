import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Col, message, Row, Tooltip, Input } from 'antd'
import { useDispatch } from 'react-redux'

import CommonSection from '../../components/ui/common-section/CommonSection'
import Helmet from '../../components/helmet/Helmet'
import { doc, setDoc, addDoc, collection, serverTimestamp, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'

import './checkout.scss'
import CartTable from '../cart_page/cartTable/CartTable'
import SuccessfulTransaction from '../../components/successful_transaction/SuccessfulTransaction'
import { resetCart } from '../../store/cart/cart.action'
import RootReducerState from '../../models/root_reducer'
import CartItemsState from '../../models/cart_items'
import { Link } from 'react-router-dom'

const Checkout = () => {
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const address = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.address)
    const phone = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.phone)
    const fullname = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.fullname)
    const email = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.email)
    const userId = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const cartTotalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const isAuth = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)

    console.log({ userId })
    const dispatch = useDispatch()

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
        cartItems.map(async (item: CartItemsState) => {
            item.total = Number(item.total) - Number(item.quantity)
        })
        const userShippingAddress = {
            name: enterFullName,
            email: enterEmail,
            phone: enterPhone,
            address: enterAddress,
            userId: userId,
            cartItems,
            totalQuantity,
            totalAmountOrder,
            status: 'Success',
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
                    total: item.total,
                })
            } catch (err) {
                message.error('Vui l??ng xem l???i s??? l?????ng tr??n h??? th???ng', 2)
            }
        })

        setTimeout(() => {
            message.success('?????t h??ng th??nh c??ng', 2)
            setIsOrderSuccess(true)
        }, 1000)
        dispatch(resetCart())
    }

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
                                <h6 className="mb-4">Th??ng tin giao h??ng</h6>
                                <form className="checkout__form" onSubmit={(e) => submitHandler(e)}>
                                    <div className="mb-4 ">
                                        <label htmlFor="">T??n ng?????i nh???n</label>
                                        <Input type="text" placeholder="Enter your name" required defaultValue={enterFullName} onChange={(e) => setEnterFullName(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">Email</label>

                                        <Input type="email" placeholder="Enter your email" defaultValue={enterEmail} required onChange={(e) => setEnterEmail(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">S??? ??i???n tho???i</label>

                                        <Input min={0} type="number" placeholder="Phone number" defaultValue={enterPhone} required onChange={(e) => setEnterPhone(e.target.value)} />
                                    </div>
                                    <div className="mb-4 ">
                                        <label htmlFor="">?????a ch??? nh???n h??ng</label>

                                        <Input type="text" placeholder="Country" defaultValue={enterAddress} required onChange={(e) => setEnterAddress(e.target.value)} />
                                    </div>
                                    <div className="p-12 bg-white bor-rad-8 m-tb-16">
                                        <h2 className="m-b-8">Ph????ng th???c thanh to??n</h2>
                                        <p>Th??ng tin thanh to??n c???a b???n s??? lu??n ???????c b???o m???t</p>
                                        <Row gutter={[16, 16]}>
                                            <Col span={24} md={12}>
                                                <div className="p-tb-8 p-lr-16 bg-gray item-active">
                                                    <b className="font-size-16px">Thanh to??n khi nh???n h??ng</b>
                                                    <p>Thanh to??n b???ng ti???n m???t khi nh???n h??ng t???i nh?? ho???c showroom.</p>
                                                </div>
                                            </Col>
                                            <Col span={24} md={12} onClick={() => message.warn('T??nh n??ng ??ang ???????c c???p nh???t. R???t xin l???i qu?? kh??ch v?? s??? b???t ti???n n??y', 3)}>
                                                <div className="p-tb-8 p-lr-16 bg-gray">
                                                    <b className="font-size-16px">Thanh to??n Online qua c???ng VNPAY</b>
                                                    <p>Thanh to??n qua Internet Banking, Visa, Master, JCB, VNPAY-QR.</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                    <button type="submit" className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                        ?????T H??NG NGAY
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
                    <h3 className="text-center mt-5 t-color-secondary">????ng nh???p ????? thanh to??n</h3>
                </Link>
            )}
        </div>
    )
}

export default Checkout
