import PageWrapper from "@/components/PageWrapper";
import { useOutlet } from "react-router";
import AccountInfo from "./info/index.info";

const AccountPage = () => {
    const Outlet = useOutlet()

    return (
        <PageWrapper>
            <main className="min-h-[60dvh] pt-2 gap-12 relative flex flex-col">
                {Outlet ? Outlet : <AccountInfo/>}
            </main>
        </PageWrapper>
    );
};

export default AccountPage