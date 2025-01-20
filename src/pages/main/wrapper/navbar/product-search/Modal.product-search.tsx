import getUrlQueryParams from "@/helper/getUrlQueryParams.helper"
import useForm from "@/hooks/useForm.hook"
import router from "@/router"
import { Input, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { useDelay } from "my-hooks"
import { useEffect } from "react"

interface ProductSearchModalProps {
    show: boolean,
    onShow: () => void,
}

const ProductSearchModal = ({ onShow, show }: ProductSearchModalProps) => {
    const { createDelay ,cleanDelay} = useDelay()

    const { form, onChange, setValue } = useForm({ search: getUrlQueryParams("search", "productos/busqueda") || null })

    const search = form.search

    useEffect(() => {
        if (show && search !== getUrlQueryParams("search", "productos/busqueda") && search !== null) {
            setValue("search", null)
        }
    }, [show])

    useEffect(() => {
        if (search === null) return
        createDelay(() => {
            router.navigate(`/productos/busqueda?search=${search}`)
        }, 0.4)
        return cleanDelay
    }, [search])


    return (
        <Modal
            isOpen={show}
            onOpenChange={onShow}
            size="2xl"
            classNames={{ base: "m-0 !my-2  ", wrapper: "w-full", closeButton: "p-4 mr-1 h-min   items-start" }}
            placement="top"
            motionProps={{
                variants: {
                    enter: {
                        opacity: 1,
                        transition: {
                            duration: 0.2,
                            easings: "easeInOut"
                        }
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            easings: "easeInOut"
                        }
                    }
                }
            }}
            backdrop="opaque" >
            <ModalContent className="p-3 px-5">
                <ModalBody className="flex-row items-center justify-between">

                    <Input
                        onChange={onChange}
                        value={search || ""}
                        name={"search"}
                        variant="underlined"
                        autoComplete={"off"}
                        radius="lg"
                        classNames={{
                            input: " text-[16px] uppercase",
                        }}
                        color="default"
                        placeholder="Buscar producto..."
                    >

                    </Input>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ProductSearchModal