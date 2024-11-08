import PageWrapper from "@/components/PageWrapper";
import { AnimatePresence } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import AccountLoginForm from "./LoginForm.account";
import AccountRegisterForm from "./RegisterForm.account";

const AccountPage = () => {
    const [params] = useSearchParams()
    const form = params.get("form")
    const nav = useNavigate()
    return (
        <PageWrapper>
            <main className="min-h-[60dvh] h-full flex relative flex-col items-center">
                <AnimatePresence>
                    {form === "login" && <AccountLoginForm changeForm={() => nav("/cuenta?form=register")} />}
                    {form === "register" && <AccountRegisterForm changeForm={() => nav("/cuenta?form=login")} />}
                </AnimatePresence>
            </main>
        </PageWrapper>
    );
};

export default AccountPage