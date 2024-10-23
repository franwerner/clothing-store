import { Button, ButtonProps } from "@nextui-org/react";
import { ActionButtonProps } from "./ActionButton";

interface ActionButtonIconProps extends ActionButtonProps {
    size?: ButtonProps["size"]
}

const ActionButtonIcon = ({ size = "sm", children, onClick }: ActionButtonIconProps) => {
    return (
        <Button
            size={size}
            onClick={onClick}
            variant="solid"
            isIconOnly
            className="material-symbols-outlined bg-default-700 border-b-4 border-b-default-900 hover:scale-105 text-white text-xl">
            {children}
        </Button>
    )
};

export default ActionButtonIcon;