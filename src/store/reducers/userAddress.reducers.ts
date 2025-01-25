import { UserAddressesSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"


type State = {
    address?: UserAddressesSchema.Base,
}

type Actions = {
    set: UserAddressesSchema.Base
    reset: undefined,
    update: Partial<UserAddressesSchema.Base>
}

const userAddressReducer = createReducer<State, Actions>({
    state: {
    },
    actions: {
        set(state, payload) {
            state.address = payload
        },
        update(state, payload) {
            if (state.address) {
                state.address = {
                    ...state.address,
                    ...payload
                }
            }
        },
        reset(state) {
            state.address = undefined
        }
    },

})



export default userAddressReducer