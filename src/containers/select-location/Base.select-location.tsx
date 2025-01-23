import { Input, Select } from "@nextui-org/react"
import { ChangeEventHandler, ReactNode } from "react"

interface SelectLocationBaseProps {
    search_value: string
    onChange: ChangeEventHandler<HTMLInputElement>
    isInvalid: boolean
    select: string
    isLoading: boolean
    "ariaLabel": string
    placeholder: string
    children: any
    defaultKey: string
    label: string
    errorMessage?:ReactNode
}

const SelectLocationBase = ({
    onChange,
    search_value,
    isLoading,
    ariaLabel,
    placeholder,
    isInvalid,
    children,
    defaultKey,
    label,
    errorMessage
}: SelectLocationBaseProps) => {

    return (
        <Select
            isRequired
            radius="sm"
            className="max-w-sm "
            classNames={{
                trigger: " border-default-400 border-1 data-[open=true]:border-secondary-400 data-[hover=true]:border-secondary-200 ",
                innerWrapper: "overflow-hidden relative",
                label: "capitalize",
                base : "min-w-full "
            }}
            errorMessage={errorMessage}
            label={label}
            selectedKeys={[""]}
            variant="bordered"
            startContent={<span className="truncate text-sm absolute">{defaultKey}</span>}
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
                    name={"search"}
                    value={search_value}
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
export default SelectLocationBase