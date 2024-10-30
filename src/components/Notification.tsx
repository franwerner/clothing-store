import { motion } from "framer-motion"
import { ComponentProps, ReactNode } from "react"
import { createPortal } from "react-dom"

type NotificationHeaderProps = ComponentProps<"div"> & {
    title: ReactNode;
}


const NotificationHeader = ({ title, ...props }: NotificationHeaderProps) => {

    return (
        <div {...props}>
            <h3>{title}</h3>
        </div>
    )

}

const Notification = ({ children }: { children: ReactNode }) => {
    return (
        <>
            {
                createPortal(
                    <motion.div
                        id="alert"
                        className="w-[300px] bg-red-500 h-[100px] fixed top-0 z-50 right-0"
                    >
                        {children}
                    </motion.div>
                    , document.body)
            }
        </>
    )
}


Notification.header = NotificationHeader

export default Notification