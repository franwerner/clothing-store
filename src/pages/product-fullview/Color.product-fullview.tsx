import { productFullPreviewMock } from "@/mocks/productFullPreview.mocks";
import classNames from "classnames";
import { memo } from "react";

const { variants } = productFullPreviewMock

const ProductFullViewColor = memo(({ variant, changeVariant }: { changeVariant: (index: number) => void, variant: number }) => {

    const { color } = variants[variant]
    return (
        <section id="product-color">
            <h3 className=" text-default-700 flex text-sm">Color: <span className="font-bold uppercase ml-1">{color}</span></h3>
            <div className="inline-flex flex-wrap gap-2  items-start mt-3 justify-start">
                {
                    variants.map(({ hexadecimal, colorID }, index) =>
                        <button
                            key={colorID}
                            className={classNames(
                                "flex-1 group border-white h-8 min-w-8 max-w-8",
                                {
                                    "border-4" : variant != index
                                }
                            )}
                            onClick={() => changeVariant(index)}>
                            <span
                                style={{
                                    backgroundColor: hexadecimal
                                }}
                                className={classNames(
                                    "w-full h-full border border-default-400 rounded-sm inline-block",
                                    {
                                        "rotate-180 transition-transform duration-200": variant === index,
                                        "group-active:scale-85 active:scale-85 duration-100 transition-transform": variant !== index,
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