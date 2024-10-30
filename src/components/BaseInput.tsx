import { Input, InputProps } from "@nextui-org/react"
import { memo } from "react"

const BaseInput = memo((props: InputProps) => (
    <Input
        classNames={{
            label: "uppercase font-semibold  text-default-600",
            "inputWrapper": "after:bg-secondary-300",
            base: "min-w-auto",
            ...props.classNames
        }}
        errorMessage=""
        type={"text"}
        labelPlacement="outside"
        variant="underlined"
        color="secondary"
        {...props}
    >
    </Input>
))

export default BaseInput