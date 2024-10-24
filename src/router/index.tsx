import ErrorBoundary from "@/components/ErrorBoundary";
import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter, defer } from "react-router-dom";

const LazyProducts = lazy(() => import("@/pages/products"))
const LazyContact = lazy(() => import("@/pages/contact"))
const LazyAppWraper = lazy(() => import("@/pages/wrapper"))
const LazySearch = lazy(() => import("@/pages/search"))


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
                    <LazyProducts />
                </Suspense>
            },
            {
                path: "busqueda",
                element: <Suspense fallback={<LoadPage />} >
                    <LazySearch />
                </Suspense>,
                loader: async (e) => {
                    const res = new Promise((res) => {
                        setTimeout(async () => {
                            res((await fetch(`https://dummyjson.com/products/search?q=${new URL(e.request.url).searchParams.get("q")}`)).json())
                        }, 1000);
                    })
                    return defer({
                        "res":  res
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

        ]
    }
])

export default router