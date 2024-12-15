import { motion } from "framer-motion";
interface AnimatedTitleProps {
    title: React.ReactNode
    className ?: string
}

const DividerAnimate = ({ x }: { x: string }) => {
    return (
        <motion.span
            initial={{ x: x }}
            animate={{ x: 0 }}
            style={{ flexGrow: 1 }}
            transition={{
                duration: 0.5,
            }}
            className="h-[1px] bg-default-300" />
    );
};

const AnimatedTitle = ({ title,className = "" }: AnimatedTitleProps) => {
    return (
        <div className={`text-center gap-4 [ overflow-hidden animated-title justify-center  items-center flex w-full ${className}`}>
            <DividerAnimate x="-100%" />
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
                className="text-default-700 text-3xl animatedTitle max-xs:truncate text-nowrap font-oswald font-semibold uppercase ">
                {title}
            </motion.h1>
            <DividerAnimate x="100%" />
        </div>
    );
};
export default AnimatedTitle;