import router from "@/router";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { ReactNode } from "react";
import { useLocation } from "react-router";

type Sizes = "md" | "lg" | "xl"

const sizes: Record<Sizes, number> = {
    md: 768,
    lg: 1024,
    xl: 1280
}
interface PageWrapperProps {
    children: ReactNode,
    className?: string,
    size?: Sizes
    isDisableBreadcrums?: boolean
}

const PagreWrapperBreadCrums = () => {
    const { pathname } = useLocation()

    const split = pathname.split("/").filter((i, index) => index == 0 || Boolean(i))

    return (
        <Breadcrumbs
            id="breadcrumbs"
            variant="solid"
            className="flex pt-4 justify-start items-center">
            {
                split.map((path, index) =>
                    <BreadcrumbItem
                        onPress={() => {
                            if (index == split.length - 1) return
                            const route = split.slice(0, index + 1).reduce((acc, current) => acc + `${current}/`, "")
                            router.navigate(route)
                        }}
                        className="capitalize font-medium" key={index}>{decodeURIComponent(path).replaceAll("-", " ") || "inicio"}
                    </BreadcrumbItem>)
            }
        </Breadcrumbs>
    )
}


const PageWrapper = ({
    children,
    className = "",
    size = "lg",
    isDisableBreadcrums,
}: PageWrapperProps) => {


    return (
        <div id="page-wrapper" className={`w-full  overflow-x-hidden px-2 m-auto sm:px-3  min-h-[50dvh] max-w-[${sizes[size]}px]  ${className} `}>
            {
                !isDisableBreadcrums && <PagreWrapperBreadCrums />
            }

            {children}
        </div>
    );
};

export default PageWrapper;