import { Link } from "@nextui-org/react"
import { ProductProps } from "./product"
import ProductsCarousel from "./ProductsCarousel"
import router from "@/router"

interface ProductSuggestionsProps {
    suggetion: { brand: string, category: string }
    products: Array<ProductProps>
}

const ProductSuggestions = ({ suggetion, products }: ProductSuggestionsProps) => {

    const { brand, category } = suggetion
    const route = () => {
        if (category == "ofertas imperdibles") {
            return `/productos?order=ofertas`
        }
        else if (category === "lo mas nuevo") {
            return `/productos?order=nuevo`
        }
        else {
            return `/productos/${brand}/${category}`
        }
    }
    return (
        <section
            id="categories"
            className="shadow-lg border flex-col py-6 rounded-md px-4">
            <div className="flex gap-3 pb-1 pl-3  items-center ">
                {brand && <h3 className="font-semibold text-lg tracking-widest text-default-500 font-oswald uppercase ">{brand}</h3>}
                {brand && <span className="self-start font-oswald  text-xl">{">"}</span>}
                <Link
                    onClick={() => router.navigate(route())}
                    color="foreground"
                    className="text-default-600">
                    <h3 className={`font-semibold cursor-pointer text-xl tracking-widets  font-oswald uppercase`}>
                        {category}
                    </h3>
                </Link>
            </div>
            <ProductsCarousel products={products} />
        </section>
    )
}
export type { ProductSuggestionsProps }
export default ProductSuggestions 