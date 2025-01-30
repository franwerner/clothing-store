import { StoreConfigSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"


type Actions = {
    set: StoreConfigSchema.Base
    update: Partial<StoreConfigSchema.Base>
}

const storeConfigReducer = createReducer<StoreConfigSchema.Base, Actions>({
    state: {
        contact_email: "",
        contact_phone: "",
        cost_based_shipping: 0,
        instagram: "",
        location: "",
        min_free_shipping: 0,
        store_config_id: 0,
        whatsapp: "",
        is_maintenance: 1
    },
    actions: {
        set(_, payload) {
            return payload
        },
        update(state, payload) {
            return {
                ...state,
                ...payload
            }


        },
    },

})

export default storeConfigReducer