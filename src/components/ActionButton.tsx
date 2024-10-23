import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface ActionButtonProps {
    children: ReactNode,
    onClick?: () => void,
    isLoading?: boolean,
    isDisabled?: boolean
}

const ActionButton = ({ children, onClick, isDisabled, isLoading }: ActionButtonProps) => {
    return (
        <Button
            onClick={onClick}
            variant="solid"
            isDisabled  = {isDisabled}
            isLoading = {isLoading}
            color="default"
            className="h-14 shadow-md max-md:w-full border-b-4  border-b-default-900 hover:scale-105 mx-auto my-5 text-[16px] bg-default-700  font-semibold  text-white  uppercase">
            {children}
        </Button>
    )
};

export type {
    ActionButtonProps
}
export default ActionButton;