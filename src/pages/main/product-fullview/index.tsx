import usePostShopcartAddProducts from "@/api/shopcart/usePostAddProducts.api";
import LoadPage from "@/components/LoadPage";
import PageWrapper from "@/components/PageWrapper";
import useForm from "@/hooks/useForm.hook";
import { ProductFullview } from "clothing-store-shared/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import useGetProductFullview from "./api/useGetProductFullview.api";
import ProductFullViewButtonShopcart from "./ButtonShopcart.product-fullview";
import ProductFullViewColor from "./Color.product-fullview";
import ProductImages from "./Images.product-fullview";
import ProductFullViewInfo from "./Info.product-fullview";
import ProductFullViewQuantity from "./Quantity.product-fullview";
import ProductFullViewSizes from "./Sizes.product-fullview";
import findColorByName from "./utils/findColorByName.utils";
import pickOnlyColors from "./utils/pickOnlyColors.utilts";


const Details = ({ colors, product }: ProductFullview.Base) => {

    const [variant, setVariant] = useState(() => findColorByName(colors))

    const [size, setSize] = useState(0)
    const { form, setValue } = useForm({ quantity: 0 })

    const { images, sizes, color } = colors[variant]

    const { quantity } = form

    const { stock, size_id } = sizes[size]

    const { isLoading, setRequest } = usePostShopcartAddProducts([{
        color_fk: color.color_id,
        product_fk: product.product_id,
        size_fk: size_id,
        quantity
    }])

    const onlyColors = useMemo(() => pickOnlyColors(colors), [])

    const changeVariant = useCallback((n: number) => {
        setVariant(n)
        setSize(0)
    }, [])

    const changeSize = useCallback(setSize, [])

    const setQuantity = (value: number) => setValue(() => ({ quantity: value }))

    const emptyStock = !stock

    useEffect(() => {
        if (quantity && emptyStock) setQuantity(0)
    }, [variant, size])

    return (
        <div className="md:flex block shadow-md  gap-x-3 min-h-[60dvh] ">
            <ProductImages
                variant={variant}
                images={images} />
            <main className={`flex-1 flex flex-col gap-5  bg-white  p-6 `}>
                <ProductFullViewInfo
                    discount={product.discount}
                    price={product.price}
                    product={product.product}
                    emptyStock={emptyStock} />
                <ProductFullViewColor
                    changeVariant={changeVariant}
                    color={variant}
                    colors={onlyColors}
                />
                <ProductFullViewSizes
                    changeSize={changeSize}
                    size={size}
                    sizes={sizes} />
                <ProductFullViewQuantity
                    quantity={quantity}
                    isDisabled={emptyStock}
                    setQuantity={setQuantity} />
                <ProductFullViewButtonShopcart
                    isLoading={isLoading}
                    addProductToCart={setRequest}
                    isDisabled={emptyStock || !quantity} />
            </main>
        </div>
    )
}

const ProductNotFound = () => {
    return (
        <div className="uppercase flex-1 flex justify-center   flex-col items-center">
            <div className="bg-danger-50 px-10 py-8 rounded-lg grid justify-center">
                <h3 className="text-danger font-bold text-3xl text-center ">404</h3>
                <p className="text-center">Producto no encontrado o no se encuentra disponible.</p>
            </div>
        </div>
    )
}

const ProductFullView = () => {
    const { isLoading, details, success, code } = useGetProductFullview()

    return (
        <PageWrapper
            className="sm:px-0 md:p-3 flex flex-col [&_#breadcrumbs]:!py-4"
            size="xl">
            {
                isLoading || (!code && !success) ? <LoadPage /> :
                    !success ? <ProductNotFound /> :
                        <Details {...details} />
            }
        </PageWrapper>
    )
}

export default ProductFullView