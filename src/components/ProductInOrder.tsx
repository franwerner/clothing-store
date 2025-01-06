import transformToCurrency from "@/utils/transformToCurrency.utils"
import { Image } from "@nextui-org/react"
import classNames from "classnames"

interface ProductInOrder {
    product: string
    discount: number
    price: number
    quantity: number
    size: string
    color: string
    url: string
}

const ProductInOrder = ({ product, discount, price, url, quantity, color, size }: ProductInOrder) => {

    const isDiscount = discount > 0

    return (
        <div
            className=" flex max-sm:flex-col rounded-lg border-b-1 last:border-0 first:border-t-1 p-2 gap-x-1 max-sm:items-center justify-between">
            <Image
                classNames={{ img: "object-contain max-h-[100px]", wrapper: "self-center" }}
                src={"https://http2.mlstatic.com/D_NQ_NP_896061-MLA79282533984_092024-O.webp"} />
            <div className="sm:ms-1 max-sm:order-3 flex-1">
                <h4 className="font-semibold break-all max-sm:text-center text-md text-default-800">{product}</h4>
                <div className="max-sm:flex justify-center w-full  flex-wrap gap-1">
                    <h4 className="text-sm text-default-500">
                        Color: <span className="text-default-700 font-semibold uppercase">{color}</span>
                    </h4>
                    <h4 className="text-sm text-default-500">
                        Tamaño: <span className="text-default-700 font-semibold uppercase">{size}</span>
                    </h4>
                    <h4 className="text-sm text-default-500">
                        Cantidad: <span className="text-default-700 font-semibold uppercase">{quantity}</span>
                    </h4>
                </div>
            </div>
            <div className="flex max-sm:flex-col gap-x-2">
                <h4 className={classNames("font-bold max-sm:order-1", { "text-danger-600": isDiscount })}>
                    {transformToCurrency((price * (1 - discount / 100)) * quantity, "ARS")}
                </h4>
                {isDiscount && <h4 className="line-through text-sm">{transformToCurrency(price * quantity, "ARS")}</h4>}
            </div>
        </div>
    )
}

export default ProductInOrder