import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Product from "./product";
import IProduct from "@/interfaces/Product.interfaces";

const classname = "material-symbols-outlined border-1 border-default-200 select-none absolute top-1/2   cursor-pointer shadow-xl  pointer-events-auto  bg-white rounded-full text-default-700 p-[12px] text-[35px]"

const ProductsCarousel = ({ products }: { products: Array<IProduct> }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 })
    const [hidden, setHidden] = useState(false)
    const [direction, setDirection] = useState<"rigth" | "left" | undefined>(undefined)
    const [x, setX] = useState(0)

    const rigth = () => {
        handlerPositionX(-400)
        setDirection("rigth")
    }
    const left = () => {
        handlerPositionX(400)
        setDirection("left")
    }

    const handlerContrains = () => {
        const content = contentRef.current
        if (!content) return
        const { scrollWidth, offsetWidth } = content
        setConstraints({
            left: -(scrollWidth - offsetWidth),
            right: 0,
        })
    }

    const handlerPositionX = (deplacement: number) => {
        setX((x) => {
            const op = x + deplacement
            return Math.min(Math.max(op, constraints.left), 0) //Nunca sobrepasara el 0.
        })
    }

    useLayoutEffect(() => {
        handlerContrains()
        const resize = () => {
            handlerContrains()
            handlerPositionX(0)
        }
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [constraints.left])

    return (
        <section
            data-id="ProductsCarousel"
            className="relative ">
            <div className="overflow-hidden rounded-md p-1 px-6">
                <motion.div
                    drag="x"
                    onDragStart={() => {
                        setHidden(true)
                    }}
                    dragListener={!hidden}
                    onDragEnd={(_, { offset }) => {
                        handlerPositionX(offset.x)
                        setHidden(false)
                        setDirection(undefined)
                    }}
                    onAnimationStart={() => {
                        if (!direction) return
                        setHidden(true)
                    }}
                    onAnimationComplete={() => {
                        if (!direction) return
                        setHidden(false)
                    }}
                    animate={{ x }}
                    ref={contentRef}
                    dragConstraints={constraints}
                    dragElastic={0.1}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        duration: 0.2,
                    }}
                    className="flex gap-2 cursor-pointer [&_article]:flex-shrink-0 [&_article]:w-1/4  "
                >
                    {products.map((i) => (
                        <Product key={i.id} {...i} />
                    ))}
                </motion.div>
            </div>

            <AnimatePresence>
                {
                    !(x === 0 || hidden) &&
                    <motion.span
                        exit={{ opacity: 0, x: -20, pointerEvents: "none" }}
                        transition={{
                            duration: 0.2
                        }}
                        initial={{ y: "-50%", x: -20 }}
                        animate={{ x: 0 }}
                        onClick={left}
                        className={`${classname} -left-4 `}>
                        chevron_left
                    </motion.span>
                }
            </AnimatePresence>
            <AnimatePresence>
                {!(x <= constraints.left || hidden) &&
                    <motion.span
                        exit={{ opacity: 0, x: 20, pointerEvents: "none" }}
                        transition={{
                            duration: 0.2
                        }}
                        initial={{ y: "-50%", x: 20 }}
                        animate={{ x: 0 }}
                        onClick={rigth}
                        className={`${classname} -right-4`}>
                        chevron_right
                    </motion.span>
                }
            </AnimatePresence>
        </section>
    );
};


export default ProductsCarousel