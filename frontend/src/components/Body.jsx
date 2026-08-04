import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import Dashboard from "./Dashboard";
import SuccessPage from "./SuccessPage";


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
  },
  {
  path: "/dashboard",
  element: <Dashboard />,
}
,
  {
    path: "/success",
    element: <SuccessPage />, // ✅ hona chahiye
  }
]);

  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body