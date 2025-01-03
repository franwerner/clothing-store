import PageWrapper from "@/components/PageWrapper";
import useForm from "@/hooks/useForm.hook";
import { productFullPreviewMock } from "@/mocks/productFullPreview.mocks";
import { useCallback, useEffect, useState } from "react";
import ProductFullViewButtonShopcart from "./ButtonShopcart.product-fullview";
import ProductFullViewColor from "./Color.product-fullview";
import ProductImages from "./Images.product-fullview";
import ProductFullViewInfo from "./Info.product-fullview";
import ProductFullViewQuantity from "./Quantity.product-fullview";
import ProductFullViewSizes from "./Sizes.product-fullview";
import useShopcartAddProducts from "@/api/hook/users/shopcart/useAddProducts.shopcart";

const { variants } = productFullPreviewMock

const ProductFullView = () => {
    const [variant, setVariant] = useState(0)
    const [size, setSize] = useState<number>(0)
    const { form, setValue } = useForm({ quantity: 0 })
    const [button, setButton] = useState(false)

    const [{ isLoading }, { setRequest }] = useShopcartAddProducts([{ color_fk: 3, product_fk: 575, size_fk: 7, quantity: 1 }])

    const changeVariant = useCallback((n: number) => {
        setVariant(n)
        setSize(0)
    }, [])

    const changeSize = useCallback(setSize, [])

    const setQuantity = (value: number) => setValue("quantity", value)

    const { quantity } = form

    const { images, sizes } = variants[variant]

    const { stock } = sizes[size]

    const emptyStock = !stock

    useEffect(() => {
        if (quantity && emptyStock) setQuantity(0)
    }, [variant, size])

    useEffect(() => {
        if (!button) return
        const timeout = setTimeout(() => {
            setButton(false)
            setQuantity(0)
        }, 1300)
        return () => clearTimeout(timeout)
    }, [button])

    return (
        <PageWrapper
            className="sm:px-0 md:p-3 [&_#breadcrumbs]:!py-4"
            size="xl">
            <div className="md:flex block shadow-md  gap-x-3 min-h-[60dvh] ">
                <ProductImages
                    variant={variant}
                    images={images} />
                <main className={`flex-1 flex flex-col gap-5 ${button ? "pointer-events-none" : ""}  bg-white  p-6 `}>
                    <ProductFullViewInfo emptyStock={emptyStock} />
                    <ProductFullViewColor
                        changeVariant={changeVariant}
                        variant={variant} />
                    <ProductFullViewSizes
                        changeSize={changeSize}
                        size={size}
                        variant={variant} />
                    <ProductFullViewQuantity
                        quantity={quantity}
                        isDisabled={button || emptyStock}
                        setQuantity={setQuantity} />
                    <ProductFullViewButtonShopcart
                        isLoading={isLoading}
                        addProductToCart={setRequest}
                        isDisabled={emptyStock || !form.quantity} />
                </main>
            </div>

        </PageWrapper>
    );
};

export default ProductFullView