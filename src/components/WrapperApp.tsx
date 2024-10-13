import { useOutlet } from "react-router-dom";
import NavBar from "./navbar";
import SubNavBar from "./sub-navbar";
import Home from "@/pages/home";

const WrapperApp = () => {

  const Outlet = useOutlet()

  return (
    <div id="wrapper-app"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}>
      <NavBar />
      <SubNavBar />
      {Outlet ?? <Home />}
    </div>
  );
};

export default WrapperApp;