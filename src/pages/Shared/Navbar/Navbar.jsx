import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import loanlink from "../../../assets/loanlink.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };


  const guestLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/about-us">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/blogs">Blogs</NavLink></li>
      
    </>
  );

  const userLinks = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-loans">All Loans</NavLink></li>
      <li><NavLink to="/dashboard">Dashboard</NavLink></li>
      <li><NavLink to="/about-us">About Us</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/blogs">Blogs</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-primary text-white shadow-inner  sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
         

          <ul tabIndex={-1} className="menu menu-sm dropdown-content mt-3 z-50 w-52 p-2 bg-primary dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 text-white dark:text-white shadow-inner rounded-box">
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
        object-cover rounded-full
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
        <input
           onChange={(e) => handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle"/>



        {/* User Avatar + Logout */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL || "https://i.ibb.co/YcZq7kP/default.jpg"} alt="user" />
              </div>
            </div>
            <button onClick={handleLogOut} className="btn border-primary text-primary">Logout</button>
          </div>
        ) : (
           <div className="flex items-center gap-2">
      <Link className="btn border-primary text-primary hover:bg-primary hover:text-white hover:border-white" to="/login">Login</Link>
      <Link className="btn btn-outline btn-primary text-white border-white hover:bg-white hover:border-primary hover:text-primary" to="/register">Register</Link>
    </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
