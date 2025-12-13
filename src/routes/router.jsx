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
import DashboardLayout from "../layout/DashboardLayout";
import MyLoans from "../pages/Dashboard/MyLoans/MyLoans";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import AdminAllLoans from "../pages/Dashboard/AllLoan/AdminAllLoans";
import LoanApplication from "../pages/Dashboard/LoanApplication/LoanApplication";
import ManagerRoute from "./ManagerRoute";
import AddLoan from "../pages/ManagerDashboard/AddLoan/AddLoan";
import ManageLoans from "../pages/ManagerDashboard/ManageLoan/ManageLoans";
import PendingApplications from "../pages/ManagerDashboard/PendingApplications/PendingApplications";
import ApprovedApplication from "../pages/ManagerDashboard/ApprovedApplication/ApprovedApplication";
import LoansDetailsPage from "../pages/Dashboard/LoanDetailsPage/LoansDetailsPage";


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
          element:<PrivateRoute>
            <ApplyLoan></ApplyLoan>
          </PrivateRoute>
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
  {
    path:'dashboard',
    element:<PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'my-loans',
        Component:MyLoans
      },
      {
        path:'my-profile',
        Component:MyProfile
      },
      {
        path:'manage-users',
        element:<AdminRoute>
          <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path:'all-loan',
        element:<AdminRoute>
          <AdminAllLoans></AdminAllLoans>
        </AdminRoute>
      },
      {
        path:'loan-applications',
        element:<AdminRoute>
          <LoanApplication></LoanApplication>
        </AdminRoute>
      },
      {
        path:'payment/:loanId',
        Component:Payment
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      {
        path: 'add-loan',
        element:<ManagerRoute>
          <AddLoan></AddLoan>
        </ManagerRoute>
      },
      {
        path: 'manage-loans',
        element:<ManagerRoute>
          <ManageLoans></ManageLoans>
        </ManagerRoute>
      },
      {
        path: 'pending-loans',
        element:<ManagerRoute>
          <PendingApplications></PendingApplications>
        </ManagerRoute>
      },
      {
        path: 'approved-loans',
        element:<ManagerRoute>
          <ApprovedApplication></ApprovedApplication>
        </ManagerRoute>
      },
      {
        path:'loan/:id',
        element:<LoansDetailsPage></LoansDetailsPage>
      },
    ]
  }
]);