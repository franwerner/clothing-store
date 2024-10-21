import AppWrapper from "@/components/AppWrapper";
import { CircularProgress } from "@nextui-org/react";
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const LazyProducts = lazy(() => import("@/pages/products"))

const LoadPage = () => <div className=" flex flex-1 ">
    <CircularProgress className="m-auto" size="lg" color="secondary" aria-label="Loading..." />
</div>

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppWrapper />,
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
                element: <p>contacto</p>
            },
            {
                path: "envios",
                element: <p>envios</p>
            },

        ]
    }
])

export default router