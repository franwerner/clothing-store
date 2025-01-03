import router from "@/router";
import { Select, SelectItem } from "@nextui-org/react";
import { memo } from "react";
import { useProductPreviewContext } from ".";

const orderList = [
    { key: "price", label: "Precio : menor a Mayor", order: "asc" },
    { key: "price", label: "Precio : mayor a Menor", order: "desc" },
    { key: "name", label: "A - Z", order: "asc" },
    { key: "name", label: "Z - A", order: "desc" },
    { key: "bestSellers", label: "Mas vendidos", order: "desc" },
    { key: "offers", label: "Ofertas", order: "desc" },
    { key: "newest", label: "Nuevo", order: "desc" }
]

const getDefaultKey = () => {
    const order = new URLSearchParams(window.location.search).get("order")
    const orderKey = new URLSearchParams(window.location.search).get("orderKey")
    const find = orderList.find(i => i.key == orderKey && i.order == order)
    if (find) {
        return find.key + find.order
    }
}

const ProductsPreviewOrder = memo(() => {

    const { isLoading } = useProductPreviewContext()
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
            isLoading={isLoading}
            isDisabled={isLoading}
            defaultSelectedKeys={defaultKey ? [defaultKey] : undefined}
            placeholder="Selecciona un orden"
            label="Ordenar por">
            {
                orderList.map((i) =>
                    <SelectItem
                        onPress={() => {
                            const searchParams = new URLSearchParams(window.location.search)
                            const orderKey = searchParams.get("orderKey")
                            const order = searchParams.get("order")
                            if (orderKey == i.key && order == i.order) {
                                searchParams.delete("order")
                                searchParams.delete("orderKey")
                            } else {
                                searchParams.set("order", i.order)
                                searchParams.set("orderKey", i.key)
                            }
                            router.navigate(`?${searchParams}`)
                        }}
                        key={i.key + i.order}>
                        {i.label}
                    </SelectItem>)
            }
        </Select>
    );
})

export default ProductsPreviewOrder