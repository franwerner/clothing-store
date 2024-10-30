import { ProductFullPreview } from "@/interfaces/Product.interfaces";
const productFullPreviewMock: ProductFullPreview = {
    id: 1,
    name: "Gorra puto el que lee",
    brand: "nike",
    category: "Lisas",
    price: 30000,
    discount: 50,
    variants: [
        {
            colorID: 1,
            color: "Negro",
            hexadecimal: "#000000",
            waists: [
                {
                    waistID: 1,
                    size: "sm",
                    stock: true
                },
                {
                    waistID: 2,
                    size: "md",
                    stock: false
                }
            ],
            images: [
                {
                    imageID: 1,
                    url: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp"
                },
                {
                    imageID: 2,
                    url: "https://http2.mlstatic.com/D_NQ_NP_721264-MLA50752035922_072022-O.webp"
                },
                {
                    imageID: 3,
                    url: "https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?cs=srgb&dl=pexels-pripicart-704857.jpg&fm=jpg"
                }
            ]
        },
        {
            colorID: 2,
            color: "blanco",
            hexadecimal: "#FFFFFF",
            waists: [
                {
                    waistID: 3,
                    size: "sm",
                    stock: true
                },
                {
                    waistID: 4,
                    size: "md",
                    stock: true
                }
            ],
            images: [
                {
                    imageID: 4,
                    url: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp"
                },
                {
                    imageID: 5,
                    url: "https://http2.mlstatic.com/D_NQ_NP_721264-MLA50752035922_072022-O.webp"
                }
            ]
        },
        {
            colorID: 3,
            color: "Verde",
            hexadecimal: "#00FF00",
            waists: [
                {
                    waistID: 5,
                    size: "lg",
                    stock: true 
                },
                {
                    waistID: 6,
                    size: "xl",
                    stock: true 
                }
            ],
            images: [
                {
                    imageID: 6,
                    url: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp"
                }
            ]
        },
        {
            colorID: 4,
            color: "Azul",
            hexadecimal: "#0000FF",
            waists: [
                {
                    waistID: 7,
                    size: "md",
                    stock: false 
                },
                {
                    waistID: 8,
                    size: "lg",
                    stock: false 
                }
            ],
            images: [
                {
                    imageID: 7,
                    url: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp"
                },
                {
                    imageID: 8,
                    url: "https://http2.mlstatic.com/D_NQ_NP_721264-MLA50752035922_072022-O.webp"
                },
                {
                    imageID: 9,
                    url: "https://http2.mlstatic.com/D_NQ_NP_775098-MLA50752248296_072022-O.webp"
                }
            ]
        },
        {
            colorID: 5,
            color: "Amarillo",
            hexadecimal: "#FFFF00",
            waists: [
                {
                    waistID: 9,
                    size: "sm",
                    stock: true
                },
                {
                    waistID: 10,
                    size: "lg",
                    stock: true
                }
            ],
            images: [
                {
                    imageID: 10,
                    url: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp"
                },
                {
                    imageID: 11,
                    url: "https://http2.mlstatic.com/D_NQ_NP_721264-MLA50752035922_072022-O.webp"
                },
                {
                    imageID: 12,
                    url: "https://http2.mlstatic.com/D_NQ_NP_775098-MLA50752248296_072022-O.webp"
                }
            ]
        }
    ]
};
export {
    productFullPreviewMock
}