import classNames from "classnames";
import { ProductFullview } from "clothing-store-shared/types";
import { memo } from "react";

interface ProductFullViewColorProps {
    changeVariant: (index: number) => void
    colors: Array<ProductFullview.Color>
    color: number,
}

const ProductFullViewColor = memo(({ color: colorIndex, changeVariant, colors }: ProductFullViewColorProps) => {

    const { color } = colors[colorIndex]

    return (
        <section id="product-color">
            <h3 className=" text-default-700 flex text-sm">Color: <span className="font-bold uppercase ml-1">{color}</span></h3>
            <div className="inline-flex flex-wrap gap-2   items-start mt-3 justify-start">
                {
                    colors.map(({ hexadecimal, product_color_id }, index) =>
                        <button
                            key={product_color_id}
                            className={classNames(
                                "flex-1 group   h-8 min-w-8  border-0 p-0 max-w-8",

                            )}
                            onClick={() => changeVariant(index)}>
                            <span
                                style={{
                                    backgroundColor: hexadecimal
                                }}
                                className={classNames(
                                    "w-full h-full border border-default-500 scale-75  rounded-sm inline-block",
                                    {
                                        "rotate-180 transition-transform !scale-100 duration-200": colorIndex === index,
                                        " duration-100 transition-transform": colorIndex !== index,
                                    }
                                )}
                            ></span>
                        </button>
                    )
                }
            </div>
        </section>
    );
})

export default ProductFullViewColor