import LoadPage from "@/components/LoadPage";
import { lazy, Suspense } from "react";
import { createBrowserRouter, redirect } from "react-router";
import tokenRedirect from "@/helper/tokenRedirect.helper";
import mainRouter from "./main/main.router";

const LazyPayment = lazy(() => import("@/pages/payment"))

const router = createBrowserRouter([
    { ...mainRouter },
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
            <LazyPayment />
        </Suspense>
    }
])

export default router