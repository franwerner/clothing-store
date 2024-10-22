import transformToCurrency from "@/helper/transformToCurrency.helper";
import { Button, Image } from "@nextui-org/react";

interface ProductShopcartProps {
    id: number,
    url: string,
    name: string,
    discount: number,
    price: number
}

const productTest: Array<ProductShopcartProps> = Array.from<ProductShopcartProps, ProductShopcartProps>({ length: 10 }, () => {
    return {
        url: "https://acdn.mitiendanube.com/stores/001/874/631/products/1080x1080-421-26a776f1c63a0e562516481597741027-480-0.webp",
        name: "Zapatillas negras con plantilla asdasdasd",
        discount: 20,
        price: 70000,
        id: Math.random()
    }
})

const Product = ({ discount, name, price, url }: ProductShopcartProps) => {

    const calculateDiscount = price * (discount / 100)

    return (
        <article
            className="bg-default-5 bg-default-50  border-b-2 flex flex-col rounded-md p-2">
            <section className="grid  grid-cols-[auto,1fr,auto,auto] ">
                <Image
                    width={80}
                    loading="lazy"
                    isZoomed
                    radius="sm"
                    alt={name}
                    title={name}
                    classNames={{
                        wrapper: "mr-1"
                    }}
                    src={url} />

                <small className="underline overflow-hidden text-ellipsis">{name}</small>

                <div className="tracking-wider text-default-600 flex flex-col justify-center" >
                    <small className="font-oswald ">{-discount}%</small>
                    <p className=" text-[12px] font-oswald line-through font-light">{transformToCurrency(calculateDiscount, "ARS")}</p>
                    <p className="font-semibold  font-oswald">{transformToCurrency(price, "ARS")}</p>
                </div>

                <div 
                    className="p-0 ">
                    <Button
                        variant="bordered"
                        color="secondary"
                        isIconOnly
                        className="material-symbols-outlined border-0 text-1xl text-default-500">
                        delete
                    </Button>
                </div>
            </section>

            <section className="flex items-center w-100 gap-3 m-auto border-1 border-default-400 h-[32px] overflow-hidden w-min rounded-lg" >
                <Button
                    color="default"
                    variant="solid"
                    className="material-symbols-outlined text-1xl text-white bg-default-700  rounded-none"
                    isIconOnly>
                    remove
                </Button>
                <p className="px-1">3</p>
                <Button
                    color="default"
                    variant="solid"
                    className="material-symbols-outlined text-1xl text-white bg-default-700  rounded-none"
                    isIconOnly>
                    add
                </Button>
            </section>
        </article>
    );
};

const VoidShopcart = () => {

    return (
        <div id="void-shopcart" className="flex flex-1 justify-center items-center h-full  rounded-md  p-4 ">
            <p className="font-medium uppercase ">El carrito de compras esta vacio!</p>
        </div>
    )
}

const ShopCartProducts = () => {

    return (
        <section id="shoptcart-product" className="flex-1 flex flex-col bg-default-50 rounded-md  ">
            {
                productTest.length > 0 ?
                    productTest.map((props) => <Product key={props.id}   {...props} />) :
                    <VoidShopcart />
            }
        </section>
    )
}


export default ShopCartProducts;