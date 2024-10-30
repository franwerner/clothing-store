import { ObserverStore } from "@/store";
import { lazy } from "react";
import { ScrollRestoration, useOutlet } from "react-router-dom";
import Footer from "./footer";
import NavBar from "./navbar";

const LazyHomePage = lazy(() => import("../home"))

const AppWrapper = () => {

    const Outlet = useOutlet();

    return (
        <ObserverStore>
                <div
                    className="flex flex-col min-h-dvh   bg-justify-center bg-default-50  items-center"
                    id="wrapper-app"
                >
                    <NavBar />
                    {Outlet ?? <LazyHomePage />}
                    <Footer />
                    <ScrollRestoration />
                </div>
        </ObserverStore>
    );
}

export default AppWrapper