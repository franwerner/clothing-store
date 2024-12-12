import { UrlQueryParams } from "..";

const paramsToString = (params: UrlQueryParams, target: string) => {

    let currentTarget = target
    if (currentTarget.endsWith('/')) {
        currentTarget = currentTarget.slice(0, currentTarget.length - 1);
    }

    for (const key in params) {
        const value = params[key]
        if (value || value == 0) {
            currentTarget += `/${value}/`
        }
    }

    return currentTarget
}

export default paramsToString
