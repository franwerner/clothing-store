import { ProductPreview } from "@/interfaces/Product.interfaces";
const productPreviewMock: Array<ProductPreview> = [
    { id: 1, name: "camiseta básica", discount: 88, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 200000.00, stock: true, category: "Ropa", brand: "Marca A", color: "blanco" },
    { id: 2, name: "jeans ajustados", discount: 15, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 40.00, stock: true, category: "Ropa", brand: "Marca B", color: "azul" },
    { id: 3, name: "chaqueta de cuero", discount: 0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5r7OeafmF9QEbYpq7CUy2x8Ov79lETByV6ZuS9vHXH6tHOKzgMgZpryRnOF5UJABUXsM&usqp=CAU", price: 80.00, stock: true, category: "Ropa", brand: "Marca C", color: "negro" },
    { id: 4, name: "falda larga", discount: 5, image: "https://m.media-amazon.com/images/I/71H++oLZmlL._AC_UY1000_.jpg", price: 30.00, stock: false, category: "Ropa", brand: "Marca D", color: "rojo" },
    { id: 5, name: "abrigo de lana", discount: 99, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 90.00, stock: true, category: "Ropa", brand: "Marca E", color: "gris" },
    { id: 6, name: "blusa de seda", discount: 12, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 35.00, stock: false, category: "Ropa", brand: "Marca F", color: "rosa" },
    { id: 7, name: "shorts deportivos", discount: 18, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 25.00, stock: true, category: "Ropa", brand: "Marca G", color: "verde" },
    { id: 8, name: "vestido de verano", discount: 30, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 50.00, stock: true, category: "Ropa", brand: "Marca H", color: "amarillo" },
    { id: 9, name: "sudadera con capucha", discount: 15, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 45.00, stock: true, category: "Ropa", brand: "Marca I", color: "azul marino" },
    { id: 10, name: "pantalones", discount: 30, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 30000.00, stock: false, category: "Ropa", brand: "Marca J", color: "negro" },
    { id: 11, name: "camisa de cuadros", discount: 22, image: "https://images.pexels.com/photos/704857/pexels-photo-704857.jpeg?cs=srgb&dl=pexels-pripicart-704857.jpg&fm=jpg", price: 38.00, stock: true, category: "Ropa", brand: "Marca K", color: "blanco y azul" },
    { id: 12, name: "zapatos de cuero", discount: 17, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 70.00, stock: true, category: "Calzado", brand: "Marca L", color: "marrón" },
    { id: 13, name: "sandalias de 1233", discount: 10, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 20.00, stock: true, category: "Calzado", brand: "Marca M", color: "beige" },
    { id: 14, name: "bufanda de lana", discount: 5, image: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 15.00, stock: false, category: "Accesorios", brand: "Marca N", color: "verde oscuro" },
];


export {
    productPreviewMock
}