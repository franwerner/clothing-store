import { useCallback, useEffect, useState } from "react"
import { AlertGlobalProps } from ".."

const MAX_MS_PER_ALERT = 4000
const MAX_ALERT_LENGTH = 4

interface AlertGlobalInStateProps extends AlertGlobalProps {
    id: number,
    expiryDate: number
}

const useAlertGlobal = () => {
    const [alerts, setAlert] = useState<Array<AlertGlobalInStateProps>>([])

    const alertHandler = useCallback((props: AlertGlobalProps) => {
        setAlert((prev) => {
            const id = Math.random()
            const expiryDate = Date.now() + MAX_MS_PER_ALERT
            const filterExceedingAlerts = prev.length >= MAX_ALERT_LENGTH ? prev.filter((_, i) => i !== 0) : prev
            return [...filterExceedingAlerts, { ...props, id, expiryDate }]
        })
    }, [])

    const onRemoveAlert = (id: number) => {
        setAlert(prev => prev.filter((i) => i.id !== id))
    }

    useEffect(() => {
        let timeouts: Array<number> = []
        alerts.forEach(i => {
            const restTimer = i.expiryDate - Date.now()
            timeouts.push(
                setTimeout(() => {
                    onRemoveAlert(i.id)
                }, restTimer) as unknown as number
            )

        })
        return () => {
            timeouts.forEach(i => clearTimeout(i))
        }
    }, [alerts])

    return {
        alertHandler,
        onRemoveAlert,
        alerts
    }
}

export {
    type AlertGlobalInStateProps
}
export default useAlertGlobal