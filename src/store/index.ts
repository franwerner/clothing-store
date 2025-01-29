import { configureStore } from "react-observer-context"
import shopcartReducer from "./reducers/shopcart.reducers"
import userReducer from "./reducers/user.reducers"
import userAddressReducer from "./reducers/userAddress.reducers.ts"
import storeConfigReducer from "./reducers/storeConfig.reducers.ts"

const s = configureStore({
    shopcart: shopcartReducer,
    user: userReducer,
    userAddress: userAddressReducer,
    storeConfig : storeConfigReducer
})


export const { ObserverStore, useDispatch, useSelector, store } = s