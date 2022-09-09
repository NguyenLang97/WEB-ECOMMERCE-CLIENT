import React, { useRef, useEffect } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Col, message, Row, Tooltip, Input } from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authStart } from '../../store/auth/auth.action'
import './login.scss'
import { useState } from 'react'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const loginEmailRef = useRef()
    // const loginPasswordRef = useRef()

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const email = loginEmailRef.current.value
        // const password = loginPasswordRef.current.value
        const isRegister = false
        console.log('1', email)

        dispatch(authStart({ email, password, isRegister }))
        navigate('/home')
    }

    return (
        // <Helmet title="Login">
        //     <CommonSection title="Login" />
        //     <section>
        //         <Row>
        //             <Col lg="6" md="6" sm="12" className="m-auto text-center">
        //                 <form className="form mb-5" onSubmit={submitHandler}>
        //                     <div className="form__group">
        //                         <input type="email" placeholder="Email" value="huonglang@gmail.com" required ref={loginEmailRef} />
        //                     </div>
        //                     <div className="form__group">
        //                         <input type="password" placeholder="Password" value="123456" required ref={loginPasswordRef} />
        //                     </div>
        //                     <button type="submit" className="addToCart__btn">
        //                         Login
        //                     </button>
        //                 </form>
        //                 <Link to="/register">Don't have an account? Create an account</Link>
        //             </Col>
        //         </Row>
        //     </section>
        // </Helmet>
        <Helmet title="Login">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card my-2 " style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Sign In</h2>
                                    <form onSubmit={submitHandler}>
                                        <div className="mb-4 ">
                                            <label className="form-label" htmlFor="form3Example3cg">
                                                Your Email
                                            </label>
                                            <Input type="email" id="form3Example3cg" className="p-2" placeholder="Email" defaultValue={email} required onChange={(e) => setEmail(e.target.value)} />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label" htmlFor="form3Example4cg">
                                                Password
                                            </label>
                                            <Input
                                                type="password"
                                                id="form3Example4cg"
                                                className="p-2"
                                                placeholder="Password"
                                                defaultValue={password}
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>

                                        <div className="form-check d-flex justify-content-center mb-5">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                                            <label className="form-check-label" htmlFor="form2Example3g">
                                                I agree all statements in{' '}
                                                <a href="#!" className="text-body">
                                                    <u>Terms of service</u>
                                                </a>
                                            </label>
                                        </div>

                                        <div className="d-flex justify-content-center">
                                            <Button htmlType="submit" className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }}>
                                                Sign In
                                            </Button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Do not have an account?{' '}
                                            <Link to="/register" className="fw-bold t-link">
                                                <u>Register Here</u>
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    )
}

export default Login
