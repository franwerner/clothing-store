import WrapperApp from "@/components/WrapperApp";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <WrapperApp />,
        children: [
            {
                path: "productos",
                element: <p>Productos</p>
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