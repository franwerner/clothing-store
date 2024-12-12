import { UserSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"

type State = {
    info?: UserSchema.FormatUser
}

type Actions = {
    set: UserSchema.FormatUser
    remove: undefined,
    update: Partial<UserSchema.FormatUser>
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
        },
        update(state, payload) {
            if (state.info) {
                state.info = {
                    ...state.info,
                    ...payload
                }
            }
        }
    }
})



export default userReducer