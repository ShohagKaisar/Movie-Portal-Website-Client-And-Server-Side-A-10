import Navbar from '../components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { useEffect } from 'react';

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      document.title = "Movie Portal-Home";
    } else if (location.pathname === "/addmovie") {
      document.title = "Movie Portal-Add Movie";
    } else if (location.pathname === "/allmovies") {
      document.title = "Movie Portal-All Movies";
    } else if (location.pathname === "/myfavorites") {
      document.title = "Movie Portal-My Favorites";
    } else if (location.pathname === "/login") {
      document.title = "Movie Portal-Login";
    } else if (location.pathname === "/register") {
      document.title = "Movie Portal-Register";
    } else if (location.pathname === "/forgate") {
      document.title = "Movie Portal-Reset Password";
    } else {
      document.title = "Movie Portal";
    }
  }, [location]);

  return (
    <div className='bg-gradient-to-bl from-[#5b3bf5] 0% to-[#f04343] 100% mx-8 mt-32'>
      {/* Navbar Section */}
      <nav>
      <Navbar></Navbar>
      </nav>

      {/* Main Section */}
      <main>
      <Outlet></Outlet>
      </main>

      {/* Footer Section */}
      <footer>
      <Footer></Footer>
      </footer>
    </div>
  );
}

export default Layout;
