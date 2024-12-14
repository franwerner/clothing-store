const removePropertiesByValues  = <T extends object>(object:T,valuesToFilter:Array<any>) => {
    const filter = Object.entries(object).filter(([_,value]) => !valuesToFilter.includes(value) )
    return Object.fromEntries(filter) as Partial<T>
}

export default removePropertiesByValues