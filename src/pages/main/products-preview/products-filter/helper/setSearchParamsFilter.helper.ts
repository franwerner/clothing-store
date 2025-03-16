
interface setSearchParamsFilterProps {
    isActive?: boolean,
    value: any,
    param: string
}

const setSearchParamsFilter = ({ isActive, value, param }: setSearchParamsFilterProps) => {
    const search = window.location.search
    const newURLSearchParms = new URLSearchParams(search)
    let getQuery = newURLSearchParms.get(param) || ""

    if (isActive) {
        newURLSearchParms.set(param, getQuery.split("-").filter(i => i != value).join("-"))
    } else {
        newURLSearchParms.set(param, `${getQuery}${getQuery ? "-" : ""}${value}`)
    }

    return newURLSearchParms
};

export default setSearchParamsFilter