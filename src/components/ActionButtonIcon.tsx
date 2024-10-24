import { Button, ButtonProps } from "@nextui-org/react";

const ActionButtonIcon = ({className,...props}: ButtonProps) => {
    return (
        <Button
            variant="solid"
            isIconOnly
            className={`material-symbols-outlined bg-default-700 border-b-4 border-b-default-900 hover:scale-95  text-white text-xl ${className}`}
            {...props}
            >
        </Button>
    )
};

export default ActionButtonIcon;