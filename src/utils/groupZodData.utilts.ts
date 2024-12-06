import { ResponseDataZodInError } from "clothing-store-shared/types"
import { isObject } from "my-utilities"
import { ZodIssueCode } from "zod"

const groupZodData = <T extends object = object>(arr?: ResponseDataZodInError<T>) => {
    type TT = T & { [key in ZodIssueCode]: string }
    const verifyArr = Array.isArray(arr) ? arr : []
    return verifyArr.reduce((acc, current) => {
        if (!isObject(current)) return acc
        const { source, reason = "" } = current
        if (!Array.isArray(source)) return acc
        const key = source[0] as keyof TT
        const object = acc[key]
        if (object) {
            object.push(reason)
        } else {
            acc[key] = [reason]
        }
        return acc
    }, {} as Partial<Record<keyof TT, Array<string>>>)
}




export default groupZodData