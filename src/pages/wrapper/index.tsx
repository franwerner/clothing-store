import { ScrollRestoration, useOutlet } from "react-router-dom";
import NavBar from "./navbar";
import Footer from "./footer";
import { lazy } from "react";

const LazyHomePage = lazy(()=> import("../home"))

const AppWrapper = () => {
    const Outlet = useOutlet();

    return (
        <div
            className="flex flex-col min-h-dvh   bg-justify-center bg-default-100  items-center"
            id="wrapper-app"
            style={{
                //@ts-ignore
                "--page-width": "1024px",
            }}
        >
            <NavBar />
            {Outlet ?? <LazyHomePage />}
            <Footer />
            <ScrollRestoration />
        </div>
    );
}

export default AppWrapper