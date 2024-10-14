import AppWrapper from "@/components/AppWrapper";
import Products from "@/pages/products";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppWrapper />,
        children: [
            {
                path: "productos",
                element: <Products />
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