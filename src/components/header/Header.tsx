import React, { useRef, useEffect } from 'react'
import { MenuOutlined, ReconciliationOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { AutoComplete, Badge, Button, Drawer, Dropdown, Input, Menu, message } from 'antd'

import defaultAvt from '../../assets/images/default-avt.png'
import logo from '../../assets/images/logo.png'
import { NavLink, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleCartUi } from '../../store/cart_ui/cart_ui.action'
import { logoutStart } from '../../store/auth/auth.action'
import RootReducerState from '../../models/root_reducer'

import './header.scss'

const NavLinks = [
    {
        display: 'Trang chủ',
        path: '/home',
    },
    {
        display: 'Sản phẩm',
        path: '/products',
    },
    {
        display: 'Giỏ hàng',
        path: '/cart',
    },
    {
        display: 'Liên hệ',
        path: '/contact',
    },
]

// interface RootReducerState {
//     AuthReducer: {
//         currentUser: boolean
//         infoUser: {
//             username: boolean
//             img: string
//         }
//     }
//     CartReducer: {
//         totalQuantity: boolean
//     }
// }

const Header = () => {
    const menuRef = useRef<HTMLDivElement>(null)
    const isAuth = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const username = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.img)
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)

    console.log('totalQuantity', totalQuantity)

    const dispatch = useDispatch()

    const toggleMenu = () => menuRef.current!.classList.toggle('show__menu')
    // const toggleMenu = () => console.log('1')

    const toggleCart = () => {
        dispatch(toggleCartUi(true))
    }

    return (
        <header className="header">
            <div className="header__container container">
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    <Link to={'/'} className="nav__logo text-center">
                        <img src={logo} alt="logo" />
                        {/* <h5>Tasty Treat</h5> */}
                    </Link>

                    {/* ======= menu ======= */}
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="navigation__menu d-flex align-items-center gap-5">
                            {NavLinks.map((item, index) => (
                                <NavLink to={item.path} key={index} className={(navClass) => (navClass.isActive ? 'navigation__menu--active' : '')}>
                                    {item.display}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* ======== nav right icons ========= */}
                    <div className="nav__right d-flex align-items-center gap-4">
                        <div className="nav__cart-wrap position-relative" onClick={toggleCart}>
                            <div className="nav__cart d-flex align-items-center justify-content-center gap-4">
                                <ShoppingCartOutlined className="nav__cart-icon d-block" />
                                <span className="nav__cart-quantity">{totalQuantity}</span>
                            </div>
                            <p className="nav__cart-title">Giỏ hàng</p>
                        </div>
                        <div className="nav__user-wrap position-relative">
                            <Link to={isAuth ? '/account' : '/login'} className="nav__user ">
                                {!isAuth ? (
                                    <div className="nav__user-tool d-flex flex-row align-items-center justify-content-center  ">
                                        {/* <UserOutlined className="icon m-r-12" /> */}
                                        <img src={defaultAvt} className="nav__user-img" />
                                        <div className="d-flex flex-column">
                                            <span className="title">Đăng nhập</span>
                                            <span className="title">Đăng ký</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="nav__user-tool nav__user-tool--logined d-flex flex-column align-items-center p-l-0">
                                        <img src={img || defaultAvt} className="nav__user-img" />
                                        <span className="nav__user-name">{username}</span>
                                    </div>
                                )}
                            </Link>
                            {!isAuth ? (
                                <div className="nav__user-action flex-column position-absolute bg-white gap-2">
                                    <Link to="/register">
                                        <Button size="large" className="nav__user-action-title w-100 btn-secondary">
                                            Đăng ký
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button size="large" className="nav__user-action-title w-100 btn-secondary" onClick={() => dispatch(logoutStart())}>
                                            Đăng nhập
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="nav__user-action nav__user-action--logined flex-column position-absolute bg-white gap-2">
                                    <Link to="/account" className="nav__user-link">
                                        <Button size="large" className="nav__user-action-title w-100 btn-secondary">
                                            Quản lý tài khoản
                                        </Button>
                                    </Link>
                                    <Button size="large" className="nav__user-action-title w-100 btn-secondary" onClick={() => dispatch(logoutStart())}>
                                        Đăng xuất
                                    </Button>
                                </div>
                            )}
                        </div>
                        {/* mobile menu */}
                        <span className="nav__mobile" onClick={toggleMenu}>
                            <MenuOutlined className="nav__mobile-icon" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
