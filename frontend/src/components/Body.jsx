import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";

const  Body=()=> {
   const appRouter = createBrowserRouter([
{
  path: "/",
  element: <Homepage />,
},

  {
    path: "/register",
    element: <Register />, // ✅ hona chahiye
  },
  {
    path: "/login",
    element: <Login />, // ✅ hona chahiye
  }
]);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body