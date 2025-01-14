import { UserSchema } from "clothing-store-shared/schema"
import { EditAuth } from "clothing-store-shared/types"
import { createReducer } from "react-observer-context"

type State = {
    info?: UserSchema.FormatUser,
    edit_authorization?: EditAuth
}

type Actions = {
    set: UserSchema.FormatUser
    reset: undefined,
    update: Partial<UserSchema.FormatUser>
    setEditAuth: EditAuth
}

const userReducer = createReducer<State, Actions>({
    state: {
    },
    actions: {
        set(state, payload) {
            state.info = payload
        },
        setEditAuth(state, payload) {
            state.edit_authorization = payload
        },
        reset(state) {
            state.info = undefined
            state.edit_authorization = undefined
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