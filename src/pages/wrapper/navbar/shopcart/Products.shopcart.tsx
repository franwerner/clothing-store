import IProduct from "@/interfaces/Product.interfaces";
import { productsTest1 } from "@/mocks/products.mocks";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import { Button, Image } from "@nextui-org/react";

const Product = ({ discount, name, price, url,count = 0 }: IProduct & {count ?: number }) => {

    const calculateDiscount = price * (discount / 100)

    return (
        <article
            className="bg-default-5 bg-default-50  border-b-2 flex flex-col rounded-md p-2">
            <div className="grid  gap-1 auto-cols-auto xs:grid-cols-[auto,1fr,1fr]">
                <Image
                    width={80}
                    height={80}
                    loading="lazy"
                    isZoomed
                    radius="sm"
                    alt={name}
                    title={name}
                    classNames={{
                        img: "object-contain"
                    }}
                    src={url}
                />

                <section className="flex justify-evenly w-full max-xs:items-center   max-xs:order-1 max-xs:col-span-2 flex-col">
                    <p className=" text-[16px] font-medium overflow-hidden break-all ">{transformToUppercase(name)}</p>
                    <div className="flex items-center">
                        <Button
                            variant="faded"
                            className="material-symbols-outlined  hover:scale-90  bg-default-100 border  rounded-full"
                            isIconOnly
                            size="sm">
                            remove
                        </Button>
                        <p className="px-2  text-black font-semibold rounded-full ">{count}</p>
                        <Button
                            variant="faded"
                            className="material-symbols-outlined hover:scale-90 bg-default-100 border  rounded-full"
                            isIconOnly
                            size="sm">
                            add
                        </Button>
                    </div>
                </section>

                <section className="flex  justify-end">
                    <div className="grid text-end items-center break-all" >
                        <small >{-discount}%</small>
                        <span className=" text-[12px] line-through font-light">{transformToCurrency(calculateDiscount, "ARS")}</span>
                        <span className="font-medium">{transformToCurrency(price, "ARS")}</span>
                    </div>
                    <span
                        className="material-symbols-outlined cursor-pointer transition duration-100 self-start select-none  min-h-min active:scale-90  border-0 text-2xl text-black">
                        delete
                    </span>
                </section>
            </div>
        </article>
    );
};

const VoidShopcart = () => {

    return (
        <div id="void-shopcart" className="flex flex-1 justify-center items-center h-full rounded-md p-4 ">
            <p className=" uppercase text-xl  p-3 rounded-lg">¡El carrito de compras esta vacio!</p>
        </div>
    )
}

const ShopCartProducts = () => {

    return (
        <section id="shoptcart-product" className="flex-1  flex flex-col bg-default-50 rounded-md  ">
            {
                productsTest1.length > 0 ?
                    productsTest1.map((props) => <Product key={props.id}   {...props} />) :
                    <VoidShopcart />
            }
        </section>
    )
}


export default ShopCartProducts;