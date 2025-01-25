import { useSelector } from "@/store"
import { AnimatePresence, motion } from "framer-motion"
import ProductInShopcart from "./ProductItem.shopcart"
import classNames from "classnames"
import { Spinner } from "@nextui-org/react"

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

const ShopcartProducts = ({ isLoading }: { isLoading: boolean }) => {
    const products = useSelector(({ shopcart }) => shopcart.products) || []
    const expired_at = useSelector(({ shopcart }) => shopcart.expired_at) || 0

    return (
        <section
            id={"shopcart-products"}
            className={classNames(
                "gap-2 flex flex-col p-2 overflow-y-auto rounded-md  h-full bg-default-50",
                {
                    "opacity-80 pointer-events-none": expired_at === 0
                }
            )}
        >
            {
                isLoading ? <Spinner size="md" color="secondary" /> :
                    <AnimatePresence mode="popLayout"  >
                        {
                            products.length > 0 ?
                                products.map((props) =>
                                    <ProductInShopcart
                                        key={props.id}
                                        {...props} />) :
                                <VoidShopcart />
                        }
                    </AnimatePresence>
            }
        </section>
    )
}

export default ShopcartProducts