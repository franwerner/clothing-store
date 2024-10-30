import ErrorBoundary from "@/components/ErrorBoundary";
import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter, defer } from "react-router-dom";

const LazyProductsPreview = lazy(() => import("@/pages/products-preview"))
const LazyContact = lazy(() => import("@/pages/contact"))
const LazyAppWraper = lazy(() => import("@/pages/wrapper"))
const LazyProductsSearch = lazy(() => import("@/pages/products-search"))
const LazyProductFullView = lazy(() => import("@/pages/product-fullview"))
const LazyAccount = lazy(() => import("@/pages/account"))


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
                path: "productos/:brandName",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductsPreview />
                </Suspense>
            },
            {
                path: "productos/:brandName/:categoryName/",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductsPreview />
                </Suspense>
            },
            {
                path: "productos/:brandName/:categoryName/:productName",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyProductFullView />
                </Suspense>
            },
            {
                path: "productos/busqueda",
                element: <Suspense fallback={<LoadPage />} >
                    <LazyProductsSearch />
                </Suspense>,
                loader: async (e) => {
                    const res = new Promise((res) => {
                        setTimeout(async () => {
                            res((await fetch(`https://dummyjson.com/products/search?q=${new URL(e.request.url).searchParams.get("q")}`)).json())
                        }, 1000);
                    })
                    return defer({
                        "res": res
                    })
                },
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
            {
                path: "cuenta",
                element: <Suspense fallback={<LoadPage />}>
                    <LazyAccount />
                </Suspense>
            },
        ]
    }
])

export default router