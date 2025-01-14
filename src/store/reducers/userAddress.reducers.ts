import { UserAddresessSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"


type State = {
    address?: UserAddresessSchema.Base,
}

type Actions = {
    set: UserAddresessSchema.Base
    reset: undefined,
    update: Partial<UserAddresessSchema.Base>
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