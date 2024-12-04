import ActionButton from "@/components/ActionButton";
import Product from "@/containers/product";
import { productPreviewMock } from "@/mocks/products.mocks";

const ProductsPreviewContainer = () => {

    return (
        <main
            id="product-preview-container"
            className="flex flex-col flex-1 overflow-hidden">
            <div className="grid grid-cols-2 overflow-hidden  md:grid-cols-3 lg:grid-cols-4 gap-4  ">
                {
                    productPreviewMock.map(i => <Product key={i.id} {...i} />)
                }
            </div>
            <div className="flex-1 flex justify-center p-4">
                <ActionButton>
                  Cargar más productos
                </ActionButton>
            </div>
        </main>
    );
};

export default ProductsPreviewContainer;