import LoadPage from "@/components/LoadPage"
import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"

const LazyAccount = lazy(() => import("@/pages/account"))
const LazyLogin = lazy(() => import("@/pages/account/LoginForm.account"))
const LazyRegister = lazy(() => import("@/pages/account/RegisterForm.account"))
const LazyRecover = lazy(() => import("@/pages/account/RecoverForm.account"))
const LazyConfirmation = lazy(() => import("@/pages/account/Confirmation.account"))


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
            </Suspense>
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
                <LazyRecover />
            </Suspense>
        },
        {
            path: "confirmacion",
            element: <Suspense fallback={<LoadPage />}>
                <LazyConfirmation/>
            </Suspense>
        }
    ]
}

export default cuentaRouter