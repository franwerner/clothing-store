import IProduct from "@/interfaces/Product.interfaces";
import { productsTest1 } from "@/mocks/products.mocks";
import transformToCurrency from "@/utils/transformToCurrency.utils";
import transformToUppercase from "@/utils/transformToUppercase.utils";
import { Button, Image } from "@nextui-org/react";

const Product = ({ discount, name, price, url }: IProduct) => {

    const calculateDiscount = price * (discount / 100)

    return (
        <article
            className="bg-default-5 bg-default-50  border-b-2 flex flex-col rounded-md p-2">
            <section className="grid gap-1 grid-cols-[auto,1fr,auto,auto] ">
                <Image
                    width={80}
                    height={80}
                    loading="lazy"
                    isZoomed
                    radius="sm"
                    alt={name}
                    title={name}
                    classNames={{
                        img: " object-contain"
                    }}
                    src={url} />

                <small className="underline text-[15px] font-medium font-oswald text-default-600   overflow-hidden break-all ">{transformToUppercase(name)}</small>

                <div className=" text-default-600 text-end flex flex-col justify-center" >
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
            <p className="font-medium uppercase text-xl font-oswald text-default-700   p-3 rounded-lg">¡El carrito de compras esta vacio!</p>
        </div>
    )
}

const ShopCartProducts = () => {

    return (
        <section id="shoptcart-product" className="flex-1 flex flex-col bg-default-50 rounded-md  ">
            {
                productsTest1.length > 0 ?
                    productsTest1.map((props) => <Product key={props.id}   {...props} />) :
                    <VoidShopcart />
            }
        </section>
    )
}


export default ShopCartProducts;