import PageWrapper from "@/components/PageWrapper";
import { useOutlet } from "react-router-dom";
import AccountInfo from "./Info.account";

const AccountPage = () => {
    const Outlet = useOutlet()

    return (
        <PageWrapper>
            <main className="min-h-[60dvh] pt-2 gap-12 flex flex-col">
                {Outlet ? Outlet : <AccountInfo/>}
            </main>
        </PageWrapper>
    );
};

export default AccountPage