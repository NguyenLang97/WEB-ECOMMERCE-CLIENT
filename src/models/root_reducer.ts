export default interface RootReducerState {
    AuthReducer: {
        currentUser: string
        infoUser: {
            username: boolean
            img: string
            address: string
            phone: string
            fullname: string
            email: string
            yearofbirth: string
        }
    }
    CartReducer: {
        totalQuantity: number
        cartItems: []
        totalAmount: number
    }
    CartUiReducer: {
        cartIsVisible: boolean
    }
}
