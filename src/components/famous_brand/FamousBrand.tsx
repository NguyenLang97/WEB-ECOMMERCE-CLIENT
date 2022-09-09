import React from 'react'
import { Col, Row } from 'antd'
import './famous_brand.scss'

type ListFamousBrandState = [{ link: string; src: string; title: string; desc: string }]
// fn: hiển thị danh sách thương hiệu
function showBrandList(list: ListFamousBrandState) {
    return list.map((item, index) => (
        <Col span={12} md={6} key={index}>
            <div className="brand-item text-center">
                <a href={item.link} target="blank">
                    <img className="bor-rad-8" width="100%" src={item.src} alt="Photo" />
                </a>
                <h4>{item.title}</h4>
                <span>{item.desc}</span>
            </div>
        </Col>
    ))
}

// danh sách thương hiệu
const list = [
    {
        link: 'https://vn.msi.com/',
        src: 'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268385/famous-brands/msi_zjnihe.webp',
        title: 'MSI',
        desc: 'Bé rồng đỏ siêu cute, gaming',
    },
    {
        link: 'https://www8.hp.com/us/en/home.html',
        src: 'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268384/famous-brands/hp_cdxdv8.webp',
        title: 'HP',
        desc: 'Laptop siêu cấp vip pro',
    },
    {
        link: 'https://www.lenovo.com/vn/vn/',
        src: 'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268384/famous-brands/lenovo_trmmkt.webp',
        title: 'LENOVO',
        desc: 'Siêu ưu đãi cùng với LENOVO',
    },
    {
        link: 'https://www.lg.com/vn',
        src: 'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608268384/famous-brands/lg_yijaob.webp',
        title: 'LG',
        desc: 'Sản phẩm siêu chất lượng',
    },
]

// rendering ...
function FamousBrand() {
    return (
        <div className="p-16 famous-brand">
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <h2 className="fw-bold pt-2">Thương hiệu nổi bật</h2>
                    <div className="underline-title"></div>
                </Col>
                {showBrandList(list as ListFamousBrandState)}
            </Row>
        </div>
    )
}

export default FamousBrand
