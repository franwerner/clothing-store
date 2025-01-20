import classNames from "classnames";
import { ProductFullview } from "clothing-store-shared/types";
import { memo } from "react";


interface ProductFullViewSizesProps {
    changeSize: (i: number) => void
    sizes: Array<ProductFullview.Size>,
    size: number
}

const ProductFullViewSizes = memo(({ changeSize, size: sizeIndex, sizes }: ProductFullViewSizesProps) => {

    return (
        <section id="product-waits">
            <h3 className="text-default-700 flex text-sm">
                Talle:
                <span className="font-bold uppercase ml-1">{sizes[sizeIndex].size}</span>
            </h3>
            <div className="inline-flex flex-wrap gap-2 items-start mt-3 justify-start">
                {
                    sizes.map(({ product_color_size_id, size }, index) =>
                        <button
                            onClick={() => changeSize(index)}
                            key={product_color_size_id}
                            className={classNames("flex-1 font-medium border max-w-min h-8 min-w-12 rounded-sm active:scale-85 duration-100 transition-transform", {
                                "bg-default-800 text-white border-black": index === sizeIndex,
                                "bg-white border-default-400": index !== sizeIndex
                            })}
                        >
                            <span className="w-full uppercase text-sm h-full">{size}</span>
                        </button>
                    )
                }
            </div>
        </section>
    )
})

export default ProductFullViewSizes