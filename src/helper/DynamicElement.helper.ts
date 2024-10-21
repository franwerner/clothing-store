import { ComponentProps, createElement, ElementType } from "react"

const DynamicElement = <T extends ElementType>({ as, children, ...props }: ComponentProps<T> & { as: T }) => {

    return createElement(
        as,
        props,
        children
    )
}


export default DynamicElement