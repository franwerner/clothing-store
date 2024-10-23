import Product from "./Product.interfaces"

interface ProductSuggestions {
    suggetion: { brand: string, category: string }
    products: Array<Product>
}

export default ProductSuggestions