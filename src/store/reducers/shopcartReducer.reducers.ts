
import { ProductShopcart } from "@/interfaces/Product.interfaces"
import { shopCartProductsMock } from "@/mocks/shopcart.mocks"
import { createReducer } from "react-observer-context"

type State = {
    products: Array<ProductShopcart>,
    modal: boolean
}

type Actions = {
    set: ProductShopcart
    remove: number
    changeQuantity: { quantity: number, waistID: number }
}


const shopcartReducer = createReducer<State, Actions>({
    state: {
        products: shopCartProductsMock,
        modal: false
    },
    actions: {
        set(state, payload) {
            const copiedProductos = [...state.products]
            const findProduct = copiedProductos.findIndex((i) => i.waistID === payload.waistID)
            if (findProduct >= 0) {
                copiedProductos[findProduct].quantity += payload.quantity
            } else {
                copiedProductos.push(payload)
            }
            state.products = copiedProductos
        },
        remove: (state, payload) => {
            const filter = state.products.filter(i => i.waistID !== payload)
            state.products = filter
        },
        changeQuantity: (state, { quantity, waistID }) => {
            const products = state.products.map(i => {
                if (i.waistID == waistID) {
                    const isLessThanZero = quantity + i.quantity < 0 ? 0 : quantity + i.quantity
                    return { ...i, quantity: isLessThanZero }
                }
                return i
            })
            state.products = products
        },
    }
})


export default shopcartReducer