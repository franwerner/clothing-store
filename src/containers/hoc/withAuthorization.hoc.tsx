import router from "@/router"
import { useSelector } from "@/store"
import { UserSchema } from "clothing-store-shared/schema"
import { isFunction } from "my-utilities"
import { useEffect, useMemo, useState } from "react"

interface Props {
    to?: string
    verification?: (user: UserSchema.FormatUser) => boolean
}

/**
 * Para un correcto funcionamiento se deben usar en component que sean index de las pages.
 */

const withAuthorization = (Component: React.ComponentType, { to = "/", verification }: Props = {}) => {
    return (props: any) => { //Se memoiza debido a que el Outlet de react-router genera un doble renderizado.
        const user = useSelector(({ user }) => user.info)
        const [render, setRender] = useState(false)
        useEffect(() => {
            if (!user) {
                router.navigate("/cuenta/ingresar")
                return
            }
            const isAuthorized = isFunction(verification) ? verification(user) : true
            if (!isAuthorized) {
                router.navigate(to)
            } else {
                !render && setRender(true)
            }
        }, [user])

        const memoizedComponent = useMemo(() => {
            return <Component {...props} />
        }, [props])

        if (render && user) return memoizedComponent
    }
}

export default withAuthorization