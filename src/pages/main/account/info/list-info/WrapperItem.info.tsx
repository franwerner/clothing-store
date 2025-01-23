import classNames from "classnames"
import { memo } from "react"
import { BaseItemInfo } from "."

type InfoItemWrapperProps = {
    isEditing: boolean
    children: React.ReactNode
    hasError?: boolean
} & Omit<BaseItemInfo, "text" | "label">

const InfoWrapperItem = memo(({ icon, isEditing, hasError, children }: InfoItemWrapperProps) => (
    <div className="flex max-sm:flex-col max-sm:justify-center max-h-min group items-center gap-2">
        <span
            className={classNames(
                "material-symbols-outlined  scale-90 shadow-md border-b-4 rounded-xl text-white border-2 p-2",
                {
                    "bg-danger-300 border-danger-400 sm:self-baseline mt-1": hasError && isEditing,
                    "bg-default-600 border-default-700": !isEditing,
                    "bg-secondary-300 border-secondary-400": !hasError && isEditing,
                    "group-hover:scale-100": isEditing
                }
            )}
        >
            {icon}
        </span>
        {children}
    </div>
))


export default InfoWrapperItem