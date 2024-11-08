import PageWrapper from "@/components/PageWrapper";
import useForm from "@/hooks/useForm.hook";
import { productFullPreviewMock } from "@/mocks/productFullPreview.mocks";
import { useDispatch } from "@/store";
import { useCallback, useEffect, useState } from "react";
import ProductFullViewButtonShopcart from "./ButtonShopcart.product-fullview";
import ProductFullViewColor from "./Color.product-fullview";
import ProductImages from "./Images.product-fullview";
import ProductFullViewInfo from "./Info.product-fullview";
import ProductFullViewQuantity from "./Quantity.product-fullview";
import ProductFullViewSizes from "./Sizes.product-fullview";

const { variants, brand, category, discount, name, id, price } = productFullPreviewMock

const ProductFullView = () => {

    const [variant, setVariant] = useState(0)
    const [size, setSize] = useState<number>(0)
    const { form, setValue } = useForm({ quantity: 0 })
    const [button, setButton] = useState(false)

    const dispatch = useDispatch()

    const dispatchProductoToCart = () => {
        if (emptyStock || !form.quantity) return
        setButton(true)
        dispatch((actions) => actions.shopcart.set({
            name: name,
            id: id,
            colorID,
            product_size_id,
            brand: brand,
            category: category,
            size: s,
            color: color,
            image: images[0].url,
            discount: discount,
            quantity: form.quantity,
            price: price,
        }))
    }

    const changeVariant = useCallback((n: number) => {
        setVariant(n)
        setSize(0)
    }, [])

    const changeSize = useCallback(setSize, [])

    const setQuantity = (value: number) => setValue("quantity", value)

    const { quantity } = form

    const { images, sizes, colorID, color } = variants[variant]

    const { size: s, product_size_id, stock } = sizes[size]

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
                        button={button}
                        dispatchProductoToCart={dispatchProductoToCart}
                        isDisabled={emptyStock || !form.quantity} />
                </main>
            </div>

        </PageWrapper>
    );
};

export default ProductFullView