import { lazy, Suspense } from "react";
import { ScrollRestoration, useOutlet } from "react-router-dom";
import Footer from "./footer";
import NavBar from "./navbar";
import LoadPage from "@/components/LoadPage";

const LazyHomePage = lazy(() => import("../home"))

const AppWrapper = () => {

    const Outlet = useOutlet()

    return (
            <div
                className="flex flex-col min-h-dvh bg-justify-center bg-default-50  items-center"
                id="wrapper-app"
            >
                <NavBar />
                {Outlet ??
                    <Suspense fallback={<LoadPage screen="full" />} >
                        <LazyHomePage />
                    </Suspense>}
                <Footer />
                <ScrollRestoration />
            </div>
    );
}

export default AppWrapper