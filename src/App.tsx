import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

function App() {

  return (
    <NextUIProvider>
      <div id="app"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh"
        }}>
        <Button color='primary'>
          asdasdasd
        </Button>
        <RouterProvider router={router}>
        </RouterProvider>
      </div>
    </NextUIProvider>
  )
}

export default App
