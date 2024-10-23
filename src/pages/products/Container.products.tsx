import ActionButton from "@/components/ActionButton";
import Product from "@/containers/product";
import { productsTest1 } from "@/mocks/products.mocks";

const ProductsContainer = () => {

    return (
        <main id="product-container" className="flex flex-col flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-1 xs:gap-6 md:gap-4  ">
                {
                    productsTest1.map(i => <Product key={i.id} {...i} />)
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

export default ProductsContainer;