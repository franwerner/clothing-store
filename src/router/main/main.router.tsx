import ErrorBoundary from "@/components/ErrorBoundary";
import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import accountRouter from "./account.router";
import productsRouter from "./products.router";

const LazyContact = lazy(() => import("@/pages/main/contact"))
const LazyAppWraper = lazy(() => import("@/pages/main/wrapper"))


const mainRouter: RouteObject = {
    path: "/",
    errorElement: <ErrorBoundary />,
    element: <Suspense fallback={<LoadPage screen="full" />} >
        <LazyAppWraper />
    </Suspense>,
    children: [
        ...productsRouter,
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

        { ...accountRouter, },
    ]
}
export default mainRouter