import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './router';

function App() {

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="ligth">
        <RouterProvider router={router}>
        </RouterProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default App
