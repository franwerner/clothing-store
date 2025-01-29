import LoadPage from "@/components/LoadPage";
import PageWrapper from "@/components/PageWrapper";
import { lazy, Suspense } from "react";
import { useOutlet } from "react-router";

const LazyAccountInfo = lazy(() => import("./info/index.info"))

const AccountPage = () => {
    const Outlet = useOutlet()
    return (
        <PageWrapper>
            <main className="min-h-[60dvh] pt-2 gap-12 relative flex flex-col">
                {Outlet ? Outlet :
                    <Suspense fallback={<LoadPage />}>
                        <LazyAccountInfo />
                    </Suspense>
                }
            </main>
        </PageWrapper>
    );
};

export default AccountPage