import router from "@/router";
import { Select, SelectItem } from "@nextui-org/react";
import { memo } from "react";

const orderList = [
    { key: "priceAsc", label: "Precio : menor a Mayor" },
    { key: "priceDesc", label: "Precio : mayor a Menor" },
    { key: "nameAsc", label: "A - Z" },
    { key: "nameDesc", label: "Z - A" },
    { key: "bestSellers", label: "Mas vendidos" },
    { key: "offers", label: "Ofertas" },
    { key: "newest", label: "Nuevo" }
]


const ProductsPreviewOrder = memo(() => {

    const getDefaultKey = () => {
        const order =  new URLSearchParams(window.location.search).get("order")
        return order && orderList.find(i => i.key == order)?.key || ""
    }

    return (
        <Select
            classNames={{
                trigger: "border-1 border-default-300 ",
                base: "py-3"
            }}
            color="secondary"
            variant="bordered"
            className="max-w-xs "
            defaultSelectedKeys={[getDefaultKey()]}
            placeholder="Selecciona un orden"
            label="Ordenar por">
            {
                orderList.map((i) =>
                    <SelectItem
                        onPress={() => {
                            const searchParams = new URLSearchParams(window.location.search)
                            const order = searchParams.get("order")
                            if (order == i.key) {
                                searchParams.delete("order")
                            } else {
                                searchParams.set("order", i.key)
                            }
                            router.navigate(`?${searchParams}`)
                        }}
                        key={i.key}>
                        {i.label}
                    </SelectItem>)
            }
        </Select>
    );
})

export default ProductsPreviewOrder