import LoadPage from "@/components/LoadPage"
import { lazy, Suspense } from "react"
import { RouteObject } from "react-router-dom"

const LazyProductsSearch = lazy(() => import("@/pages/main/products-search"))
const LazyProductFullView = lazy(() => import("@/pages/main/product-fullview"))
const LazyProductsPreview = lazy(() => import("@/pages/main/products-preview"))

const productsRouter: RouteObject[] = [
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
]

export default productsRouter