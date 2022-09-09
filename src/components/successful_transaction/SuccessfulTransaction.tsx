import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const SuccessfulTransaction = () => {
    return (
        <div>
            <Result
                status="success"
                title="Đơn hàng của bạn đã đặt thành công."
                subTitle="Xem chi tiết đơn hàng vừa rồi"
                extra={[
                    <Button type="default" key="0">
                        <Link to={'/orders'}>Xem chi tiết đơn hàng</Link>
                    </Button>,
                    <Button key="1" type="primary">
                        <Link to="/">Tiếp tục mua sắm</Link>
                    </Button>,
                ]}
            />
        </div>
    )
}

export default SuccessfulTransaction
