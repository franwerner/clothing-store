import { motion } from "framer-motion";

interface AnimatedTitleProps {
    title: string
    className?: string
}


const DividerAnimate = () => (
    <motion.span
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{
            duration: 1
        }}
        className="h-[1px] bg-default-300" />
)

const AnimatedTitle = ({ title, className = "" }: AnimatedTitleProps) => {

    return (
        <div
            className={`text-center gap-4 animated-title justify-between items-center flex  ${className} `}>
            <DividerAnimate />
            <motion.h1
                transition={{
                    delay: 0.2
                }}
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1,
                }}
                className="text-default-700 text-3xl text-nowrap font-oswald font-semibold uppercase">
                {title}
            </motion.h1>
            <DividerAnimate />
        </div>
    );
};

export default AnimatedTitle;