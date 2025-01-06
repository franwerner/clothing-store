import useShopcartRemoveProduct from "@/api/hook/users/shopcart/useRemoveProduct.shopcart"
import ActionButtonIcon from "@/components/ActionButtonIcon"
import ProductInOrder from "@/components/ProductInOrder"
import ShopcartExpiredCounter from "@/components/ShopcartExpiredCounter"
import { useSelector } from "@/store"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Button } from "@nextui-org/react"
import { ShopcartProductSchema } from "clothing-store-shared/schema"
import { AnimatePresence, motion } from "framer-motion"


const Product = (props: ShopcartProductSchema.BaseInShopcart) => {

    const [{ isLoading }, { setRequest }] = useShopcartRemoveProduct(props.id)

    const { color, price, product, quantity, size, url, discount } = props

    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -100
            }}
            exit={{
                opacity: 0,
            }}
            viewport={{ once: true }}
            transition={{
                delay: 0.2,
                duration: 0.2,
                repeat: 0
            }}
            whileInView={{
                opacity: 1,
                x: 0
            }}
            className="relative border-b    bg-default-50 *:!border-0 border-default-400 p-3">
            <ProductInOrder
                color={color}
                discount={discount}
                price={price}
                product={product}
                quantity={quantity}
                size={size}
                url={url}
            />
            <Button
                isIconOnly
                isLoading={isLoading}
                onPress={() => setRequest()}
                className="material-symbols-outlined bg-transparent cursor-pointer min-w-0 p-1 w-auto h-auto text-[20px]  absolute right-0 top-0">
                close
            </Button>
        </motion.div>
    )
}

const AccountOrderTranssacion = () => {

    const products = useSelector(({ shopcart }) => shopcart.products) || []

    return (
        <div className="flex flex-col  items-center">
            <section className=" flex-1 min-h-[30px] flex justify-center *:text-center font-semibold *:!text-[15px]">
                <ShopcartExpiredCounter />
            </section>
            <section className="flex w-full max-w-[600px] justify-between">
      
            </section>
            <section className="  w-full  mt-4 grid gap-2 max-w-[600px] ">
                <AnimatePresence>
                    {
                        products.map(i => <Product key={i.id} {...i} />)
                    }
                </AnimatePresence>
            </section>
        </div>
    )
}
export default AccountOrderTranssacion