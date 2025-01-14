import router from "@/router"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import transformToUppercase from "@/utils/transformToUppercase.utils"
import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { memo } from "react"
import ProductDiscountBand from "./DiscountBand.product"
import classNames from "classnames"
import { ProductPreview } from "clothing-store-shared/types"


const ProductCard = memo(({ discount = 0, product, url, price, color, brand, category, _REF }: ProductPreview.Product & { _REF?: any }) => {

    const calculateDiscount = (discount / 100) * price

    return (
        <Card
            ref={_REF}
            as="article"
            classNames={{
                body: "p-0 pb-[80%] relative flex-0 overflow-hidden",
                footer: "flex-0 flex-wrap p-1 m-0 break-all  flex-col min-h-[95px]",
                base: "min-h-[300px] hover:scale-90 rounded-sm shadow-none border-1 border-default-200 lg:min-w-[200px]  cursor-pointer relative",
                header: "p-0 relative block m-0",
            }}
            role="article"
            aria-labelledby="product-product"
            aria-describedby="product-price product-discount">
            <CardHeader role="banner">
                {discount > 0 &&
                    <ProductDiscountBand
                        discount={discount}
                        aria-label={`Descuento de ${discount}%`}
                    />
                }
            </CardHeader>

            <CardBody
                role="region"
                aria-labelledby="product-image">
                <Image
                    draggable={false}
                    classNames={{
                        wrapper: "static z-0"
                    }}
                    alt={product}
                    src={url || ""}
                    className="absolute w-full  h-full object-contain"
                />
            </CardBody>

            <CardFooter
                className="justify-start"
                role="contentinfo">
                <h3
                    className="text-[15px] max-h-[80px] leading-1 overflow-hidden">
                    {transformToUppercase(product)}
                </h3>
                <span className="font-medium text-sm -mt-1 text-default-800">{`(${transformToUppercase(color)})`}</span>
                <div className="flex flex-wrap justify-center  items-center gap-x-1">
                    <span
                        className={classNames(
                            "text-[15px] font-bold",
                            { "text-danger-600": discount }
                        )}>
                        {transformToCurrency(price - calculateDiscount, "ARS")}
                    </span>
                    {discount ?
                        <div
                            className="flex items-center text-start gap-1"
                            aria-label="Precio original con descuento">
                            <span
                                className="text-[12px]  line-through">
                                {transformToCurrency(price, "ARS")}
                            </span>
                        </div>
                        : ""
                    }
                </div>
            </CardFooter>

            <span
                onClick={() => router.navigate(`/productos/${brand}/${category}/${product}?color=${color}`)}
                className="link bg-transparent absolute h-full w-full"
                aria-label={`Ver detalles de ${product}`}
                role="link">
            </span>
        </Card>
    )
})

export default ProductCard