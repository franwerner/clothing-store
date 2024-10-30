import { ProductShopcart } from "@/interfaces/Product.interfaces";

const shopCartProductsMock: ProductShopcart[] = [
    {
        id: 1,
        name: "Gorra puto el que leas",
        discount: 10,
        price: 300000,
        brand: "Nike",
        category: "Accesorios",
        quantity: 2,
        size: "M",
        color: "Negro",
        image: "https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?cs=srgb&dl=pexels-pripicart-704857.jpg&fm=jpg",
        colorID: 101,
        waistID: 201
    },
    {
        id: 2,
        name: "Camisa Casual",
        price: 150000,
        brand: "Adidas",
        category: "Ropa",
        quantity: 1,
        size: "L",
        color: "Azul",
        image: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp",
        colorID: 102,
        waistID: 202
    },
    {
        id: 3,
        name: "Zapatillas Deportivas",
        discount: 20,
        price: 600000,
        brand: "Puma",
        category: "Calzado",
        quantity: 1,
        size: 42,
        color: "Rojo",
        image: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp",
        colorID: 103,
        waistID: 203
    },
    {
        id: 4,
        name: "Pantalón de Jeans",
        discount: 5,
        price: 400000,
        brand: "Levi's",
        category: "Ropa",
        quantity: 1,
        size: 32,
        color: "Negro",
        image: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp",
        colorID: 104,
        waistID: 204
    },
    {
        id: 5,
        name: "Chaqueta de Invierno",
        discount: 25,
        price: 800000,
        brand: "Columbia",
        category: "Ropa",
        quantity: 1,
        size: "XL",
        color: "Gris",
        image: "https://http2.mlstatic.com/D_NQ_NP_634587-MLA79784694049_102024-O.webp",
        colorID: 105,
        waistID: 205
    }
];

export {
    shopCartProductsMock
}