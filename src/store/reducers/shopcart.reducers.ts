
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { Shopcart } from "clothing-store-shared/types"
import { createReducer } from "react-observer-context"

type ShopcartEdit = Omit<Shopcart, "expired_at"> & { expired_at: null | number }

type Actions = {
    hydrateShopcart: ShopcartEdit
    remove: string
    changeQuantity: { quantity: number, id: string }
    addProducts: Array<ShopcartProductSchema.BaseInShopcart>
    changeExpired: number | null
}

const shopcartReducer = createReducer<ShopcartEdit, Actions>({
    state: {
        expired_at: null,
        products: [],
    },
    actions: {
        hydrateShopcart(state, payload) {
            const { expired_at, products } = payload
            state.expired_at = expired_at
            state.products = products
        },
        remove: (state, payload) => {
            const filter = state.products.filter(i => i.id !== payload)
            state.products = filter
            if (state.products.length === 0) {
                state.expired_at = null
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
        changeExpired(state, payload) {
            state.expired_at = payload
        },
    }
})


export default shopcartReducer