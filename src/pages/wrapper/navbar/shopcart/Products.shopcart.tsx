import { ProductShopcart } from "@/interfaces/Product.interfaces";
import { useDispatch, useSelector } from "@/store";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import { Button, Image } from "@nextui-org/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";


const Product = memo(({
    discount = 0,
    name,
    price = 0,
    image,
    quantity = 0,
    size,
    color,
    waistID
}: ProductShopcart) => {

    const priceWithQuantity = price * quantity
    const calculateDiscount = priceWithQuantity * (discount / 100)

    const dispatch = useDispatch()

    const changeQuantity = (n: number) => dispatch(({ shopcart }) => shopcart.changeQuantity({ quantity: n, waistID }))
    const removeProduct = () => dispatch(({ shopcart }) => shopcart.remove(waistID))

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
            <Image
                radius="none"
                alt={name}
                title={name}
                classNames={{
                    img: "object-contain w-full max-h-[120px] xs:max-h-[90px]",
                    wrapper: "max-xs:m-auto flex-shrink-0",
                }}
                src={image}
            />
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
                    {name}
                    <span aria-hidden="true" className="ml-1 text-default-800 font-bold">
                        {`(${color}, ${size})`}
                    </span>
                </h3>
                <div aria-label="quantity controls" className="flex max-xs:justify-center items-center">
                    <Button
                        onClick={() => changeQuantity(-1)}
                        variant="bordered"
                        color="default"
                        className="material-symbols-outlined text-lg border border-default-700 hover:scale-90"
                        isIconOnly
                        size="sm"
                        aria-label="decrease quantity"
                    >
                        remove
                    </Button>
                    <span aria-live="polite" className="min-w-[25px] text-center font-semibold text-black">
                        {quantity}
                    </span>
                    <Button
                        onClick={() => changeQuantity(1)}
                        variant="bordered"
                        color="default"
                        className="material-symbols-outlined text-lg border border-default-700 hover:scale-90"
                        isIconOnly
                        size="sm"
                        aria-label="increase quantity"
                    >
                        add
                    </Button>
                </div>
            </section>

            <button
                onClick={removeProduct}
                className="material-symbols-outlined z-10 text-end absolute right-0 top-0 p-1 cursor-pointer transition duration-100 active:scale-90"
                aria-label="remove product"
            >
                close
            </button>
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

    const products = useSelector((state) => state.shopcart.products) || []

    return (
        <section
            id="shoptcart-product"
            className="flex-1 gap-2 flex flex-col  rounded-md bg-default-50 ">
            <AnimatePresence mode="sync"  >
                {
                    products.length > 0 ?
                        products.map((props) =>
                            <Product
                                key={props.waistID}
                                {...props} />) :
                        <VoidShopcart />
                }
            </AnimatePresence>
        </section>
    )
}


export default ShopCartProducts;