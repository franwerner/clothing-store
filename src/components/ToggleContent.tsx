import DynamicElement from "@/helper/DynamicElement.helper";
import { HTMLMotionProps, motion } from "framer-motion";
import { ComponentProps, createContext, ReactNode, useContext, useState } from "react";

interface ToggleContentProps<T extends keyof JSX.IntrinsicElements> {
    hiddenToggleButton?: boolean
    labelToggleButton?: {
        visible?: ReactNode,
        hidden?: ReactNode
    },
    as?: T
}

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



const ToggleContent = <T extends keyof JSX.IntrinsicElements = "div">(
    {
        children,
        as = "div" as any,
        hiddenToggleButton,
        labelToggleButton = {},
        ...props }: ComponentProps<T> & ToggleContentProps<T>) => {

    const [show, setShow] = useState(false)

    const { hidden = "Ver mas", visible = "Ver menos" } = labelToggleButton

    const onShow = () => setShow(prev => !prev)

    return (
        <ToggleContentContext.Provider value={{ show }}>
            <DynamicElement
                className="flex flex-col "
                as={as}
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
            </DynamicElement>
        </ToggleContentContext.Provider >
    );
};


ToggleContent.visible = VisibleContent
ToggleContent.hidden = HiddenContent


export default ToggleContent;