import { configureStore } from "react-observer-context"
import shopcartReducer from "./reducers/shopcartReducer.reducers"



const store = configureStore({
    shopcart: shopcartReducer
})


export const { ObserverStore, useDispatch, useSelector } = store