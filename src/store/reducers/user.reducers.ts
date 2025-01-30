import { UserSchema } from "clothing-store-shared/schema"
import { createReducer } from "react-observer-context"

type State = {
    info?: UserSchema.FormatUser,
    edit_expiration: number
}

type Actions = {
    set: UserSchema.FormatUser
    update: Partial<UserSchema.FormatUser>
    setEditExpiration: number | undefined
}

const userReducer = createReducer<State, Actions>({
    state: {
        edit_expiration: 0
    },
    actions: {
        set(state, payload) {
            return {
                ...state,
                info: payload
            }
        },
        setEditExpiration(state, payload = 0) {
            return {
                ...state,
                edit_expiration: payload
            }
        },
        update(state, payload) {
            return state.info ?
                { ...state, info: { ...state.info, ...payload } }
                :
                { ...state }

        }
    }
})



export default userReducer