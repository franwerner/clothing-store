import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const LazyProducts = lazy(() => import("@/pages/products"))
const LazyContact = lazy(() => import("@/pages/contact"))
const LazyAppWraper = lazy(() => import("@/pages/wrapper"))


const router = createBrowserRouter([
    {
        path: "/",
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