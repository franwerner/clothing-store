import { productFullPreviewMock } from "@/mocks/productFullPreview.mocks";
import classNames from "classnames";
import { memo } from "react";

const { variants } = productFullPreviewMock

const ProductFullViewColor = memo(({ variant, changeVariant }: { changeVariant: (index: number) => void, variant: number }) => {

    const { color } = variants[variant]
    return (
        <section  id="product-color">
            <h3 className=" text-default-700 flex text-sm">Color: <span className="font-bold uppercase ml-1">{color}</span></h3>
            <div className="inline-flex flex-wrap gap-2   items-start mt-3 justify-start">
                {
                    variants.map(({ hexadecimal, colorID }, index) =>
                        <button
                            key={colorID}
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
                                        "rotate-180 transition-transform !scale-100 duration-200": variant === index,
                                        " duration-100 transition-transform": variant !== index,
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