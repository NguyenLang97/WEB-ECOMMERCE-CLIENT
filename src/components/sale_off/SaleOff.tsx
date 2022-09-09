import { Button, Carousel } from 'antd'
import 'antd/dist/antd.css'
import './sale_off.scss'

// Do cả chương trình chỉ có 1 list carousel
// Nên lưu thẳng vào đây để đỡ tốn chi phí query
const list = [
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/8_ontuqq.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134535/saleOff/carousels/2_b1d6dd.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134534/saleOff/carousels/4_amgb7n.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134535/saleOff/carousels/5_kfuyu2.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134534/saleOff/carousels/1_ggor4n.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134536/saleOff/carousels/6_kt4deu.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134534/saleOff/carousels/3_wwgin5.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/7_gokjlq.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/9_qq407q.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/10_pcgl2j.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/11_vhqqe1.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/12_crycbe.webp',
    'https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134778/saleOff/carousels/13_ytp67u.webp',
]

function SaleOff() {
    return (
        // <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        //     <div className="carousel-indicators">
        //         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        //         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        //         <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        //     </div>
        //     <div className="carousel-inner">
        //         <div className="carousel-item active">
        //             <img src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134778/saleOff/carousels/13_ytp67u.webp" className="d-block w-100" alt="..." />
        //         </div>
        //         <div className="carousel-item">
        //             <img src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/12_crycbe.webp" className="d-block w-100" alt="..." />
        //         </div>
        //         <div className="carousel-item">
        //             <img src="https://res.cloudinary.com/tuan-cloudinary/image/upload/v1608134777/saleOff/carousels/11_vhqqe1.webp" className="d-block w-100" alt="..." />
        //         </div>
        //     </div>
        //     <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        //         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Previous</span>
        //     </button>
        //     <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        //         <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span className="visually-hidden">Next</span>
        //     </button>
        // </div>
        <Carousel className="Sale-Off " autoplay>
            {list.map((item, index) => (
                <img className="Sale-Off-img" src={item} key={index} />
            ))}
        </Carousel>
    )
}

export default SaleOff
