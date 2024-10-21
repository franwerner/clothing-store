import { ReactNode } from "react";



const PageWrapper = ({ children}: { children: ReactNode}) => {

    return (
        <main className="w-full p-1 sm:p-2 sm:px-3 flex-1 max-w-[1024px]  ">
            {children}
        </main>
    );
};

export default PageWrapper;