
interface setSearchParamsFilterProps {
    isActive?: boolean,
    value: any,
    param: string
}

const setSearchParamsFilter = ({ isActive, value, param }: setSearchParamsFilterProps) => {
    const search = window.location.search
    const newURLSearchParms = new URLSearchParams(search)
    const getColor = newURLSearchParms.get(param) || ""
    if (isActive) {
        newURLSearchParms.set(param, getColor.split("-").filter(i => i != value).join("-"))
    } else {
        newURLSearchParms.set(param, `${getColor}${value}-`)
    }
    return newURLSearchParms
};

export default setSearchParamsFilter