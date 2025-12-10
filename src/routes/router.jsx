import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authpage/Login/Login";
import Register from "../pages/Authpage/Register/Register";
import AllLoans from "../pages/Shared/All-loans/AllLoans";
import AboutUs from "../pages/Shared/AboutUs/AboutUs";
import Contact from "../pages/Shared/Contact/Contact";
import ApplyLoan from "../pages/ApplyLoan/ApplyLoan";


export const router = createBrowserRouter([
  {
    path: "/",
    Component:Rootlayout,
    children:[
        {
            index: true,
            Component: Home
        },
        {
          path:'all-loans',
          Component:AllLoans
        },
        {
          path:'/about-us',
          Component:AboutUs
        },
        {
          path: '/contact',
          Component:Contact
        },
        {
          path:"/apply-loan",
          Component:ApplyLoan
        },
    ]
  },
  {
     path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
]);