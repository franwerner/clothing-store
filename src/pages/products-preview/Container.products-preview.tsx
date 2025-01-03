import ActionButton from "@/components/ActionButton";
import Product from "@/containers/product";
import { useSearchParams } from "react-router-dom";
import { useProductPreviewContext } from ".";

const ProductsPreviewContainer = () => {
    const { isLoading, products } = useProductPreviewContext()
    const [searchParams, fn] = useSearchParams()
    return (
        <main
            id="product-preview-container"
            className="flex flex-col flex-1 overflow-hidden">
            <div className="grid grid-cols-2 overflow-hidden  md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                {
                    products.map(i => <Product key={i.product_color_id} {...i} />)
                }
            </div>
            <div className="flex-1 flex justify-center p-4">
                <ActionButton
                    onPress={() => {
                        const offset = Number(searchParams.get("offset")) + 1
                        searchParams.set("offset", offset.toString())
                        fn(searchParams)
                    }}
                    isLoading={isLoading}>
                    Cargar más productos
                </ActionButton>
            </div>
        </main>
    );
};

export default ProductsPreviewContainer;