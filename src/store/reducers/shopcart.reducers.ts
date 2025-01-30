
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { Shopcart } from "clothing-store-shared/types"
import { createReducer } from "react-observer-context"

interface ShopcartReducer extends Omit<Shopcart,"expired_at"> {
    expired_at : null | number
}

type Actions = {
    set: ShopcartReducer
    removeProduct: string
    changeQuantity: { quantity: number, id: string }
    addProducts: Array<ShopcartProductSchema.BaseInShopcart>
}

const default_shipping = { cost_based_shipping: 0, min_free_shipping: 0 }

const shopcartReducer = createReducer<ShopcartReducer, Actions>({
    state: {
        expired_at: null,
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
                expired_at: isVoid ? null : state.expired_at,
                shipping: isVoid ? default_shipping : state.shipping
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
            return {
                ...state,
                products
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