import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'
import { Button, Row, Col, message } from 'antd'

import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/cart/cart.action'

import './product_details.scss'
import ProductCard from '../../components/ui/product-card/ProductCard'
import { useMemo } from 'react'
import Policy from './Policy/Policy'
import { doc, setDoc, addDoc, collection, serverTimestamp, onSnapshot, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import Comment from './comment/Comment'
import RootReducerState from '../../models/root_reducer'
import AddCartItemState from '../../models/add_cartItem'
import ConvertCategory from '../../components/ConvertCategory/ConvertCategory'

const ProductDetails = () => {
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [previewImg, setPreviewImg] = useState()
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const currentUser = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const username = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.username)
    const img = useSelector((state: RootReducerState) => state.AuthReducer.infoUser?.img)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

    const { id } = useParams()
    console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list: any[] = []
                snapShot.docs.forEach((doc, index) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                setAllProducts(list)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    const product = useMemo(() => {
        if (allProducts) return allProducts.find((item) => item.id === id)
    }, [allProducts])

    const relatedProduct = allProducts.filter((item) => product.category === item.category)
    console.log('sl', product)

    const addProduct = () => {
        if (product) {
            const { id, title, price, category, description, img, total } = product
            if (Number(total) > 0) {
                console.log('tang')

                // if (cartItems.length) {
                //     const quantity = (cartItems.find((item: any) => item.id === id) as any).quantity
                //     console.log('sl', cartItems)

                //     if (Number(product.total) > quantity) {
                //         console.log('dat hang')

                dispatch(
                    addItem({
                        id,
                        title,
                        price,
                        img,
                        total,
                    })
                )
                // } else {
                //     message.error({
                //         content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                //         duration: 3,
                //     })
                // }
            } else {
                message.error({
                    content: 'Rất tiếc sản phẩm đã hết hàng, Vui lòng liên hệ chúng tôi',
                    duration: 3,
                })
            }
            // }
        }
    }

    // useEffect(() => {
    //     setPreviewImg(product.image01)
    // }, [product])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [product])

    return (
        <>
            {product ? (
                <Helmet title="Product-details">
                    <CommonSection title={product.title} />
                    <section className="product-details container ">
                        <Row gutter={16}>
                            <Col span={24} lg={18} md={18} className="bg-white bor-rad-8 p-12 mb-4 w-100">
                                <Row gutter={16} className="bg-white bor-rad-8 p-12 w-100">
                                    <Col span={24} lg={8} md={8} sm={24} className="product__lits-img d-flex flex-column">
                                        <Row className="product__main-img d-flex justify-content-center">
                                            <img style={{ maxWidth: 180, maxHeight: 180 }} src={previewImg || product.img[0].img} alt="" className="bor-rad-8 outlined" />
                                        </Row>
                                        <Row className="product__images d-flex flex-row  justify-content-center mt-4">
                                            {product.img.map((item: any, index: number) => (
                                                <div key={index} className="product__image-item mb-3" onClick={() => setPreviewImg(item.img)}>
                                                    <img style={{ maxWidth: 80, maxHeight: 80 }} src={item.img} alt="" className="img__item bor-rad-8 outlined" />
                                                </div>
                                            ))}
                                        </Row>
                                        <p className="product__specification ">
                                            Specification: <pre className="white-space-wrap">{product.specification}</pre>
                                        </p>
                                    </Col>

                                    <Col span={24} lg={16} md={16} sm={24} className="product-details__content p-lr-16">
                                        <h3 className="product__title mb-3">{product.title}</h3>

                                        <p className="category mb-5">
                                            Category: <span>{ConvertCategory(product.category)}</span>
                                        </p>
                                        <p className="category mb-5">
                                            Quantity: <span>{product.total}</span>
                                        </p>
                                        <p className="product__price">
                                            {' '}
                                            Price: <span>${product.price}</span>
                                        </p>

                                        <Button size="large" className="w-100 btn btn-group-item" style={{ backgroundColor: '#3555c5' }} onClick={() => addProduct()}>
                                            Add to Cart
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24} lg={6} md={6} className="">
                                <Policy />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} lg={24} md={24} className="bg-white bor-rad-8  mt-4">
                                <div className="tabs d-flex align-items-center gap-5 py-3 p-12">
                                    <h3 className="desc">Mô tả sản phẩm</h3>
                                </div>

                                <div className="tab__content p-12 ">
                                    <pre className="white-space-wrap">{product.description}</pre>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} lg={24} md={24} className="bg-white bor-rad-8 p-12 mt-4">
                                <Comment />
                            </Col>
                        </Row>
                        <Row className="bg-white bor-rad-8 mt-4 p-r-16">
                            <Col span={24} lg={24} md={24} sm={24} className="mb-5 mt-4 text-center">
                                {/* <h2 className="">You might also like</h2> */}
                                <h2 className="">Sản phẩm tương tự</h2>
                            </Col>

                            {relatedProduct.map((item) => (
                                <Col span={24} lg={6} md={12} sm={24} xs={24} className="mb-4" key={item.id}>
                                    <ProductCard item={item} />
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Helmet>
            ) : (
                <div>loading</div>
            )}
        </>
    )
}

export default ProductDetails
