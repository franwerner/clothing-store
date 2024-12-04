import User from "@/interfaces/User.interface"
import { createReducer } from "react-observer-context"

type State = {
    info?: User
}

type Actions = {
    set: User
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