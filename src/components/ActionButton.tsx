import { Button, ButtonProps } from "@nextui-org/react";


const ActionButton = ({ className, ...props }: ButtonProps) => {
    return (
        <Button
            variant="solid"
            color="default"
            className={`h-14 rounded-3xl shadow-lg w-full md:w-auto hover:scale-95 mx-auto text-[15px] bg-black font-medium  text-white  uppercase ${className}`}
            {...props}
        />
    )
};


export default ActionButton;