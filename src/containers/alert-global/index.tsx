import { AlertVariantProps } from "@nextui-org/react"
import { AnimatePresence } from "framer-motion"
import { createContext, ReactNode, useContext, useState } from "react"
import useAlertGlobal from "./hook/useAlertGlobal.hook"
import AlertGlobalItems from "./Items.alert-global"

interface AlertGlobalProps {
    color?: AlertVariantProps["color"]
    title?: string,
    description?: string
    variant?: AlertVariantProps["variant"]
}

const AlertContext = createContext<(props: AlertGlobalProps) => void>(() => { })

const useAlertContext = () => useContext(AlertContext)

const AlertGlobal = ({ children }: { children: ReactNode }) => {

    const { alertHandler, onRemoveAlert, alerts } = useAlertGlobal()

    const [viewAlerts, setViewAlerts] = useState(false)

    return (
        <AlertContext.Provider value={alertHandler}>
            <ul
                onMouseLeave={() => {
                    setViewAlerts(false)
                }}
                className="fixed bottom-2 [&_div]:m-1 z-[999999999] pr-1 left-2"
                id="alert-container">
                <AnimatePresence mode="popLayout">
                    {
                        alerts.map((i, index) =>
                            <AlertGlobalItems
                                key={i.id}
                                onRemoveAlert={onRemoveAlert}
                                setViewAlerts={setViewAlerts}
                                viewAlerts={viewAlerts}
                                alertsIndex={alerts.length - 1}
                                index={index}
                                {...i}
                            />
                        )
                    }
                </AnimatePresence>
            </ul>
            {children}
        </AlertContext.Provider>
    )
}
export {
    useAlertContext,
    type AlertGlobalProps
}
export default AlertGlobal