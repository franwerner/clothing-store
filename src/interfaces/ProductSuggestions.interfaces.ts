import { ProductPreview } from "./Product.interfaces"

interface ProductSuggestions {
    suggetion: { brand: string, category: string }
    products: Array<ProductPreview>
}

export default ProductSuggestions