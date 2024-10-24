import { Button, ButtonProps } from "@nextui-org/react";

const ActionButtonIcon = (props: ButtonProps) => {
    return (
        <Button
            variant="solid"
            isIconOnly
            className="material-symbols-outlined bg-default-700 border-b-4 border-b-default-900 hover:scale-105 text-white text-xl"
            {...props}
            >
        </Button>
    )
};

export default ActionButtonIcon;