import PageWrapper from "@/components/PageWrapper";
import router from "@/router";
import { useLayoutEffect } from "react";
import { useOutlet } from "react-router-dom";

const AccountPage = () => {
    const Outlet = useOutlet()

   useLayoutEffect(()=>{
    if(!Outlet) router.navigate("/cuenta/ingresar")
   },[Outlet])

    return (
        <PageWrapper>
            <main className="min-h-[60dvh] h-full flex relative flex-col items-center">
                {Outlet}
            </main>
        </PageWrapper>
    );
};

export default AccountPage