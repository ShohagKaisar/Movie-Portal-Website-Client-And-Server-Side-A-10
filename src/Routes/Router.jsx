import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../components/Home";
import Details from "../components/Details/Details";
import Login from './../components/Login/Login';
import Register from './../components/Register/Register';
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Forgate from "../components/Forgate/Forgate";
import NotFoundPage from "../components/ErrorPage/NotFoundPage";
import AllMovies from "../components/AllMovies/AllMovies";
import AddMovie from "../components/AddMovie/AddMovie";
import MyFavorites from "../components/MyFavorites/MyFavorites";
import AboutUs from "../components/AboutUs/AboutUs";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch("http://localhost:5000/movies")
      },
      {
        path: "/allmovies",
        element: <AllMovies></AllMovies>,
        loader: () => fetch("http://localhost:5000/movies")
      },
      {
        path: "/aboutus",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/addmovie",
        element: <PrivateRoute>
          <AddMovie></AddMovie>
        </PrivateRoute>
      },
      {
        path: "/myfavorites",
        element: <PrivateRoute>
          <MyFavorites></MyFavorites>
        </PrivateRoute>,
        loader: () => fetch("http://localhost:5000/favorite")
      },
      {
        path: "/details/:_id",
        element: <PrivateRoute>
          <Details></Details>
        </PrivateRoute>,
        loader: () => fetch("http://localhost:5000/movies")
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/forgate",
        element: <Forgate></Forgate>
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>
  }

])

export default Router;
