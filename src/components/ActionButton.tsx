import { Button, ButtonProps } from "@nextui-org/react";


const ActionButton = ({ className, ...props }: ButtonProps) => (
    <Button
        variant="solid"
        color="default"
        radius="lg"
        className={`h-14  shadow-sm max-w-min hover:scale-95 mx-auto px-10 text-[15px] bg-black font-medium  text-white  uppercase ${className} `}
        {...props}
    />)


export default ActionButton;