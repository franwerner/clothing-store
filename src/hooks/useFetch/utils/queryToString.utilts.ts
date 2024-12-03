import { FetchQuery } from ".."

const queryToString = (querys: FetchQuery = {}) => {
    let queryToString = ""
    for (const key in querys) {
        const value = querys[key]
        if (queryToString) {
            queryToString += `&${key}=${value}`
        } else {
            queryToString += `?${key}=${value}`
        }
    }
    return queryToString
}

export default queryToString