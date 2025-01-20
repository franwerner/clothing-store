import LoadPage from "@/components/LoadPage"
import { lazy, Suspense } from "react"
import { RouteObject } from "react-router"

const LazyAccount = lazy(() => import("@/pages/main/account"))
const LazyLogin = lazy(() => import("@/pages/main/account/Login.account"))
const LazyRegister = lazy(() => import("@/pages/main//account/register"))
const LazyRequestRecoverPassword = lazy(() => import("@/pages/main//account/RequestRecoverPassword.account"))
const LazyRequestEmailVerification = lazy(() => import("@/pages/main//account/RequestEmailVerification.account"))
const LazyConfirmationEmail = lazy(() => import("@/pages/main/account/ConfirmationEmail.account"))
const LazyPasswordReset = lazy(() => import("@/pages/main//account/PasswordReset.account"))
const LazyOrder = lazy(() => import("@/pages/main/account/orders/[order]"))
const LazyOrders = lazy(() => import("@/pages/main/account/orders"))

const cuentaRouter: RouteObject = {
    path: "cuenta",
    element: <Suspense fallback={<LoadPage />}>
        <LazyAccount />
    </Suspense>,
    children: [
        {
            path: "ingresar",
            element: <Suspense fallback={<LoadPage />}>
                <LazyLogin />
            </Suspense>,

        },
        {
            path: "registrarse",
            element: <Suspense fallback={<LoadPage />}>
                <LazyRegister />
            </Suspense>
        },
        {
            path: "recuperar",
            element: <Suspense fallback={<LoadPage />}>
                <LazyRequestRecoverPassword />
            </Suspense>
        },
        {
            path: "reenviar",
            element: <Suspense fallback={<LoadPage />}>
                <LazyRequestEmailVerification />
            </Suspense>,
        }, {
            path: "confirmacion-email",
            element: <Suspense fallback={<LoadPage />}>
                <LazyConfirmationEmail />
            </Suspense>
        }, {
            path: "restablecer-contraseña",
            element: <Suspense fallback={<LoadPage />}>
                <LazyPasswordReset />
            </Suspense>
        },
        {
            path: "mis-compras",
            element: <Suspense fallback={<LoadPage />}>
                <LazyOrders />
            </Suspense>
        }, {
            path: "mis-compras/:order_id",
            element: <Suspense fallback={<LoadPage />}>
                <LazyOrder />
            </Suspense>
        },
    ]
}

export default cuentaRouter