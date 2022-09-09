import Header from '../header/Header'
import Footer from '../footer/Footer'
import Routes from '../../routes/Routers'

import Carts from '../ui/cart/Carts'
import { useSelector } from 'react-redux'
import RootReducerState from '../../models/root_reducer'
import { Skeleton } from 'antd'

const Layout = () => {
    const showCart = useSelector((state: RootReducerState) => state.CartUiReducer.cartIsVisible)
    return (
        <div>
            <Header />
            {showCart && <Carts />}
            <div>
                <Routes />
            </div>
            <Footer />
        </div>
    )
}

export default Layout
