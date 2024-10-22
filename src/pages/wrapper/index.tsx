import { useOutlet } from "react-router-dom";
import HomePage from "../home";
import NavBar from "./navbar";
import Footer from "./footer";

const AppWrapper = () => {
    const Outlet = useOutlet();

    return (
        <div
            className="flex flex-col min-h-dvh  bg-justify-center bg-default-100  items-center"
            id="wrapper-app"
            style={{
                //@ts-ignore
                "--page-width": "1024px",
            }}
        >
            <NavBar />
            {Outlet ?? <HomePage />}
            <Footer />
        </div>
    );
}

export default AppWrapper