import { UserAddressesSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"




type Actions = {
    set: UserAddressesSchema.Base
    update: Partial<UserAddressesSchema.Base>
}

const userAddressReducer = createReducer<UserAddressesSchema.Base, Actions>({
    state: {
        locality: "",
        postal_code: "",
        province: "",
        street: "",
        user_address_id: 0,
        user_fk: 0,
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



export default userAddressReducer