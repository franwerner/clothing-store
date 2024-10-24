import { Input, Modal, ModalBody, ModalContent } from "@nextui-org/react"
import { ChangeEventHandler } from "react"

interface ProductSearchModalProps {
    show: boolean,
    onShow: () => void,
    onChange: ChangeEventHandler<HTMLInputElement>,
    value: string

}

const ProductSearchModal = ({ onShow, show, onChange, value }: ProductSearchModalProps) => {

    return (
        <Modal
            isOpen={show}
            onOpenChange={onShow}
            size="2xl"
            classNames={{ base: "m-0 !my-2  ",wrapper : "w-full", closeButton: "p-4 mr-1 h-min   items-start" }}
           hideCloseButton
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
                <ModalBody className="flex-row items-center justify-between" >

                    <Input
                        onChange={onChange}
                        value={value}
                        name={"search"}
                        variant="underlined"
                        autoComplete={"off"}
                        radius="lg"
                        classNames={{
                            input: " text-[16px] uppercase  ",
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