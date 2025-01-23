import { memo } from "react"
import { BaseItemInfo } from "."

const InfoItemDisplay = memo(({ text, label }: Pick<BaseItemInfo, "text" | "label">) => (
    <div>
        <span className="text-sm text-default-500">{label}</span>
        <h3 className="truncate text-start text-md text-default-600">{text}</h3>
    </div>
))

export default InfoItemDisplay