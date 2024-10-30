import ProductSuggestions from "@/interfaces/ProductSuggestions.interfaces";
import { productPreviewMock } from "./products.mocks";

const suggestionsTest1: Array<ProductSuggestions & { id: number }> = [
    {
        id: 0,
        suggetion: { brand: "", category: "ofertas imperdibles" },
        products: productPreviewMock
    },
    {
        id: 1,
        suggetion: { brand: "", category: "lo mas nuevo" },
        products: productPreviewMock
    },
    {
        id: 2,
        suggetion: { brand: "ze indu", category: "truccker clasico" },
        products: productPreviewMock
    },

]

export {
    suggestionsTest1
}