import Carrusel from "@/components/carrusel";
import Product, { ProductProps } from "@/components/product";

const products: Array<ProductProps> = [
    { id: 1, name: "camiseta básica", discount: 10, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 230000.00, stock: true },
    { id: 2, name: "jeans ajustados", discount: 15, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 40.00, stock: true },
    { id: 3, name: "chaqueta de cuero", discount: 0, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5r7OeafmF9QEbYpq7CUy2x8Ov79lETByV6ZuS9vHXH6tHOKzgMgZpryRnOF5UJABUXsM&usqp=CAU", price: 80.00, stock: true },
    { id: 4, name: "falda larga", discount: 5, url: "https://m.media-amazon.com/images/I/71H++oLZmlL._AC_UY1000_.jpg", price: 30.00, stock: false },
    { id: 5, name: "abrigo de lana", discount: 99, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 90.00, stock: true },
    { id: 6, name: "blusa de seda", discount: 12, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 35.00, stock: false },
    { id: 7, name: "shorts deportivos", discount: 18, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 25.00, stock: true },
    { id: 8, name: "vestido de verano", discount: 30, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 50.00, stock: true },
    { id: 9, name: "sudadera con capucha", discount: 15, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 45.00, stock: true },
    { id: 10, name: "pantalones", discount: 30, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 30000.00, stock: false },
    { id: 11, name: "camisa de cuadros", discount: 22, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 38.00, stock: true },
    { id: 12, name: "zapatos de cuero", discount: 17, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 70.00, stock: true },
    { id: 13, name: "sandalias de playa", discount: 10, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 20.00, stock: true },
    { id: 14, name: "bufanda de lana", discount: 5, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 15.00, stock: false },
    { id: 15, name: "gorra de béisbol", discount: 20, url: "https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp", price: 18.00, stock: true }
];


const HomeCategories = () => {
    return (
        <section
            id="categories"
            className="flex justify-center flex-col p-10">
            <h2 className="font-semibold  text-center  text-2xl tracking-wider uppercase">Comprar por categoría</h2>
            <Carrusel
                data={products}>
                {
                    products.map(i => <Product key={i.id} {...i} />)
                }
            </Carrusel>

        </section>
    );
};

export default HomeCategories