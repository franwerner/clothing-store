import { ZodError } from "zod"

const zodPickMessage = (zodError?: ZodError) => {
    const isArray = Array.isArray(zodError?.errors) ? zodError.errors : []
    return isArray.reduce((acc, current) => {
        return [
            ...acc,
            current.message
        ]
    }, [] as Array<string>)
}

export default zodPickMessage