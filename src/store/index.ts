import { configureStore } from "react-observer-context"
import shopcartReducer from "./reducers/shopcart.reducers"
import userReducer from "./reducers/user.reducers"
import userAddressReducer from "./reducers/userAddress.reducers.ts"

const s = configureStore({
    shopcart: shopcartReducer,
    user: userReducer,
    userAddress: userAddressReducer
})


export const { ObserverStore, useDispatch, useSelector, store } = s