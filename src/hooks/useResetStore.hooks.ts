import { useDispatch } from "@/store"

const useResetStore = () => {
    const dispatch = useDispatch()

    return () => {
        dispatch(({ shopcart, user, userAddress }) => {
            shopcart.reset()
            user.reset()
            userAddress.reset()
        })
    }
}

export default useResetStore