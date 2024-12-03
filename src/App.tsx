import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';
import router from './router';
import { ObserverStore } from "./store";
import HydrateApp from "./components/hydrateApp";

function App() {

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="ligth">
        <ObserverStore>
          <HydrateApp>
            <RouterProvider router={router}>
            </RouterProvider>
          </HydrateApp>
        </ObserverStore>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App
