import { Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react"
import { memo } from "react"
import ProductDiscountBand from "./DiscountBand.product"
import ProductWithoutStock from "./WithoutStock.product"
import transformToCurrency from "@/helper/transformToCurrency.helper"
import transformToUppercase from "@/helper/transformToUppercase.helper"

interface ProductProps {
    id: number,
    name: string,
    discount: number,
    url: string,
    price: number,
    stock: boolean,
}


const Product = memo(({ discount, name, url, price, stock, id }: ProductProps) => {

    const calculateDiscount = (discount / 100) * price

    return (
        <Card
            as="article"
            id={id.toString()}
            classNames={{
                body: "p-0 pb-[80%]  relative flex-0",
                footer: " flex-0  flex-wrap p-1 m-0 break-all  flex-col bg-default-50 min-h-[95px] text-center tracking-widest text-default-600 ",
                base: `min-h-[280px]  bg-default-50 group cursor-pointer relative  min-w-[200px]`,
                header: "p-0 relative block m-0  ",
            }}
        >
            <CardHeader>
                {discount > 0 && <ProductDiscountBand discount={discount} />}
                {!stock && <ProductWithoutStock />}
            </CardHeader>
            <CardBody >
                <div className={`${!stock ? "bg-red-900" : "bg-black"} bg-opacity-0 group-hover:bg-opacity-20 absolute z-10 h-full w-full`} />
                <Image
                    classNames={{
                        wrapper: "static z-0"
                    }}
                    alt={name}
                    src={url}
                    className="absolute w-full   h-full object-contain "
                />
            </CardBody>

            <CardFooter  >
                <h3 className="font-oswald text-[13px] group-hover:text-default-900 font-semibold  text-wrap truncate uppercase text-center ">{transformToUppercase(name)}</h3>
                {
                    discount > 0 && <div className="flex items-center gap-1 text-w py-[2px]">
                        <span className="text-[12px] line-through">{transformToCurrency(price, "ARS")}</span>
                        <span className="text-[10px]">{discount}% OFF</span>
                    </div>
                }
                <span className="font-oswald text-[16px] group-hover:text-default-900  ">{transformToCurrency(price - calculateDiscount, "ARS")}</span>
            </CardFooter>
        </Card>
    )
})

export type { ProductProps }
export default Product