import { Spinner } from "@nextui-org/react";
import { useIntersectionObserver } from "@nextui-org/use-intersection-observer";
import ProductCard from "../product";
import UseGetProductsPreview from "./api/useGetProductsPreview.api";
import { AnimatePresence, motion } from "framer-motion";

const ProductsNotFound = () => {
    return (
        <div className="flex justify-center items-center flex-1 min-h-[350px] text-xl">
            <p className="uppercase text-lg underline">No se encontraron productos</p>
        </div>
    )
}

const ProductsPreviewContainer = () => {

    const { isLoading, products, loadMoreProducts, hasMoreProducts } = UseGetProductsPreview()

    const [ref] = useIntersectionObserver({
        threshold: 0,
        isEnabled: hasMoreProducts,
        onChange(isIntersecting) {
            if (isIntersecting) {
                loadMoreProducts()
            }
        },
        root: null
    })

    return (
        <main
            id="product-preview-container"
            className="flex flex-col flex-1 ">
            <AnimatePresence>
                {
                    products.length === 0 && !isLoading ? <ProductsNotFound /> :
                        !isLoading &&
                        <motion.div
                            initial={{
                                scale: 0
                            }}
                            transition={{
                                duration: 0.3
                            }}
                            animate={{
                                scale: 1
                            }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                            {
                                products.map((i, index) =>
                                    <ProductCard _REF={index == 39 ? ref : null} key={i.product_color_id} {...i} />
                                )
                            }
                        </motion.div>
                }
            </AnimatePresence>
            {

                isLoading && <Spinner
                    className="p-4 m-auto "
                    size="lg"
                    color="secondary" />
            }
        </main>
    );
};

export default ProductsPreviewContainer