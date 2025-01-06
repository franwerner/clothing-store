import useShopcartChangeProductQuantity from "@/api/hook/users/shopcart/useChangeProductQuantity.shopcart";
import useShopcartRemoveProduct from "@/api/hook/users/shopcart/useRemoveProduct.shopcart";
import { useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Button, Image, Spinner } from "@nextui-org/react";
import classNames from "classnames";
import { ShopcartProductSchema } from "clothing-store-shared/schema";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

const Product = memo(({
    color,
    product,
    id,
    price,
    quantity,
    size,
    url,
    discount = 0,
}: ShopcartProductSchema.BaseInShopcart) => {

    const priceWithQuantity = price * quantity
    const calculateDiscount = priceWithQuantity * (discount / 100)

    const [{ isLoading: changeLoading }, { setRequest }] = useShopcartChangeProductQuantity()

    const [{ isLoading: removeLoading }, remove] = useShopcartRemoveProduct(id)

    const quantityHandler = (newQuantity: number) => {
        if (quantity + newQuantity <= 0) return
        setRequest({
            body: {
                product: {
                    id,
                    quantity: quantity + newQuantity
                }
            }
        })
    }

    return (
        <motion.article
            layout
            exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3 },
            }}
            role="article"
            className="relative border border-default-200 xs:flex border-b-2 shadow rounded-md p-2"
        >
            {
                url && <Image
                    radius="none"
                    alt={product}
                    title={product}
                    classNames={{
                        img: "object-contain w-full max-h-[120px] xs:max-h-[90px]",
                        wrapper: "max-xs:m-auto flex-shrink-0",
                    }}
                    src={url}
                />
            }
            <section className="px-1 flex flex-col">
                <div className="inline-flex max-xs:justify-center break-all w-full items-center gap-1">
                    <span
                        aria-label="discounted price"
                        className={classNames("font-bold text-[15px]", { "text-danger-600": discount })}
                    >
                        {transformToCurrency(priceWithQuantity - calculateDiscount, "ARS")}
                    </span>
                    {discount ?
                        <span aria-label="original price" className="text-xs line-through ">
                            {transformToCurrency(priceWithQuantity, "ARS")}
                        </span>
                        : ""}
                </div>
                <h3
                    id="product-title"
                    className="flex-1 text-[14px]  max-xs:text-center break-all">
                    {product}
                    <span aria-hidden="true" className="ml-1 capitalize text-default-800 font-bold">
                        {`(${color}, ${size})`}
                    </span>
                </h3>
                <div aria-label="quantity controls" className="flex max-xs:justify-center items-center">
                    <Button
                        onPress={() => quantityHandler(-1)}
                        variant="bordered"
                        isDisabled={changeLoading}
                        color="default"
                        className="material-symbols-outlined text-lg border border-default-700 hover:scale-90"
                        isIconOnly
                        size="sm"
                        aria-label="decrease quantity"
                    >
                        remove
                    </Button>
                    {
                        changeLoading ? <Spinner size="sm" color="secondary" className="p-1" /> : <span className="min-w-[30px] text-center font-semibold text-black">
                            {quantity}
                        </span>
                    }
                    <Button
                        onPress={() => quantityHandler(+1)}
                        variant="bordered"
                        color="default"
                        className="material-symbols-outlined text-lg border border-default-700 hover:scale-90"
                        isIconOnly
                        isDisabled={changeLoading}
                        size="sm"
                        aria-label="increase quantity"
                    >
                        add
                    </Button>
                </div>
            </section>

            <Button
                isIconOnly
                onPress={() => remove.setRequest()}
                isLoading={removeLoading}
                className="material-symbols-outlined bg-transparent text-2xl z-10 text-end absolute right-0 top-0 p-1 cursor-pointer transition duration-100 active:scale-90"
                aria-label="remove product"
            >
                close
            </Button>
        </motion.article>
    )
})

const VoidShopcart = () => {
    return (
        <div
            id="void-shopcart"
            className="flex flex-1  justify-center items-center h-full rounded-md p-4 ">
            <motion.h3
                layout
                className=" uppercase text-lg  rounded-lg underline">
                ¡El carrito de compras esta vacio!
            </motion.h3>
        </div>
    )
}

const ShopCartProducts = () => {

    const products = useSelector(({ shopcart }) => shopcart.products) || []
    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at)

    return (
        <section
            id="shoptcart-product"
            className={classNames(
                "flex-1 gap-2 flex flex-col  rounded-md bg-default-50",
                {
                    "opacity-80 pointer-events-none": expired_at === 0
                }
            )}>
            <AnimatePresence mode="sync"  >
                {
                    products.length > 0 ?
                        products.map((props) =>
                            <Product
                                key={props.id}
                                {...props} />) :
                        <VoidShopcart />
                }
            </AnimatePresence>
        </section>
    )
}


export default ShopCartProducts;