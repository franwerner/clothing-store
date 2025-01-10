import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';
import router from './router';
import { ObserverStore } from "./store";
import AlertGlobal from "./components/AlertGlobal";
import HydrateApp from "./components/HydrateApp";


function App() {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="ligth">
        <AlertGlobal>
          <ObserverStore>
            <HydrateApp>
              <RouterProvider router={router} />
            </HydrateApp>
          </ObserverStore>
        </AlertGlobal>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App
