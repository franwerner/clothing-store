import { StoreConfigSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"

type State = {
    config?: StoreConfigSchema.Base
}
type Actions = {
    set: StoreConfigSchema.Base
    update: Partial<StoreConfigSchema.Base>
}

const storeConfigReducer = createReducer<State, Actions>({
    state: {
    },
    actions: {
        set(state, payload) {
            state.config = payload
        },
        update(state, payload) {
            if (state.config) {
                state.config = {
                    ...state.config,
                    ...payload
                }
            }
        },
    },

})

export default storeConfigReducer