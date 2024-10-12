import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NavBar from './components/navbar';
import SubNavBar from './components/sub-navbar';




function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="ligth">
        <div id="app"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}>
          <NavBar/>
          <SubNavBar/>
          <RouterProvider router={router}>
          </RouterProvider>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App
