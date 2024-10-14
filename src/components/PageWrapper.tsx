import { ReactNode } from "react";


const PageWrapper = ({ id, children }: { id: string, children: ReactNode }) => {
    return (
        <main id={id} className="w-full max-w-[1024px] px-4 ">
            {children}
        </main>
    );
};

export default PageWrapper;