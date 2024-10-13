import { Badge } from "@nextui-org/react";

const IconBag = ({ onShow }: { onShow: () => void }) => (
    <div onClick={onShow} className="relative flex justify-center items-center cursor-pointer flex-col" >
        <Badge
            content="(5)"
            className="font-bold border-1  bg-white"
            variant="solid"
        >
            <span
                className="material-symbols-outlined  text-default-900 text-3xl sm:text-2xl">
                local_mall
            </span>
        </Badge>
    </div>
)


export default IconBag