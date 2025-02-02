
import { DatabaseKeySchema, ShopcartProductSchema } from "clothing-store-shared/schema"
import { Shopcart } from "clothing-store-shared/types"
import { createReducer } from "react-observer-context"

interface ShopcartReducer extends Omit<Shopcart, "expired_at"> {
    expired_at: number
}

type Actions = {
    set: ShopcartReducer
    removeProduct: DatabaseKeySchema
    changeQuantity: { quantity: number, id: DatabaseKeySchema }
    addProducts: Array<ShopcartProductSchema.BaseInShopcart>
}

const default_shipping = { cost_based_shipping: 0, min_free_shipping: 0 }

const shopcartReducer = createReducer<ShopcartReducer, Actions>({
    state: {
        expired_at: 0,
        products: [],
        shipping: default_shipping,
    },
    actions: {
        set(state, payload) {
            const { expired_at, products, shipping } = payload
            return {
                ...state,
                shipping,
                expired_at,
                products
            }
        },
        removeProduct: (state, payload) => {
            const filter = state.products.filter(i => i.id !== payload)
            const isVoid = filter.length === 0
            return {
                ...state,
                products: filter,
                expired_at: isVoid ? 0 : state.expired_at,
                shipping: isVoid ? default_shipping : state.shipping
            }
        },
        addProducts(state, payload) {
            return {
                ...state,
                products: payload
            }
        },
        changeQuantity: (state, payload) => {
            const products = state.products.map(i => {
                if (i.id == payload.id) {
                    return {
                        ...i,
                        quantity: payload.quantity
                    }
                } else {
                    return i
                }
            })

            return {
                ...state,
                products
            }
        },
    }
})


export default shopcartReducer