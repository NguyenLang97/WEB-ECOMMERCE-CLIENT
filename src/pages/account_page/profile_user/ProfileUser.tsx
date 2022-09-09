import React, { useMemo, useState } from 'react'
import { Row, Col, Input } from 'antd'
import { useSelector } from 'react-redux'
import RootReducerState from '../../../models/root_reducer'

const ProfileUser = () => {
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    console.log({ totalQuantity })
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    console.log({ cartItems })
    const address = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.address)
    const phone = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.phone)
    const fullname = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.fullname)
    const email = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.email)
    const yearofbirth = useSelector((state: RootReducerState) => state.AuthReducer.infoUser.yearofbirth)

    const [enterFullName, setEnterFullName] = useState(fullname)
    const [enterYearofbirth, setEnterYearofbirth] = useState(yearofbirth)
    const [enterEmail, setEnterEmail] = useState(email)
    const [enterPhone, setEnterPhone] = useState(phone)
    const [enterAddress, setEnterAddress] = useState(address)

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {}
    return (
        <div className="details__user">
            <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                    <label htmlFor="">Tên người nhận</label>
                    <Input type="text" placeholder="Enter your name" required value={enterFullName} onChange={(e) => setEnterFullName(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Ngày- Thánh- Năm sinh</label>
                    <Input type="date" placeholder="Enter your name" required value={enterYearofbirth} onChange={(e) => setEnterYearofbirth(e.target.value)} />
                </div>

                <div className="form__group">
                    <label htmlFor="">Email</label>

                    <Input type="email" placeholder="Enter your email" value={enterEmail} required onChange={(e) => setEnterEmail(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Số điện thoại</label>

                    <Input type="number" placeholder="Phone number" value={enterPhone} required onChange={(e) => setEnterPhone(e.target.value)} />
                </div>
                <div className="form__group">
                    <label htmlFor="">Địa chỉ nhận hàng</label>

                    <Input type="text" placeholder="Country" value={enterAddress} required onChange={(e) => setEnterAddress(e.target.value)} />
                </div>
            </form>

            <Col lg={24} className="update__user__profile mt-3">
                <div className='text-center'>
                    <button>Cập nhật thông tin</button>
                </div>
            </Col>
        </div>
    )
}

export default ProfileUser
