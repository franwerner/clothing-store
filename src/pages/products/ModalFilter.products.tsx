import { ModalBody, ModalContent, ModalHeader, Modal as ModalUI } from "@nextui-org/react";
import { useState } from "react";
import ProductsFilterCategories from "./products-filter/Categories.products-filter";
import ProductsFilterWaits from "./products-filter/Waist.filter-products-filter";
import ProductsFilterColor from "./products-filter/Color.filter-products-filter";
import ProductsFilterPrice from "./products-filter/Price.filter-products-filter";
import { useQueryMd } from "@/hooks/useQuery.hook";


const Modal = ({ show, onShow }: { onShow: () => void, show: boolean }) => {

    const md = useQueryMd().matches

    return (
        <ModalUI
            size="lg"
            isOpen={show && !md}
            onOpenChange={onShow}
            classNames={{
                wrapper: "flex justify-end  ",
                base: "sm:m-0 m-0 min-h-dvh rounded-none",
            }}
            placement="top"
            motionProps={{
                variants: {
                    enter: {
                        opacity: 1,
                        transition: {
                            duration: 0.1,
                            ease: "easeInOut",
                        },
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.1,
                            ease: "easeInOut",
                        },
                    },
                }
            }}
            backdrop="opaque" >
            <ModalContent >
                <ModalHeader className="mx-2" >
                    <h3 className=" text-default-700 uppercase  font-light text-2xl">Filtros</h3>
                </ModalHeader>
                <ModalBody className=" border-y-1 mx-2 flex-col inline-flex" >
                    <ProductsFilterCategories />
                    <ProductsFilterWaits />
                    <ProductsFilterColor />
                    <ProductsFilterPrice />
                </ModalBody>
            </ModalContent>
        </ModalUI>
    )
}

const ProductsModalFilter = () => {

    const [show, setShow] = useState(false)

    const onShow = () => setShow(prev => !prev)

    return (
        <>
            <div
                onClick={onShow}
                className="flex items-center md:hidden cursor-pointer ">
                <h3 className=" text-default-700 font-normal text-xl text-nowrap uppercase">Filtar por</h3>
                <span className="material-symbols-outlined rotate-90 text-[30px] text-default-600">
                    arrow_drop_up
                </span>
            </div>
            <Modal onShow={onShow} show={show} />
        </>
    );
};

export default ProductsModalFilter