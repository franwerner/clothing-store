import InputBase from "@/containers/form-base/InputBase";
import { ChangeEventHandler, memo } from "react";
import { EditableItemInfo } from ".";

interface InputItemProps extends EditableItemInfo {
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const InfoInputItem = memo(({ value, label, name, onChange }: InputItemProps) => (
    <InputBase
        className="min-w-[250px] max-w-[250px] "
        label={label}
        variant="bordered"
        labelPlacement="inside"
        onChange={onChange}
        value={value}
        name={name}
    />
))

export default InfoInputItem