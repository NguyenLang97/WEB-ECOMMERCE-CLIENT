import React, { useState, useEffect } from 'react'
import Helmet from '../../components/helmet/Helmet'
import CommonSection from '../../components/ui/common-section/CommonSection'

import { Row, Col, Menu } from 'antd'
import 'antd/dist/antd.css'
import Icon, { AppstoreOutlined, GoldOutlined, LaptopOutlined, MailOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons'
import {
    collection,
    // getDocs,
    onSnapshot,
} from 'firebase/firestore'
import { db } from '../../firebase/firebase_config'

import ProductCard from '../../components/ui/product-card/ProductCard'
import ReactPaginate from 'react-paginate'
import cameraIcon from '../../assets/products/camera_32px.png'
import displayIcon from '../../assets/products/display_32px.png'
import hdtvIcon from '../../assets/products/hdtv_32px.png'
import headphoneIcon from '../../assets/products/headphones_32px.png'
import laptopIcon from '../../assets/products/laptop_32px.png'
import mainboardIcon from '../../assets/products/mainboard_32px.png'
import mobileIcon from '../../assets/products/mobile_32px.png'
import mouseIcon from '../../assets/products/mouse_32px.png'
import ramIcon from '../../assets/products/ram_32px.png'
import routerIcon from '../../assets/products/router_32px.png'
import speakerIcon from '../../assets/products/speaker_32px.png'
import ssdIcon from '../../assets/products/ssd_32px.png'
import keyboardIcon from '../../assets/products/keyboard_32px.png'

import './all_products.scss'
import '../../styles/pagination.scss'
import SubMenu from 'antd/lib/menu/SubMenu'
import _ from 'lodash'

const AllProducts = () => {
    const [searchTerm, setSearchTerm] = useState<any>('')
    const [pageNumber, setPageNumber] = useState(0)
    const [allProducts, setAllProducts] = useState<any[]>([])
    const [filter, setFilter] = useState(allProducts)

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

                // setLoading(false)
            },
            (error) => {
                console.log(error)
            }
        )
        return () => {
            unsub()
        }
    }, [])

    const searchedProduct = filter.filter((item) => {
        if (searchTerm.value === '') {
            return item
        }
        if (item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
        } else {
            return console.log('not found')
        }
    })

    // Phân trang
    const productPerPage = 8
    const visitedPage = pageNumber * productPerPage
    const displayPage = searchedProduct.slice(visitedPage, visitedPage + productPerPage)

    const pageCount = Math.ceil(searchedProduct.length / productPerPage)

    const changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

    // Menu
    const items = [
        {
            label: 'ALL',
            key: 'ALL',
            icon: <GoldOutlined />,
        },
        {
            label: 'Laptop',
            key: 'laptop',
            icon: <img src={laptopIcon} alt="" />,

            // children: [
            //     {
            //         label: 'Dell',
            //         key: 'laptop&Dell',
            //     },
            //     {
            //         label: 'MSI',
            //         key: 'laptop&MSI',
            //     },
            //     {
            //         label: 'HP',
            //         key: 'laptop&HP',
            //     },
            //     {
            //         label: 'Acer',
            //         key: 'laptop&Acer',
            //     },
            //     {
            //         label: 'ASUS',
            //         key: 'laptop&ASUS',
            //     },
            //     {
            //         label: 'Lenovo',
            //         key: 'laptop&Lenovo',
            //     },
            // ],
        },
        {
            label: 'Điện thoại',
            key: 'phone',
            icon: <img src={mobileIcon} alt="" />,
            // children: [
            //     {
            //         label: 'Iphone',
            //         key: 'phone&Iphone',
            //     },
            //     {
            //         label: 'Samsung',
            //         key: 'phone&Samsung',
            //     },
            //     {
            //         label: 'OPPO',
            //         key: 'phone&OPPO',
            //     },
            //     {
            //         label: 'Realme',
            //         key: 'phone&Realme',
            //     },
            //     {
            //         label: 'Xiaomi',
            //         key: 'phone&Xiaomi',
            //     },
            //     {
            //         label: 'Nokia',
            //         key: 'phone&Nokia',
            //     },
            //     {
            //         label: 'Vivo',
            //         key: 'phone&Vivo',
            //     },
            // ],
        },
        {
            label: 'Camera',
            key: 'camera',
            icon: <img src={cameraIcon} alt="" />,
            // children: [
            //     {
            //         label: 'Canon',
            //         key: 'camera&Canon',
            //     },
            //     {
            //         label: 'Sony',
            //         key: 'camera&Sony',
            //     },
            //     {
            //         label: 'Fujifilm',
            //         key: 'camera&Fujifilm',
            //     },
            // ],
        },
        {
            label: 'Cart màn hình',
            key: 'displaycard',
            icon: <img src={displayIcon} alt="" />,

            // children: [
            //     {
            //         label: 'GIGABYTE',
            //         key: 'displaycard&GIGABYTE',
            //     },
            //     {
            //         label: 'MSI',
            //         key: 'displaycard&MSI',
            //     },
            //     {
            //         label: 'NVIDIA',
            //         key: 'displaycard&NVIDIA',
            //     },
            //     {
            //         label: 'GALAX',
            //         key: 'displaycard&GALAX',
            //     },
            // ],
        },
        {
            label: 'Màn hình',
            key: 'screen',
            icon: <img src={hdtvIcon} alt="" />,
            // children: [
            //     {
            //         label: 'SAMSUNG',
            //         key: 'screen&SAMSUNG',
            //     },
            //     {
            //         label: 'MSI',
            //         key: 'screen&MSI',
            //     },
            //     {
            //         label: 'LG',
            //         key: 'screen&LG',
            //     },

            //     {
            //         label: 'Acer',
            //         key: 'screen&Acer',
            //     },
            // ],
        },
        {
            label: 'Bàn phím',
            key: 'keyboard',
            icon: <img src={keyboardIcon} alt="" />,
            // children: [
            //     {
            //         label: 'NEWMEN',
            //         key: 'keyboard&LOGITECH',
            //     },
            //     {
            //         label: 'LOGITECH',
            //         key: 'keyboard&CORSAIR',
            //     },
            //     {
            //         label: 'CORSAIR',
            //         key: 'keyboard&RAZER',
            //     },
            //     {
            //         label: 'RAZER',
            //         key: 'keyboard&ASUS',
            //     },
            //     {
            //         label: 'AKKO',
            //         key: 'keyboard&AKKO',
            //     },
            // ],
        },
        {
            label: 'Chuột',
            key: 'mouse',
            icon: <img src={mouseIcon} alt="" />,
            // children: [
            //     {
            //         label: 'NEWMEN',
            //         key: 'mouse&NEWMEN',
            //     },
            //     {
            //         label: 'LOGITECH',
            //         key: 'mouse&LOGITECH',
            //     },
            //     {
            //         label: 'CORSAIR',
            //         key: 'mouse&CORSAIR',
            //     },
            //     {
            //         label: 'RAZER',
            //         key: 'mouse&RAZER',
            //     },
            // ],
        },
        {
            label: 'Ổ cứng',
            key: 'harddrive',
            icon: <img src={ssdIcon} alt="" />,
            // children: [
            //     {
            //         label: 'SAMSUNG',
            //         key: 'harddrive&NEWMEN',
            //     },
            //     {
            //         label: 'GIGABYTE',
            //         key: 'harddrive&LOGITECH',
            //     },
            //     {
            //         label: 'KINGSTON',
            //         key: 'harddrive&CORSAIR',
            //     },
            //     {
            //         label: 'LACIE',
            //         key: 'harddrive&RAZER',
            //     },
            // ],
        },
    ]
    const filterProduct = (category: string) => {
        const updateProduct = allProducts.filter((item: any) => item.category === category)
        setFilter(updateProduct)
    }

    const [current, setCurrent] = useState('ALL')

    const onClick = (e: any) => {
        console.log('click ', e.key)
        if (e.key === 'ALL') {
            setFilter(allProducts)
            setCurrent(e.key)
        }
        if (e.key !== 'ALL') {
            setCurrent(e.key)
            filterProduct(e.key)
        }
    }
    console.log('filter', filter)

    const handleChangeFilter = (e: any) => {
        if (e.target.value === 'highprice') {
            const highprice = allProducts.sort((a, b) => b.price - a.price)
            console.log(highprice)

            setFilter(highprice)
        }
        if (e.target.value === 'lowprice') {
            const highprice = allProducts.sort((a, b) => a.price - b.price)
            console.log(highprice)

            setFilter(highprice)
        }
    }

    return (
        <Helmet title="All-Products">
            <CommonSection title="All Products" />

            <section className="all-products container bg-white bor-rad-8 p-16">
                <Row gutter={16} className="d-flex flex-wrap">
                    <Col span={24} xl={12} lg={12} sm={12}>
                        <div className="search__widget d-flex align-items-center justify-content-between ">
                            <input type="text" placeholder="I'm looking for...." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <span className="d-flex ">
                                <SearchOutlined />
                            </span>
                        </div>
                    </Col>

                    <Col span={24} xl={12} lg={12} sm={12} className="mb-5">
                        <div className="sorting__widget text-end">
                            <select className="w-50" onChange={handleChangeFilter}>
                                <option>Bộ lọc</option>
                                <option value="bestrating">Đánh giá tốt nhất</option>
                                <option value="bestseller">Bán chạy nhất</option>
                                <option value="bestpromotion">Khuyến mãi tốt nhất</option>
                                <option value="highprice">Giá giảm dần</option>
                                <option value="lowprice">Giá tăng dần</option>
                            </select>
                        </div>
                    </Col>
                </Row>

                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />

                <div className="lst-quickfilter q-manu m-3">
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/iPad-(Apple)522-b_4.jpg" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/samsungnew-220x48-1.png" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/OPPO42-b_5.jpg" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-5.png" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/Realme42-b_37.png" width="30" className="no-text" />
                    </div>
                    <div className="box-quicklink__item bd-radius quicklink-logo">
                        <img src="//cdn.tgdd.vn/Brand/1/Mobell42-b_19.jpg" width="30" className="no-text" />
                    </div>
                </div>

                <Row gutter={16} className="w-100">
                    {displayPage.map((item) => (
                        <Col span={24} sm={12} lg={8} xl={6} key={item.id} className="mb-4">
                            <ProductCard item={item} />
                        </Col>
                    ))}
                </Row>

                <Row >
                    <Col span={24}>
                        <ReactPaginate pageCount={pageCount} onPageChange={changePage} previousLabel={'Prev'} nextLabel={'Next'} containerClassName=" paginationBttns " />
                    </Col>
                </Row>
            </section>
        </Helmet>
    )
}

export default AllProducts
