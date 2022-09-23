export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'
export const RESET_CART = 'RESET_CART'

export const addItem = (payload) => ({
    type: ADD_ITEM,
    payload,
})
export const removeItem = (payload) => ({
    type: REMOVE_ITEM,
    payload,
})
export const deleteItem = (payload) => ({
    type: DELETE_ITEM,
    payload,
})

export const resetCart = () => {
    return {
        type: RESET_CART,
    }
}
