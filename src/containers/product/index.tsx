import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { memo } from "react"
import ProductDiscountBand from "./DiscountBand.product"
import ProductWithoutStock from "./WithoutStock.product"
import transformToCurrency from "@/utils/transformToCurrency.utils"
import transformToUppercase from "@/utils/transformToUppercase.utils"
import IProduct from "@/interfaces/Product.interfaces"


const ProductCard = memo(({ discount, name, url, price, stock, id }: IProduct) => {

    const calculateDiscount = (discount / 100) * price

    return (
        <Card
            as="article"
            id={id.toString()}
            classNames={{
                body: "p-0 pb-[80%]  relative flex-0 overflow-hidden  ",
                footer: " flex-0 flex-wrap p-1 m-0 break-all flex-col bg-default-50 min-h-[95px] text-center  text-default-700 ",
                base: `min-h-[280px] md:min-w-[180px] min-w-[160px]  bg-default-50 group cursor-pointer relative`,
                header: "p-0 relative block m-0  ",
            }}
        >
            <CardHeader>
                {discount > 0 && <ProductDiscountBand discount={discount} />}
                {!stock && <ProductWithoutStock />}
            </CardHeader>
            <CardBody >
                <Image
                    draggable={false}
                    classNames={{
                        wrapper: "static z-0"
                    }}
                    alt={name}
                    src={url}
                    className="absolute w-full  h-full object-contain "
                />
            </CardBody>

            <CardFooter  >
                <h3 className="font-oswald text-[15px] max-h-[80px] group-hover:text-default-900  font-semibold  text-wrap truncate uppercase ">{transformToUppercase(name)}</h3>
                {
                    discount > 0 && <div className="flex items-center gap-1 text-w py-[2px]">
                        <span className="text-[12px] line-through">{transformToCurrency(price, "ARS")}</span>
                        <span className="text-[10px]">{discount}% OFF</span>
                    </div>
                }
                <span className="font-oswald text-[16px] group-hover:text-default-900">{transformToCurrency(price - calculateDiscount, "ARS")}</span>
            </CardFooter>
        </Card>
    )
})

export default ProductCard