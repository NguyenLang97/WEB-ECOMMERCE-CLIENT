export default interface CartItemsState {
    id: string
    title: string
    price: number
    quantity: number
    totalPrice: number
    img: [{ img: string }]
    totalAmountOrder: number
    totalStock: number
    total: number
}
