import router from "@/router";
import { Select, SelectItem } from "@nextui-org/react";
import { memo } from "react";

const orderList = [
    { key: "price", label: "Precio : menor a Mayor", direction: "asc" },
    { key: "price", label: "Precio : mayor a Menor", direction: "desc" },
    { key: "name", label: "A - Z", direction: "asc" },
    { key: "name", label: "Z - A", direction: "desc" },
    { key: "offers", label: "Ofertas", direction: "desc" },
    { key: "newest", label: "Nuevo", direction: "desc" }
]

const getDefaultKey = () => {
    const order = new URLSearchParams(window.location.search).get("sortDirection")
    const sortField = new URLSearchParams(window.location.search).get("sortField")
    const find = orderList.find(i => i.key == sortField && i.direction == order)
    if (find) {
        return find.key + find.direction
    }
}

const ProductsPreviewOrder = memo(() => {

    const defaultKey = getDefaultKey()
    return (
        <Select
            classNames={{
                trigger: "border-1 border-default-300 ",
                base: "py-3"
            }}
            color="secondary"
            variant="bordered"
            className="max-w-xs "
            defaultSelectedKeys={defaultKey ? [defaultKey] : undefined}
            placeholder="Selecciona un orden"
            label="Ordenar por">
            {
                orderList.map((i) =>
                    <SelectItem
                        onPress={() => {
                            const searchParams = new URLSearchParams(window.location.search)
                            const sortField = searchParams.get("sortField")
                            const sortDirection = searchParams.get("sortDirection")
                            if (sortField == i.key && sortDirection == i.direction) {
                                searchParams.delete("sortDirection")
                                searchParams.delete("sortField")
                            } else {
                                searchParams.set("sortDirection", i.direction)
                                searchParams.set("sortField", i.key)
                            }
                            router.navigate(`?${searchParams}`)
                        }}
                        key={i.key + i.direction}>
                        {i.label}
                    </SelectItem>)
            }
        </Select>
    );
})

export default ProductsPreviewOrder