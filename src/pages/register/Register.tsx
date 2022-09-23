import React, { useRef, useState } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { EyeInvisibleOutlined, EyeTwoTone, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Col, message, Row, Tooltip, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authStart } from '../../store/auth/auth.action'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const signupFullNameRef = useRef()
    // const signupUserNameRef = useRef()
    // const signupEmailRef = useRef()
    // const signupPasswordRef = useRef()

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const fullname = signupFullNameRef.current.value
        // const email = signupEmailRef.current.value
        // const username = signupUserNameRef.current.value
        // const password = signupPasswordRef.current.value
        const isRegister = true
        console.log({ email, password, isRegister, fullname, username })
        dispatch(authStart({ email, password, isRegister, fullname, username }))
    }

    return (
        // <Helmet title="Signup">
        //     <CommonSection title="Signup" />
        //     <section>
        //         <Container>
        //             <Row>
        //                 <Col lg="6" md="6" sm="12" className="m-auto text-center">
        //                     <form className="form mb-5" onSubmit={submitHandler}>
        //                         <div className="form__group">
        //                             <input type="text" placeholder="Full name" required ref={signupFullNameRef} />
        //                         </div>
        //                         <div className="form__group">
        //                             <input type="text" placeholder="Username" required ref={signupUserNameRef} />
        //                         </div>
        //                         <div className="form__group">
        //                             <input type="email" placeholder="Email" required ref={signupEmailRef} />
        //                         </div>
        //                         <div className="form__group">
        //                             <input type="password" placeholder="Password" required ref={signupPasswordRef} />
        //                         </div>
        //                         <button type="submit" className="addToCart__btn">
        //                             Sign Up
        //                         </button>
        //                     </form>
        //                     <Link to="/login">Already have an account? Login</Link>
        //                 </Col>
        //             </Row>
        //         </Container>
        //     </section>
        // </Helmet>
        <Helmet title="Login">
            <div className="mask d-flex align-items-center h-100 gradient-custom-3">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div className="card my-2 " style={{ borderRadius: '15px' }}>
                                <div className="card-body p-5">
                                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                                    <form onSubmit={submitHandler}>
                                        <div className="mb-4 ">
                                            <label className="form-label" htmlFor="form3Example1cg">
                                                Fullname
                                            </label>
                                            <Input
                                                type="text"
                                                id="form3Example1cg"
                                                className="p-2"
                                                placeholder="Fullname"
                                                defaultValue={email}
                                                required
                                                onChange={(e) => setFullname(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-4 ">
                                            <label className="form-label" htmlFor="form3Example2cg">
                                                Username
                                            </label>
                                            <Input
                                                type="text"
                                                id="form3Example2cg"
                                                className="p-2"
                                                placeholder="Username"
                                                defaultValue={email}
                                                required
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
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
                                                Register
                                            </Button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Have already an account?{' '}
                                            <Link to="/login" className="fw-bold t-link">
                                                <u>Login here</u>
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

        // <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        //     <div className="container h-100">
        //         <div className="row d-flex justify-content-center align-items-center h-100">
        //             <div className="col-12 col-md-9 col-lg-7 col-xl-6">
        //                 <div className="card my-2 " style={{ borderRadius: '15px' }}>
        //                     <div className="card-body p-5">
        //                         <h2 className="text-uppercase text-center mb-5">Create an account</h2>
        //                         <form onSubmit={submitHandler}>
        //                             {/* <div className="mb-4">
        //                         <label className="form-label" for="form3Example1cg">
        //                             Your Name
        //                         </label>
        //                         <input type="text" id="form3Example1cg" className="text-secondary form-control focusedInput" placeholder="Your Name" />
        //                     </div> */}

        //                             <div className="mb-4">
        //                                 <label className="form-label" for="form3Example3cg">
        //                                     Your Email
        //                                 </label>
        //                                 <input type="email" id="form3Example3cg" className="text-secondary form-control focusedInput" />
        //                             </div>

        //                             <div className="mb-4">
        //                                 <label className="form-label" for="form3Example4cg">
        //                                     Password
        //                                 </label>
        //                                 <input type="password" id="form3Example4cg" className="text-secondary form-control focusedInput" />
        //                             </div>

        //                             <div className="form-check d-flex justify-content-center mb-5">
        //                                 <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
        //                                 <label className="form-check-label" for="form2Example3g">
        //                                     I agree all statements in{' '}
        //                                     <a href="#!" className="text-body">
        //                                         <u>Terms of service</u>
        //                                     </a>
        //                                 </label>
        //                             </div>

        //                             <div className="d-flex justify-content-center">
        //                                 <button type="button" className="btn btn-success    ">
        //                                     Register
        //                                 </button>
        //                             </div>

        //                             <p className="text-center text-muted mt-5 mb-0">
        //                                 Have already an account?{' '}
        //                                 <a href="#!" className="fw-bold text-body">
        //                                     <u>Login here</u>
        //                                 </a>
        //                             </p>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Register
