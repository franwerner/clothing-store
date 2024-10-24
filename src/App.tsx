import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './App.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function App() {

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class"  defaultTheme="ligth">
        <RouterProvider router={router}>
        </RouterProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App
