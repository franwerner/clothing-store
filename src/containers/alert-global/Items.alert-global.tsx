import { Alert } from "@nextui-org/react"
import { motion } from "framer-motion"
import { AlertGlobalInStateProps } from "./hook/useAlertGlobal.hook"
import { forwardRef } from "react"

interface AlertGlobalItemsProps extends AlertGlobalInStateProps {
    alertsIndex: number
    index: number
    viewAlerts: boolean
    setViewAlerts: (b: boolean) => void
    onRemoveAlert: (n: number) => void
}

const AlertGlobalItems = forwardRef<HTMLLIElement, AlertGlobalItemsProps>(({
    color = "primary",
    description = "",
    title = "",
    variant = "faded",
    alertsIndex,
    index,
    setViewAlerts,
    viewAlerts,
    onRemoveAlert,
    id
},ref) => {
    return (
        <motion.li
            layout
            ref = {ref}
            className="relative cursor-pointer"
            animate={{
                opacity: 1,
                x: 0,
                y: viewAlerts ? 0 : (alertsIndex - index) * 70,
            }}
            initial={{
                opacity: 0,
                x: -300
            }}
            exit={{
                x: -300,
                opacity: 0
            }}
            onMouseEnter={() => {
                !viewAlerts && setViewAlerts(true)
            }}
            style={{
                zIndex: index,
            }}
        >
            <Alert
                closeButtonProps={{
                    onPress() {
                        onRemoveAlert(id)
                    }
                }}
                title={title}
                isClosable
                description={description}
                color={color}
                variant={variant}

            />
        </motion.li>
    )
})

export default AlertGlobalItems