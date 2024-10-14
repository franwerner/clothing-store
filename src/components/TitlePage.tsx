import { motion } from "framer-motion";

interface TitlePageProps {
    pageName: string
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

const TitlePage = ({ pageName }: TitlePageProps) => {
    return (
        <div className="text-center gap-4  justify-between items-center flex  pt-2 mt-6  ">
            <DividerAnimate />
            <motion.h1
                transition={{
                    delay: 0.2
                }}
                initial={{
                    scale: 0
                }}
                animate={{
                    scale: 1
                }}
                className="text-3xl font-oswald font-medium uppercase text-default-700 tracking-widest">
                {pageName}
            </motion.h1>
            <DividerAnimate />
        </div>
    );
};

export default TitlePage;