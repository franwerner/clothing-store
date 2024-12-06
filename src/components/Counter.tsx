import { ReactNode, useEffect, useState } from "react"

interface CounterProps {
    hours?: number
    minutes?: number
    seconds?: number
}

const Counter = ({ minutes = 0, hours = 0, seconds = 0 }: CounterProps) => {

    const hoursToSeconds = hours * 60 * 60
    const minutesToSeconds = minutes * 60
    const [count, setCount] = useState(hoursToSeconds + minutesToSeconds + seconds)


    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => {
                if (prev - 1 <= 0) {
                    clearInterval(interval)
                    return 0
                } else {
                    return --prev;
                }
            })
        }, 1000);
        return () => clearInterval(interval)
    }, [])

    return (
        <span>{count}</span>
    )
}

export default Counter