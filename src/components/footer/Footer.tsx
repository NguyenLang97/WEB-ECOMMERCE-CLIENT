import React from 'react'
import { MailTwoTone, HomeTwoTone, PhoneTwoTone, PrinterTwoTone } from '@ant-design/icons'
import './footer.scss'

const Footer = () => {
    return (
        <footer className="container footer pt-5 pb-4">
            <div className="container text-center text-md-left">
                <div className="row text-center text-md-left">
                    <div className="footer__main col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="footer__title">About Us</h5>
                        <hr className="mb-4" />
                        <p>
                            © 1997 - 2020 Công Ty Cổ Phần Thương Mại - Dịch Vụ TTB
                            <br />
                            Giấy chứng nhận đăng ký doanh nghiệp: 0304998358 do Sở KH-ĐT TP.HCM cấp lần đầu ngày 30 tháng 05 năm 2007
                        </p>
                    </div>
                    <div className="footer__main col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="footer__title">Let Us Help</h5>
                        <hr className="mb-4" />
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Your Account
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Your Orders
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Manage Your Content And Devices
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Help
                            </a>
                        </p>
                    </div>
                    <div className="footer__main col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="footer__title">Make Money</h5>
                        <hr className="mb-4" />
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Sell Products on Our Website
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Advertise Your Products
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Become An Affiliate
                            </a>
                        </p>
                        <p>
                            <a href="#" className="text-dark" style={{ textDecoration: 'none' }}>
                                Self-Publish
                            </a>
                        </p>
                    </div>
                    <div className="footer__main col-md-12 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h5 className="footer__title">Contact</h5>
                        <hr className="mb-4" />
                        <p className="d-flex align-items-center">
                            {/* <i className="ri-home-2-fill"></i> */}
                            <HomeTwoTone />
                            <span className="m-l-8">Số 1 Phố Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội</span>
                        </p>
                        <p className="d-flex align-items-center">
                            <MailTwoTone />
                            <span className="m-l-8">ttbstore@gmail.com</span>
                        </p>
                        <p className="d-flex align-items-center">
                            <PhoneTwoTone />
                            <span className="m-l-8">0986856852</span>
                        </p>
                        <p className="d-flex align-items-center">
                            <PrinterTwoTone />
                            <span className="m-l-8">0986856852</span>
                        </p>
                    </div>
                    <div className="justify-content-center ">
                        <p className="copyright__text bor-top">
                            Copyright 2022 All Rights Reserved By :
                            <a href="#" style={{ textDecoration: 'none' }}>
                                <strong className="text-infor">TTB Store</strong>
                            </a>
                        </p>
                    </div>
                    <div className="social__links row d-flex justify-content-center ">
                        <div className="text-center">
                            <ul className="list-unstyled list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-facebook-circle-fill"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-twitter-fill"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-linkedin-fill"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-youtube-fill"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-google-play-fill"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className="text-dark">
                                        <i className="ri-app-store-fill"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
