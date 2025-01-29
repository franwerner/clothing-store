import ActionButton from "@/components/ActionButton";
import { FetchCustomProps } from "@/hooks/useFetchCustom.hooks";
interface ProductFullViewButtonShopcartProps {
    isDisabled: boolean,
    isLoading: boolean,
    addProductToCart: (props?: FetchCustomProps) => void
}

const ProductFullViewButtonShopcart = ({
    isDisabled,
    isLoading,
    addProductToCart,
}: ProductFullViewButtonShopcartProps) => {

    return (
        <section className="flex flex-col gap-4">
            <ActionButton
                isLoading={isLoading}
                variant={"solid"}
                onPress={() => {
                    addProductToCart()
                }}
                isDisabled={isDisabled}
              className="bg-white border-1 rounded-sm h-16 text-lg text-black max-w-full w-full border-black"
            >
                <div className="flex gap-1 items-center">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                    Agregar al carrito
                </div>
            </ActionButton>
        </section>
    );
};

export default ProductFullViewButtonShopcart