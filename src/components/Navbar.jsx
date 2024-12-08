import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider/AuthProvider";
import logo from "../assets/images/movie-portal-logo.png"

const Navbar = () => {

  const { handleLogout } = useContext(AuthContext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlrSignout = () => {
    handleLogout();
    setTimeout(() => {
      navigate("/");
    }, 1000)
  }

  const links = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/allmovies"}>All Movies</NavLink></li>
    <li><NavLink to={"/addmovie"}>Add Movie</NavLink></li>
    <li><NavLink to={"/myfavorites"}>My Favorites</NavLink></li>
    <li><NavLink to={"/aboutus"}>About Us</NavLink></li>
  </>
  return (
    <div>
      <div className="navbar bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% text-purple-900">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow">
              {
                links
              }
            </ul>
          </div>
          <img src={logo} alt="" />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {
              links
            }
          </ul>
        </div>

        <div className="navbar-end">
          {user && <abbr title={user.displayName}><img className="rounded-full my-2 mx-2 w-8 h-8" src={user.photoURL} alt="Images" /></abbr>}
          {
            user ? <NavLink to={"/"}><button onClick={handlrSignout} className="px-4 py-2 bg-red-500 text-white text-lg rounded-xl">Log Out</button></NavLink> : <div><NavLink to={"/register"}><button className="px-4 py-2 bg-yellow-500 text-white text-lg rounded-xl mx-2">Register</button></NavLink><NavLink to={"/login"}><button className="px-4 py-2 bg-blue-600 text-white text-lg rounded-xl">Login</button></NavLink></div>
          }
        </div>
      </div>

    </div>
  );
}

export default Navbar;
