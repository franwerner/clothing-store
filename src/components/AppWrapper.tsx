import Home from "@/pages/home";
import { useRef } from "react";
import { useOutlet } from "react-router-dom";
import NavBar from "./navbar";

const AppWrapper = () => {
  const Outlet = useOutlet();
  const ref = useRef(null);

  return (
    <div
      className="flex flex-col justify-center  items-center"
      id="wrapper-app"
      ref={ref}
     
    >
      <NavBar/>
      {Outlet ?? <Home />}
    </div>
  );
};


export default AppWrapper;