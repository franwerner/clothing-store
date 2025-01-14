import { Input, Select } from "@nextui-org/react"
import { ChangeEventHandler } from "react"

interface SelectDirectionBaseProps {
    value: string
    name: "province" | "locality"
    onChange: ChangeEventHandler<HTMLInputElement>
    isInvalid: boolean
    select: string
    isLoading: boolean
    "ariaLabel": string
    placeholder: string
    children: any
    defaultKey: string
    label: string
}

const SelectDirectionBase = ({
    name,
    onChange,
    value,
    isLoading,
    ariaLabel,
    placeholder,
    isInvalid,
    children,
    defaultKey,
    label
}: SelectDirectionBaseProps) => {

    return (
        <Select
            isRequired
            className="max-w-sm "
            classNames={{
                trigger: "min-h-[45px] ",
                innerWrapper: "overflow-hidden  relative",
                label: "capitalize"
            }}
            label={label}
            selectedKeys={[""]}
            startContent={<span className="truncate text-sm  absolute">{defaultKey}</span>}
            isInvalid={isInvalid}
            validationBehavior="aria"
            spinnerProps={{
                color: "secondary"
            }}
            aria-label={ariaLabel}
            isLoading={isLoading}
            placeholder={!defaultKey ? placeholder : ""}
            listboxProps={{
                isVirtualized: true,
                virtualization: {
                    itemHeight: 40,
                    maxListboxHeight: 150
                },
                topContent: <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    color="secondary"
                    autoComplete="off"
                    endContent={
                        <span className="material-symbols-outlined rotate-90">
                            search
                        </span>
                    } />,
            }}>
            {children}
        </Select>
    )
}
export default SelectDirectionBase