import React from "react";
// import Logo from "../../../components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import loanlink from "../../../assets/loanlink.jpg";
const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const guestLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/about-us">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
    </>
  );

  const userLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
         

          <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 z-50 w-52 p-2 shadow bg-base-100 rounded-box">
            {user ? userLinks : guestLinks}
            
          </ul>
        </div>

        <Link to="/" className="flex items-center gap-2">
    <img
      src={loanlink}
      alt="LoanLink Logo"
      className="
        w-10 h-10               /* mobile */
        sm:w-12 sm:h-12         /* tablet */
        lg:w-14 lg:h-14         /* laptop */
        object-cover rounded-lg
      "
    />

    {/* Text visible tablet+ only */}
    <div className="hidden sm:block">
      <h1 className="text-lg font-semibold ">
        LoanLink
      </h1>
      <p className="text-xs  -mt-1">
        Microloan Tracker
      </p>
    </div>
  </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {user ? userLinks : guestLinks}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        {/* Theme Toggle */}
        {/* <input type="checkbox" className="toggle theme-controller" />
         */}
         <button
              // onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {/* simple icon: sun/moon */}
              <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"></path>
              </svg>
            </button>


        {/* User Avatar + Logout */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/YcZq7kP/default.jpg"} alt="user" />
              </div>
            </div>
            <button onClick={handleLogOut} className="btn border-pink-500 text-pink-600">Logout</button>
          </div>
        ) : (
           <div className="flex items-center gap-2">
      <Link className="btn border-pink-500 text-pink-600" to="/login">Login</Link>
      <Link className="btn btn-outline bg-linear-to-tr from-pink-400 to-pink-600 text-white" to="/register">Register</Link>
    </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
