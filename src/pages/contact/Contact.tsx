import React, { ChangeEvent, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { contactConfig } from './content_option/ContentOption'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import './contact.scss'

const Contact = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })

    const { name, email, subject, message } = state
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name || !email || !subject || !message) {
            toast.error('Please provide value in each input field')
        } else {
            // firebaseDB.child('contacts').push(state)
            setState({ name: '', email: '', subject: '', message: '' })
            toast.success('Form Submitted Successfully')
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target
        setState({ ...state, [name]: value })
    }
    return (
        <Helmet title="Contact">
            <CommonSection title="Contact" />
            <section className="contact-section">
                <div className="container">
                    <ToastContainer position="top-right" z-index="9999" />
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="wrapper">
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <div className="contact-wrap w-100 p-lg-5 p-4">
                                            <h3 className="mb-4">Send us a message</h3>
                                            <form id="contactForm" className="contactForm" onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="name" placeholder="Name" onChange={handleInputChange} value={name} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="email" className="form-control" name="email" placeholder="Email" onChange={handleInputChange} value={email} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="text" className="form-control" name="subject" placeholder="Subject" onChange={handleInputChange} value={subject} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                // type="text"
                                                                className="form-control"
                                                                name="message"
                                                                placeholder="Message"
                                                                cols={30}
                                                                rows={6}
                                                                // onChange={handleInputChange}
                                                                value={message}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input type="submit" value="Send Message" className="btn btn-primary" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-stretch">
                                        <div className="info-wrap w-100 p-lg-5 p-4 img">
                                            <h3>Contact us</h3>
                                            <p className="mb-4">We are open for any suggestion or just to have a chat</p>
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <i className="ri-map-pin-2-fill"></i>
                                                </div>
                                                <div className="text pl-3 d-flex">
                                                    <p>
                                                        <span>Address:</span> 198 West 21th Street, Suite 721 New York NY 10016
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <i className="ri-phone-fill"></i>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Phone:</span>
                                                        <a href="tel://123456789">+1235 2355 98</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <i className="ri-send-plane-fill"></i>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Email:</span>
                                                        <a href="mailto:info@yoursite.com">ttbstore@gmail.com</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <i className="ri-global-fill"></i>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Website:</span>
                                                        <a href="#">ttbstore.com</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}

export default Contact
