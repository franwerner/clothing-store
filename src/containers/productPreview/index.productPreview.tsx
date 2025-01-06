import ActionButton from "@/components/ActionButton";
import ProductCard from "../product";
import { Spinner } from "@nextui-org/react";
import UseGetProductsPreview from "./api/useGetProductsPreview.api";

const ProductsNotFound = () => {
    return (
        <div className="flex justify-center items-center flex-1 min-h-[350px] text-xl">
            <p className="uppercase text-lg underline">No se encontraron productos</p>
        </div>
    )
}

const ProductsPreviewContainer = () => {

    const { isLoading, products, loadMoreProducts, hasMoreProducts } = UseGetProductsPreview()

    return (
        <main
            id="product-preview-container"
            className="flex flex-col flex-1 ">

            {
                products.length === 0 && isLoading ?
                    <Spinner
                        className=" flex-1"
                        size="lg"
                        color="secondary" /> :
                    products.length === 0 && !isLoading ? <ProductsNotFound /> :
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                            {
                                products.map(i => <ProductCard key={i.product_color_id} {...i} />)
                            }
                        </div>
            }
            {
                hasMoreProducts && products.length > 0 &&
                <div className="flex-1 flex justify-center p-4">
                    <ActionButton
                        onPress={() => {
                            loadMoreProducts()
                        }}
                        isLoading={isLoading}>
                        Cargar más productos
                    </ActionButton>
                </div>
            }
        </main>
    );
};

export default ProductsPreviewContainer