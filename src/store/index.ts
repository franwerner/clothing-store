import { configureStore } from "react-observer-context"
import shopcartReducer from "./reducers/shopcart.reducers"
import userReducer from "./reducers/user.reducers"

const store = configureStore({
    shopcart: shopcartReducer,
    user : userReducer
})


export const { ObserverStore, useDispatch, useSelector } = store