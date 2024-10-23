import { Link } from "@nextui-org/react"
import ProductsCarousel from "./ProductsCarousel.containers"
import router from "@/router"
import IProductSuggestions from "@/interfaces/ProductSuggestions.interfaces"

const ProductSuggestions = ({ suggetion, products }: IProductSuggestions) => {

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
            className="shadow-lg border border-default-300 flex-col py-6 rounded-md px-4">
            <div className="flex gap-3 pb-1 pl-3  items-center ">
                {brand && <h3 className="font-semibold text-lg tracking-widest text-default-600 font-oswald uppercase ">{brand}</h3>}
                {brand && <span className="self-start font-oswald  text-xl">{">"}</span>}
                <Link
                    onClick={() => router.navigate(route())}
                    color="foreground"
                    className="text-default-700">
                    <h3 className={`font-semibold cursor-pointer text-xl tracking-widets  font-oswald uppercase`}>
                        {category}
                    </h3>
                </Link>
            </div>
            <ProductsCarousel products={products} />
        </section>
    )
}
export default ProductSuggestions 