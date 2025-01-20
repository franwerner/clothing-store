import ErrorBoundary from "@/components/ErrorBoundary";
import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";
import cuentaRouter from "./cuenta.router";
import tokenRedirect from "@/helper/tokenRedirect.helper";
import panelRouter from "./panel.router";

const LazyProductsPreview = lazy(() => import("@/pages/main/products-preview"))
const LazyContact = lazy(() => import("@/pages/main/contact"))
const LazyAppWraper = lazy(() => import("@/pages/main/wrapper"))
const LazyProductsSearch = lazy(() => import("@/pages/main/products-search"))
const LazyProductFullView = lazy(() => import("@/pages/main/product-fullview"))
const LazyOrderPayment = lazy(() => import("@/pages/order-payment"))

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorBoundary />,
        element: <Suspense fallback={<LoadPage screen="full" />} >
            <LazyAppWraper />
        </Suspense>,
        children: [
            {
                path: "productos",
                element: <Suspense fallback={<LoadPage />} >
                    <LazyProductsPreview />
                </Suspense>
            },
            {
                path: "productos/:brand",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductsPreview />
                </Suspense>
            },
            {
                path: "productos/:brand/:category/",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductsPreview />
                </Suspense>
            },
            {
                path: "productos/:brand/:category/:product",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductFullView />
                </Suspense>
            },
            {
                path: "productos/busqueda",
                element: <Suspense fallback={<LoadPage />} >
                    <LazyProductsSearch />
                </Suspense>,
            },
            {
                path: "ofertas",
                element: <p>ofertas</p>
            },
            {
                path: "contacto",
                element: <Suspense fallback={<LoadPage />} >
                    <LazyContact />
                </Suspense>
            },
            {
                path: "envios",
                element: <p>envios</p>
            },

            { ...cuentaRouter, },
            { ...panelRouter },
        ]
    },
    {
        path: "token",
        loader: () => {
            const { href } = tokenRedirect()
            return redirect(href)
        }
    },
    {
        path: "pago",
        element: <Suspense fallback={<LoadPage />}>
            <LazyOrderPayment />
        </Suspense>
    }
])

export default router