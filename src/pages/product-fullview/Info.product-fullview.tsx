import { productFullPreviewMock } from "@/mocks/productFullPreview.mocks";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import classNames from "classnames";
import { memo } from "react";

const { name, price, discount = 0 } = productFullPreviewMock

const ProductFullViewInfo = memo(({ emptyStock }: { emptyStock: boolean }) => {

    const calculateDiscount = price * (discount / 100)

    return (
        <section className="grid gap-y-3" id="product-info">
            <h2 className="text-2xl break-all">
                {transformToUppercase(name)}
            </h2>
            <div className="flex gap-1 items-center">
                <h3 className={classNames(
                    "font-bold text-xl",
                    { "text-danger-600": discount }
                )}>
                    {transformToCurrency(price - calculateDiscount, "ARS")}
                </h3>
                {discount ? <span className="line-through text-sm">{transformToCurrency(price, "ARS")}</span> : ""}
            </div>

            <span className=" text-[14px] text-default-700">
                Disponibilidad:
                <span className={classNames("ms-1 font-bold uppercase", { "line-through": emptyStock })}>
                    {emptyStock ? "Sin stock" : "En stock"}
                </span>
            </span>
        </section>
    );
})

export default ProductFullViewInfo