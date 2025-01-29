
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { Shopcart } from "clothing-store-shared/types"
import { createReducer } from "react-observer-context"

type ShopcartEdit = Omit<Shopcart, "expired_at"> & { expired_at: null | number }

type Actions = {
    set: ShopcartEdit
    removeProduct: string
    changeQuantity: { quantity: number, id: string }
    addProducts: Array<ShopcartProductSchema.BaseInShopcart>
    reset: undefined
}

const default_shipping = { cost_based_shipping: 0, min_free_shipping: 0 }

const shopcartReducer = createReducer<ShopcartEdit, Actions>({
    state: {
        expired_at: null,
        products: [],
        shipping: default_shipping
    },
    actions: {
        set(state, payload) {
            const { expired_at, products, shipping } = payload
            state.expired_at = expired_at
            state.products = products
            state.shipping = shipping
        },
        removeProduct: (state, payload) => {
            const filter = state.products.filter(i => i.id !== payload)
            state.products = filter
            if (state.products.length === 0) {
                state.expired_at = null
                state.shipping = default_shipping
            }
        },
        addProducts(state, payload) {
            const products = structuredClone(state.products)
            for (const e of payload) {
                const { color_fk, product_fk, size_fk, quantity } = e
                const isRepeated = products.find(i => i.color_fk == color_fk && i.product_fk == product_fk && i.size_fk == size_fk)
                if (isRepeated) {
                    isRepeated.quantity = quantity
                } else {
                    products.push(e)
                }
            }
            state.products = products
        },
        changeQuantity: (state, payload) => {
            state.products = state.products.map(i => {
                if (i.id == payload.id) {
                    return {
                        ...i,
                        quantity: payload.quantity
                    }
                } else {
                    return i
                }
            })
        },
        reset(state) {
            state.products = []
            state.expired_at = null
            state.shipping = default_shipping
        },
    }
})


export default shopcartReducer