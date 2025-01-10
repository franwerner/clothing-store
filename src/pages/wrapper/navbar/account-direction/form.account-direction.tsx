import ActionButton from "@/components/ActionButton"
import { Input, Select, SelectItem } from "@nextui-org/react"
import useGetProvinces from "./api/georef/useGetProvinces.api"

const FormAccountDirection = () => {

    const {provinces} = useGetProvinces()

    return (
        <div className="flex-1 grid">
            <form className="grid grid-cols-2 items-start justify-start gap-3">
                <Select
                >
                    <SelectItem >{"fdfdf"}</SelectItem>
                </Select>
                <Input
                    type="text"
                >
                </Input>
                <Input
                    type="text"
                >
                </Input>
                <Input
                    type="text"
                >
                </Input>
                <Input
                    type="text"
                >
                </Input>
                <Input
                    type="text"
                >
                </Input>
            </form>
            <ActionButton >
                Guardar direccion
            </ActionButton>
        </div>
    )
}
export default FormAccountDirection