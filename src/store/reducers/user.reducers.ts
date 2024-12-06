import { UserSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"

type State = {
    info?: UserSchema.FormatUser
}

type Actions = {
    set: UserSchema.FormatUser
    remove: undefined
}


const userReducer = createReducer<State, Actions>({
    state: {
    },
    actions: {
        set(state, payload) {
            state.info = payload
        },
        remove(state) {
            state.info = undefined
        }
    }
})



export default userReducer