import { Select, SelectItem } from "@nextui-org/react";

const orderList = [
    "Precio : menor a Mayor",
    "Precio : mayor a Menor",
    "A - Z",
    "Z - A",
    "Mas vendidos"
]

const ProductOrder = () => {
    return (
        <div className="flex justify-center pt-3">
            <Select
            classNames={{
                trigger : "border-1 border-default-300 " ,
            }}
            color="secondary"
            variant="bordered"
                className="max-w-xs"
                defaultSelectedKeys={["Mas vendidos"]}
                placeholder="Selecciona un orden"
                label="Ordenar por">
                {
                    orderList.map((name) => <SelectItem key={name}>{name}</SelectItem>)
                }
            </Select>
        </div>
    );
};

export default ProductOrder;