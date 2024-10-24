import { ReactNode } from "react";

const PageWrapper = ({ children, className = "" }: { children: ReactNode, className?: string }) => {

    return (
        <div className={`w-full overflow-x-hidden px-2 m-auto  sm:px-3 flex-1 min-h-[50dvh] max-w-[--page-width]  ${className} `}>
            {children}
        </div>
    );
};

export default PageWrapper;