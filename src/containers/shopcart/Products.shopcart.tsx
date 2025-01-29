import { useSelector } from "@/store"
import { AnimatePresence, motion } from "framer-motion"
import ProductInShopcart from "./ProductItem.shopcart"
import { Spinner } from "@nextui-org/react"
import { forwardRef } from "react"

const VoidShopcart = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div
            id="void-shopcart"
            className="flex flex-1  justify-center items-center h-full rounded-md p-4 ">
            <motion.h3
                layout
                ref={ref}
                className=" uppercase text-lg  rounded-lg underline">
                ¡El carrito de compras esta vacio!
            </motion.h3>
        </div>
    )
})

const ShopcartProducts = ({ isLoading }: { isLoading: boolean }) => {
    const products = useSelector(({ shopcart }) => shopcart.products) || []
    return (
        <section
            id={"shopcart-products"}
            className={"gap-2 flex flex-col p-2 overflow-y-auto rounded-md  h-full bg-default-50"}>
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