import { Button, Input, Modal, ModalBody, ModalContent } from "@nextui-org/react"

const ModalProductSearch = ({ onShow, show }: { show: boolean, onShow: () => void }) => {

    return (
        <Modal
            isOpen={show}
            onOpenChange={onShow}
            hideCloseButton
            classNames={{ base: "m-3 p-2 " }}
            placement="top"
            backdrop="blur" >
            <ModalContent >
                <ModalBody className="flex-row justify-between" >
                    <Button
                        onClick={onShow}
                        isIconOnly
                        color="secondary"
                        variant="flat"
                        className="material-symbols-outlined text-secondary-400  text-3xl">
                        arrow_left_alt
                    </Button>
                    <Input
                        isClearable
                        radius="lg"
                        classNames={{
                            inputWrapper: [
                                "bg-white",
                                "group-data-[focus=true]:bg-white",
                                "group-data-[hover=true]:bg-white",
                                "shadow"
                                ,
                                ,
                            ],
                            input: " text-1xl text-default-900 bg-transparent  placeholder:text-default-900",
                        }}
                        color="secondary"
                        placeholder="Buscar producto..."
                    >
                    </Input>
                    <Button
                        aria-label="magnify"
                        isIconOnly
                        variant="flat"
                        color="secondary"
                        className="material-symbols-outlined text-3xl text-secondary-400 shadow flex-0 ">
                        search
                    </Button>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalProductSearch