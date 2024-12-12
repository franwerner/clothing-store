import { UrlQueryParams  } from ".."

const queryToString = (querys: UrlQueryParams  = {}) => {
    let queryToString = ""
    for (const key in querys) {
        const value = querys[key]
       if(value || value === 0){
        if (queryToString) {
            queryToString += `&${key}=${value}`
        } else {
            queryToString += `?${key}=${value}`
        }
       }
    }
    return queryToString
}

export default queryToString