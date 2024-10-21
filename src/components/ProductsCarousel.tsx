import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import Product, { ProductProps } from "./product";

const classname = "material-symbols-outlined border-1 border-default-200 select-none absolute top-1/2   cursor-pointer shadow-xl  pointer-events-auto  bg-white rounded-full text-default-700 p-[12px] text-[35px]"

const ProductsCarousel = ({ products }: { products: Array<ProductProps> }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [constraints, setConstraints] = useState({ left: 0, right: 0 })
    const [hidden, setHidden] = useState(false)
    const [x, setX] = useState(0)

    const handlerContrains = () => {
        const content = contentRef.current
        if (!content) return
        const scrollWidth = content.scrollWidth
        const offSetWidth = content.offsetWidth
        setConstraints({
            left: -(scrollWidth - offSetWidth),
            right: 0,
        })
    }

    const handlerPositionX = (deplacement: number) => {
        setX(() => {
            const x = getPositionX()
            const op = x + deplacement
            if (op < constraints.left) return constraints.left
            else if (op > 0 && deplacement > 0) return 0
            return op + 0
        })
    }

    const getPositionX = () => {
        //Nos ayuda a obtener el calculo que se esta dando actualemnte en framer-motion, 
        // para que en caso de que la animacion se detenga o la ejecutenemos nuevamente, siempre se haga en base a la propiedad X del DOM.
        const content = contentRef.current
        if (!content) return 0
        const value = content.style.transform.match(/-\d+/g)
        return value ? Number(value[0]) : 0
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
            className="relative  p-2">
            <div className="overflow-hidden p-1">
                <motion.div
                    drag="x"
                    onDragStart={() => {
                        setHidden(true)
                    }}
                    dragListener={!hidden}
                    onDragEnd={() => {
                        setHidden(false)
                        handlerPositionX(0)
                    }}
                    onAnimationStart={(e: { x: number }) => {
                        if (e.x === constraints.left || e.x === getPositionX()) return
                        setHidden(true)
                    }}
                    onAnimationComplete={() => {
                        hidden && setHidden(false)
                    }}
                    animate={{ x: x }}
                    ref={contentRef}
                    dragConstraints={constraints}
                    dragElastic={0.1}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.2,
                    }}
                    className="flex gap-1  cursor-pointer"
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
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                            duration: 0.2
                        }}
                        initial={{ y: "-50%", x: -20 }}
                        animate={{ x: 0 }}
                        onClick={() => handlerPositionX(400)}
                        className={`${classname} -left-5 `}>
                        chevron_left
                    </motion.span>
                }
            </AnimatePresence>


            <AnimatePresence>
                {!(x <= constraints.left || hidden) &&
                    <motion.span
                        exit={{ opacity: 0, x: 20 }}
                        transition={{
                            duration: 0.2
                        }}
                        initial={{ y: "-50%", x: 20 }}
                        animate={{ x: 0 }}
                        onClick={() => handlerPositionX(-400)}
                        className={`${classname} -right-5`}>
                        chevron_right
                    </motion.span>
                }
            </AnimatePresence>
        </section>
    );
};


export default ProductsCarousel