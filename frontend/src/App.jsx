import './App.css'
import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import { Toaster } from "@/components/ui/sonner"

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router = {appRouter}/>
      <Toaster/>
    </div>
  )
}

export default App
