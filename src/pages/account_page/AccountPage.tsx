import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { logoutStart } from '../../redux/action'
import { Row, Col } from 'antd'
import './account_page.scss'
import defaultAvt from '../../assets/images/default-avt.png'
// import OrderList from './OrderList'
// import UpdateAccountForm from './UpdateForm'
// import AddressUserList from './UserAddressList'
import ProfileUser from './profile_user/ProfileUser'
import AddressUser from './address_user/AddressUser'
import OrderList from './oder_list/OrderList'
import { useSelector, useDispatch } from 'react-redux'
import { logoutStart } from '../../store/auth/auth.action'
import RootReducerState from '../../models/root_reducer'

function AccountPage() {
    const { pathname } = useLocation()
    console.log(location)

    const dispatch = useDispatch()
    const [activeKey, setActiveKey] = useState('')
    console.log({ activeKey })

    const img = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.img)
    const username = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.username)

    useEffect(() => {
        if (pathname === '/account/orders') setActiveKey('orders')
    }, [pathname])

    const menu = [
        {
            Icon: <i className="ri-user-settings-line"></i>,
            title: 'Thông tin tài khoản',
            key: '',
        },
        {
            Icon: <i className="ri-file-list-line"></i>,
            title: 'Quản lý đơn hàng',
            key: 'orders',
        },
        {
            Icon: <i className="ri-compass-3-line"></i>,
            title: 'Địa chỉ giao hàng',
            key: 'address',
        },
        {
            Icon: <i className="ri-notification-2-line"></i>,
            title: 'Thông báo',
            key: 'notifications',
        },
    ]

    // render component with key
    function renderComponent(key = '') {
        switch (key) {
            case '':
                return (
                    <>
                        <h3 className="m-b-16">Thông tin tài khoản</h3>
                        <ProfileUser />
                    </>
                )
            case 'orders':
                return (
                    <>
                        <h2 className="m-b-16">Các đơn hàng của bạn</h2>
                        <OrderList />
                    </>
                )
            case 'address':
                return (
                    <>
                        <h2 className="m-b-16">Danh sách địa chỉ giao hàng của bạn</h2>
                        <AddressUser />
                    </>
                )
            case 'notifications':
                return (
                    <>
                        <h2 className="m-b-16">Thông báo</h2>
                        <p>Hiện tại không có thông báo</p>
                    </>
                )
            default:
            // ;<>
            //     <h2 className="m-b-16">Thông tin tài khoản</h2>
            //     <ProfileUser />
            // </>
        }
    }

    return (
        <section className="profile__container container">
            {/* <button onClick={()=>dispatch(logoutStart())}>logout</button> */}
            <Row gutter={[16, 16]} className="mt-5 justify-content-between">
                <Col xl={6} lg={6} md={24} sm={24} className="profile__user text-center bor-rad-8 ">
                    <img className="w-25 mb-3 rounded-circle" src={img || defaultAvt} alt="" />
                    <h6 className=" mb-3">
                        Tài khoản của : <span>{username}</span>
                    </h6>
                    <ul className="list-group d-flex flex-column ">
                        {menu.map((item, index) => (
                            <Link key={index} to={`${item.key}`}>
                                <li className={`list-group-item d-flex gap-2 ${item.key === activeKey ? 'active' : ''}`} onClick={() => setActiveKey(item.key)}>
                                    {item.Icon}
                                    {item.title}
                                </li>
                            </Link>
                        ))}
                        <li className="list-group-item d-flex gap-2" onClick={() => dispatch(logoutStart())}>
                            <i className="ri-logout-box-line"></i>
                            Đăng xuất
                        </li>
                    </ul>
                </Col>
                <Col xl={18} lg={18} md={24} sm={24} className="details__user bg-white bor-rad-8 p-4">
                    {renderComponent(activeKey)}
                </Col>
            </Row>
        </section>
    )
}

export default AccountPage
