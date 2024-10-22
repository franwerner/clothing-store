import { useNavbarContext } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import ProductSearchNavBar from "../top-navbar/product-search";
import ShopCartNavbar from "../top-navbar/shopcart";

const SubNavbarOnScrolling = () => {

    const { isHidden } = useNavbarContext()

    return (
        <AnimatePresence 
        mode="popLayout">
            {
                isHidden &&
                 <motion.div
                  
                    exit={{
                        opacity: 0,
                        y: 100,
                        x:-100
                    }}
                    transition={{
                        duration: 0.4,
                    }}
                    initial={{
                        opacity: 0,
                        y: -100,
                        x : -100
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        x:0
                    }}
                    className="flex gap-4 ">
                    <ProductSearchNavBar />
                    <ShopCartNavbar />
                </motion.div>
            }
        </AnimatePresence>
    )
};

export default SubNavbarOnScrolling