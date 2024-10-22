import { ReactNode } from "react";

const PageWrapper = ({ children}: { children: ReactNode}) => {

    return (
        <main className="w-full p-1 sm:p-2 bg-default-100 sm:px-3 flex-1 max-w-[--page-width]  ">
            {children}
        </main>
    );
};

export default PageWrapper;