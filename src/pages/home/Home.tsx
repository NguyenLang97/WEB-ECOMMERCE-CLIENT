import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Helmet from '../../components/helmet/Helmet'
import { Col, Row } from 'antd'

// import Category from '../../components/ui/category/Category'
import _ from 'lodash'

import './home.scss'

// import products from '../../api/products'

import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'
import mobileImg from '../../assets/products/mobile_32px.png'
import mouseImg from '../../assets/products/mouse_32px.png'
import laptopImg from '../../assets/products/laptop_32px.png'

import ProductCard from '../../components/ui/product-card/ProductCard'
import SaleOff from '../../components/sale_off/SaleOff'
import FamousBrand from '../../components/famous_brand/FamousBrand'
import RootReducerState from '../../models/root_reducer'
import ReactPaginate from 'react-paginate'

const Home = () => {
    const [category, setCategory] = useState('ALL')
    const [pageNumber, setPageNumber] = useState(0)
    const [allProducts, setAllProducts] = useState([])
    const [filter, setFilter] = useState(allProducts)
    const [loading, setLoading] = useState(true)
    const [hotProduct, setHotProduct] = useState([])

    const currentUser = useSelector((state: RootReducerState) => state.AuthReducer.currentUser)
    const infoUser = useSelector((state: RootReducerState) => state.AuthReducer.infoUser)

    const totalAmount = useSelector((state: RootReducerState) => state.CartReducer.totalAmount)
    const cartItems = useSelector((state: RootReducerState) => state.CartReducer.cartItems)
    const totalQuantity = useSelector((state: RootReducerState) => state.CartReducer.totalQuantity)
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
        localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        localStorage.setItem('totalAmount', JSON.stringify(totalAmount))
    }, [totalQuantity])

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser))
        localStorage.setItem('infoUser', JSON.stringify(infoUser))
    }, [currentUser])

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, 'products'),
            (snapShot) => {
                let list: any = []
                snapShot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                })
                const cloneList = _.clone(list)
                setFilter(cloneList)
                setAllProducts(list)

                const filteredPizza = list.filter((item: any) => item.category === 'phone')
                const slicePizza = filteredPizza.slice(0, 4)
                setHotProduct(slicePizza)
                setLoading(false)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])
    // console.log('allProducts:', allProducts)
    const filterProduct = (category: string) => {
        const updateProduct = allProducts.filter((item: any) => item.category === category)
        setFilter(updateProduct)
    }

    // Phân trang
    const productPerPage = 8
    const visitedPage = pageNumber * productPerPage
    const displayPage = filter.slice(visitedPage, visitedPage + productPerPage)

    const pageCount = Math.ceil(filter.length / productPerPage)

    const changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        if (category === 'ALL') {
            setFilter(allProducts)
        }

        if (category === 'laptop') {
            filterProduct('laptop')
        }

        if (category === 'mouse') {
            filterProduct('mouse')
        }

        if (category === 'phone') {
            filterProduct('phone')
        }
    }, [category])

    return (
        <div className="home">
            <Helmet title="home">
                {/* Sale off */}
                <section className="">
                    <SaleOff />
                </section>

                {/* Thương hiệu nổi bật */}
                <section className="home__famous-brand-wrap container">
                    <Row>
                        <Col className="home__famous-brand bg-white box-sha-home bor-rad-8 ">
                            <FamousBrand />
                        </Col>
                    </Row>
                </section>

                {/* Quảng cáo */}
                <section className="home__adv-wrap container">
                    <Row>
                        <Col className="home__adv w-100">
                            <a href="https://www.apple.com/watch/" target="blank">
                                <img className="home__adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/1_iorzsj.webp" />
                            </a>
                        </Col>
                    </Row>
                </section>

                <section className="home__category-wrap container">
                    <Row className="w-100 bg-white bor-rad-8 mt-5 p-3">
                        <Col span={24} className="text-center">
                            <h2>Sản phẩm phổ biến</h2>
                        </Col>

                        <Col span={24}>
                            <div className="home__category d-flex align-items-center justify-content-between gap-4-xl flex-wrap">
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`all__btn  ${category === 'ALL' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('ALL')}>
                                        All
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'laptop' ? 'home__category-btn--active' : ''} `} onClick={() => setCategory('laptop')}>
                                        <img src={laptopImg} alt="" />
                                        Laptop
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'phone' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('phone')}>
                                        <img src={mobileImg} alt="" />
                                        Điện thoại
                                    </button>
                                </Col>
                                <Col sm={6} md={6} lg={6} xl={6}>
                                    <button className={`d-flex align-items-center ${category === 'mouse' ? ' home__category-btn--active' : ''} `} onClick={() => setCategory('mouse')}>
                                        <img src={mouseImg} alt="" />
                                        Chuột
                                    </button>
                                </Col>
                            </div>
                        </Col>
                        <Row className="w-100 bg-white bor-rad-8 mt-5 p-3">
                            {displayPage.map((item: any) => (
                                <Col span={24} sm={12} lg={8} xl={6} key={item.id} className="w-100">
                                    <ProductCard item={item} />
                                </Col>
                            ))}
                        </Row>
                        <Row className='w-100'>
                            <Col span={24}>
                                <ReactPaginate pageCount={pageCount} onPageChange={changePage} previousLabel={'Prev'} nextLabel={'Next'} containerClassName=" paginationBttns " />
                            </Col>
                        </Row>
                    </Row>
                </section>

                {/* Quảng cáo */}
                <section className="home__adv-wrap container">
                    <Row>
                        <Col className="home__adv w-100">
                            <a href="https://www.panasonic.com/vn/" target="blank">
                                <img className="home__adv-img w-100 bor-rad-8" src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268459/others/2_wapowv.webp" />
                            </a>
                        </Col>
                    </Row>
                </section>

                {/* Sản phẩm bán chạy: Laptop */}
                <section className="container">
                    <Row>
                        <Col span={24} className="text-center ">
                            <h2>Sản phẩm bán chạy</h2>
                        </Col>
                    </Row>
                    <Row className="w-100 bg-white bor-rad-8 mt-5 p-3">
                        {hotProduct.map((item: any) => (
                            <Col span={24} sm={12} lg={8} xl={6} key={item.id}>
                                <ProductCard item={item} />
                            </Col>
                        ))}
                    </Row>
                </section>
            </Helmet>
        </div>
    )
}

export default Home
