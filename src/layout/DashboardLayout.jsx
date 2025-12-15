import { HandCoins } from "lucide-react";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaFileSignature, FaUsersRectangle } from "react-icons/fa6";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { FaFileInvoiceDollar, FaListAlt } from "react-icons/fa";
import { MdPendingActions, MdVerified } from "react-icons/md";
import logo from "../assets/loanlink.jpg"
const DashboardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Drawer Content */}
      <div className="drawer-content p-4 w-full">
        {/* Navbar */}
        <nav className="navbar w-full bg-pink-100 text-pink-700 mb-4 rounded-lg shadow">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-bold text-lg ">LoanLink Dashboard</div>
        </nav>

        {/* Page content */}
        <div className="w-full overflow-x-auto">
          <Outlet />
        </div>
      </div>

      {/* Drawer Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-pink-100 text-pink-700 w-64">
          <ul className="menu w-full grow">
            <li>
              <Link to ="/">
              <img className="w-16 h-12" src={logo} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="px-4 py-2 hover:bg-pink-100 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="ml-2">Homepage</span>
              </Link>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-loans"
                className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
              >
                <HandCoins /> My Loans
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
              >
                <CgProfile /> My Profile
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-users"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <FaUsersRectangle /> Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/all-loan"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <FaListAlt /> All Loans
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/loan-applications"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <FaFileSignature /> Loan Applications
                  </NavLink>
                </li>
              </>
            )}

            {role === "manager" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-loan"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <FaFileSignature /> Add Loan
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/manage-loans"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <FaFileInvoiceDollar /> Manage Loans
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/pending-loans"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <MdPendingActions /> Pending Loan Applications
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/approved-loans"
                    className="px-4 py-2 hover:bg-pink-100 rounded flex items-center gap-2"
                  >
                    <MdVerified /> Approved Loan Applications
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
