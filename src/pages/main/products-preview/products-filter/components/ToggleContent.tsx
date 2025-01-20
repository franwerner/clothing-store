import { HTMLMotionProps, motion } from "framer-motion";
import { ComponentProps, createContext, ReactNode, useContext, useState } from "react";

type ToggleContentProps = {
    hiddenToggleButton?: boolean
    labelToggleButton?: {
        visible?: ReactNode,
        hidden?: ReactNode
    },
} & ComponentProps<"section">

const ToggleContentContext = createContext<{
    show: boolean,
}>({
    show: false,
})

const VisibleContent = ({ children, ...props }: ComponentProps<"ul">) => {

    return (
        <ul data-slot="visibleList" {...props}>
            {children}
        </ul >
    )
}

const HiddenContent = ({ children, ...props }: HTMLMotionProps<"ul">) => {

    const { show } = useContext(ToggleContentContext)

    return (
        <motion.ul
            data-slot="hiddenList"
            className={`overflow-hidden`}
            initial={{ height: 0 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
            animate={{
                height: show ? "auto" : 0
            }}
            {...props}
        >
            {children}
        </motion.ul>
    )
}



const ToggleContent = (
    {
        children,
        hiddenToggleButton,
        labelToggleButton = {},
        ...props
    }: ToggleContentProps) => {

    const [show, setShow] = useState(false)

    const { hidden = "Ver mas", visible = "Ver menos" } = labelToggleButton

    const onShow = () => setShow(prev => !prev)

    return (
        <ToggleContentContext.Provider value={{ show }}>
            <section
                className="flex flex-col "
                data-slot="base"
                {...props as any}
            >
                {children}
                {
                    !hiddenToggleButton &&
                    <span
                        data-slot="toggle"
                        onClick={onShow}
                        className="text-nowrap max-w-min   cursor-pointer font-medium underline ms-1  text-default-600 bg-white text-sm">
                        {!show ? hidden : visible}
                    </span>
                }
            </section>
        </ToggleContentContext.Provider >
    );
};


ToggleContent.visible = VisibleContent
ToggleContent.hidden = HiddenContent


export default ToggleContent;