import ProductSuggestions from "@/interfaces/ProductSuggestions.interfaces";
import { productsTest1, productsTest2, productsTest3 } from "./products.mocks";

const suggestionsTest1: Array<ProductSuggestions & { id: number }> = [
    {
        id: 0,
        suggetion: { brand: "", category: "ofertas imperdibles" },
        products: productsTest1
    },
    {
        id: 1,
        suggetion: { brand: "", category: "lo mas nuevo" },
        products: productsTest2
    },
    {
        id: 2,
        suggetion: { brand: "ze indu", category: "truccker clasico" },
        products: productsTest3
    },

]

export {
    suggestionsTest1
}