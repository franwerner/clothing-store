import useDeleteShopcartProduct from "@/api/shopcart/useDeleteShopcartProduct.api"
import usePatchShopcartProductQuantity from "@/api/shopcart/usePatchShopcartProductQuantity.api"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Button, Image, Spinner } from "@nextui-org/react"
import classNames from "classnames"
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { motion } from "framer-motion"
import { forwardRef, memo } from "react"

const ShopcartProductItem = memo(forwardRef<HTMLElement, ShopcartProductSchema.BaseInShopcart>(({
    color,
    product,
    id,
    price,
    quantity,
    size,
    url,
    discount,
}, ref) => {
    const priceWithQuantity = price * quantity
    const calculateDiscount = priceWithQuantity * (discount / 100)

    const { isLoading: changeLoading, setRequest: change } = usePatchShopcartProductQuantity()

    const { isLoading: removeLoading, setRequest: remove } = useDeleteShopcartProduct(id)

    const quantityHandler = (newQuantity: number) => {
        if (quantity + newQuantity <= 0) return
        change({
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
            ref={ref}
            layout
            exit={{
                scale: 0,
                opacity: 0,
                transition: { duration: 0.3 },
            }}
            role="article"
            className="relative border-default-100 border bg-white rounded-md  xs:flex shadow-md p-2"
        >
            <Image
                radius="none"
                alt={product}
                title={product}
                classNames={{
                    img: "object-contain w-full max-h-[80px] xs:max-h-[80px]",
                    wrapper: "max-xs:m-auto flex-shrink-0",
                }}
                src={url}
            />
            <section className="px-1  overflow-hidden">
                <div className="inline-flex max-xs:justify-center break-all w-full items-center gap-1">
                    <span
                        aria-label="discounted price"
                        className={classNames("font-bold text-[15px]", { "text-danger-600": discount })}
                    >
                        {transformToCurrency(priceWithQuantity - calculateDiscount, "ARS")}
                    </span>
                    {discount ?
                        <span
                            aria-label="original price"
                            className="text-xs line-through ">
                            {transformToCurrency(priceWithQuantity, "ARS")}
                        </span>
                        : ""}
                </div>
                <h3
                    className=" font-medium uppercase text-[13px]  max-xs:text-center break-all">
                    {product}
                </h3>
                <div className="flex gap-1 justify-center text-sm">
                    <p className="truncate">Color : <span className="uppercase font-semibold text-default-800">{color}</span></p>
                    <span className="mx-1">|</span>
                    <p className="truncate">Tamaño : <span className="uppercase font-semibold text-default-800">{size}</span></p>
                </div>
                <div
                    aria-label="quantity controls"
                    className="flex max-xs:justify-center items-center">
                    <Button
                        onPress={() => quantityHandler(-1)}
                        variant="bordered"
                        isDisabled={changeLoading}
                        color="default"
                        className="material-symbols-outlined hover:bg-black hover:text-white text-lg h-[30px] border border-default-700 hover:scale-90"
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
                        className="material-symbols-outlined hover:bg-black hover:text-white  text-lg border h-[30px] border-default-700 hover:scale-95"
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
                onPress={() => remove()}
                isLoading={removeLoading}
                className="material-symbols-outlined hover:bg-black h-[25px] !w-[25px] min-w-[10px] hover:text-white  bg-transparent text-[20px] z-10 text-end absolute right-1 top-1  cursor-pointer transition duration-100 active:scale-95"
                aria-label="remove product"
            >
                close
            </Button>
        </motion.article>
    )
}))

export default ShopcartProductItem