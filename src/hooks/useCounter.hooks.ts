import { useEffect, useState } from "react"

interface UseCounterProps {
    hours?: number
    minutes?: number
    seconds?: number,
    type?: "increment" | "decrement",
    stop?: boolean,
    step?: number
}

const hourInSeconds = 3600
const minuteInSeconds = 60

const useCounter = ({
    minutes = 0,
    hours = 0,
    seconds = 0,
    type = "increment",
    stop = false,
    step = 1
}: UseCounterProps = {}) => {

    const verifyStep = step <= 1 ? 1 : step 

    const hoursToSeconds = Math.abs(hours) * hourInSeconds
    const minutesToSeconds = Math.abs(minutes) * minuteInSeconds
    const calculateSeconds = (hoursToSeconds + minutesToSeconds + Math.abs(seconds))
    const [count, setCount] = useState(type == "decrement" ? calculateSeconds : 0)

    const hoursResidue = Math.floor(count / hourInSeconds)
    const minutesResidue = Math.floor((count % hourInSeconds) / minuteInSeconds)
    const secondsResidue = Math.floor((count % hourInSeconds) % minuteInSeconds)
    
    useEffect(() => {
        if (stop) return
        const interval = setInterval(() => {
            setCount(prev => {

                const nextCount = type === "decrement" ? prev - verifyStep : prev + verifyStep
                if (nextCount <= 0 || nextCount >= calculateSeconds) {
                    clearInterval(interval)
                    return type === "decrement" ? 0 : calculateSeconds
                } else {
                    return nextCount
                }
            })
        }, verifyStep * 1000)
        return () => clearInterval(interval)
    }, [stop])


    return {
        hours: hoursResidue,
        minutes: minutesResidue,
        seconds: secondsResidue,
        isFinish: count <= 0
    }
}

export {
    type UseCounterProps
}
export default useCounter