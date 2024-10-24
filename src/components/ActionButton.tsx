import { Button, ButtonProps } from "@nextui-org/react";


const ActionButton = (props: ButtonProps) => {
    return (
        <Button
            variant="solid"
            color="default"
            className="h-14 shadow-md max-md:w-full border-b-4  border-b-default-900 hover:scale-105 mx-auto my-5 text-[16px] bg-default-700  font-semibold  text-white  uppercase"
            {...props}
        />
    )
};


export default ActionButton;