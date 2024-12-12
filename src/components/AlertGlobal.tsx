import NextuiAlert, { NextuiAlertProps } from "nextui-alert"
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { createPortal } from "react-dom"

type AlertProps = Pick<NextuiAlertProps, "severity" | "variant" | "color" | "title"> & { text?: any }


const AlertContext = createContext<(props: AlertProps) => void>(() => { })

const useAlertContext = () => useContext(AlertContext)

const MAX_TIMER = 5000
const MAX_ALERT_LENGTH = 4

const AlertGlobal = ({ children }: { children: ReactNode }) => {
    const [alerts, setAlert] = useState<Array<AlertProps & { id: number, timer: number }>>([])
    const alertHandler = useCallback((props: AlertProps) => {
        setAlert((prev) => {
            const id = Math.random()
            const timer = Date.now() + MAX_TIMER
            const t = prev.length >= MAX_ALERT_LENGTH ? prev.filter((_, i) => i !== 0) : prev
            return [...t, { ...props, id, timer }]
        })
    }, [])

    const onClose = (id: number) => {
        setAlert(prev => prev.filter((i) => i.id !== id))
    }

    useEffect(() => {
        let timeouts: Array<number> = []
        alerts.forEach(i => {
            const restTimer = i.timer - Date.now()
            timeouts.push(
                setTimeout(() => {
                    onClose(i.id)
                }, restTimer) as unknown as number
            )

        })
        return () => {
            timeouts.forEach(i => clearTimeout(i))
        }
    }, [alerts])

    return (
        <AlertContext.Provider value={alertHandler}>
            {
                createPortal(
                    <div
                        className="fixed bottom-5 [&_div]:m-1 z-50 right-5"
                        id="alert-container">
                        {
                            alerts.map(({ color, severity = "info", title = "", variant = "solid", id, text = "" }) => {
                                return (
                                    <NextuiAlert
                                        key={id}
                                        severity={severity}
                                        variant={variant}
                                        color={color}
                                        shadow="md"
                                        title={title}
                                        children={text}
                                        onClose={() => onClose(id)}
                                    />
                                )
                            })
                        }
                    </div>,
                    document.body
                )
            }
            {children}
        </AlertContext.Provider>
    )
}
export {
    useAlertContext
}
export default AlertGlobal