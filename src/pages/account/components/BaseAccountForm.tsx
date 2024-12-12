import { FC } from "react";

const BaseAccountForm: FC<JSX.IntrinsicElements["form"]> = ({ children, className, onKeyUp, ...props }) => {

    return (
        <form
            onKeyUp={(e) => {
                if (e.key === "Enter") {
                    onKeyUp && onKeyUp(e)
                }
            }}
            className={`${className} sm:max-w-[400px] px-3 w-full`}
            {...props}
        >
            {children}
        </form>
    )
}

export default BaseAccountForm