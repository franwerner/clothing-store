import { isString } from "my-utilities"

const monthsToSpanish = {
    0: "Ene",
    1: "Feb",
    2: "Mar",
    3: "Abr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Ago",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dic"
}
const adaptDateFormat = (date: string | Date) => {
    const dateObj = isString(date) ? new Date(date) : date
    const getMonth = dateObj.getMonth()
    const month = getMonth in monthsToSpanish ? monthsToSpanish[dateObj.getMonth() as keyof typeof monthsToSpanish] : monthsToSpanish["0"]
    const dayNumber = dateObj.getDate()
    const year = dateObj.getFullYear().toString()
    return `${dayNumber} ${month}, ${year}`
}

export default adaptDateFormat