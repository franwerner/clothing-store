import { Button } from "@nextui-org/react";

interface ProductQuantityProps {
    isDisabled: boolean,
    quantity: number,
    setQuantity: (value: number) => void
}

const ProductFullViewQuantity = ({ quantity, setQuantity, isDisabled }: ProductQuantityProps) => {
    const isInvalidValue = quantity < 0 || isDisabled

    return (
        <section
            id="product-quantity"
            className="flex  h-10">
            <Button
                isDisabled={isDisabled}
                onPress={() => {
                    const op = quantity - 1
                    if (op < 0) return
                    setQuantity(op)
                }}
                size="md"
                isIconOnly
                className="material-symbols-outlined h-full rounded-none border-1 border-default-300 bg-default-100  text-lg font-bold">
                remove
            </Button>
            <input
                min={1}
                max={100}
                id="quantity"
                onChange={({ target }) => {
                    const { value } = target
                    if (isInvalidValue) return
                    const toNumber = Number(value)
                    setQuantity(Math.floor(toNumber > 100 ? 100 : toNumber))
                }}
                name="quantity"
                type="number"
                className="w-full text-center focus:bg-default-50 rounded-sm h-full outline-none border-y-1 border-default-300 font-medium"
                value={(!quantity ? 0 : quantity).toString()}
            />
            <Button
                isDisabled={isDisabled}
                onPress={() => {
                    if (isDisabled || quantity >= 100) return
                    setQuantity(quantity + 1)
                }}
                size="md"
                isIconOnly
                className="material-symbols-outlined flex items-center h-full bg-default-100 border-1 border-default-300 font-bold text-lg  rounded-none">
                add
            </Button>
        </section>
    );
};

export default ProductFullViewQuantity